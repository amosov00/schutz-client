<template>
	<div class="deposit-accural">
		<h1 class="title is-2">{{ $t('depositAccural') }}</h1>
		<div class="box">
			<b-field>
				<span class="mr-4">{{ $t('from') }}:</span>
				<b-datepicker
					:placeholder="$t('typeFromDate')"
					type="month"
					icon="calendar-today"
					editable="editable"
					class="w-100"
					v-model="fromDate"
					@input="onDateChange"
				>
				</b-datepicker>
			</b-field>
			<div class="extra-info mb-4">
				<div class="info-item">
					<div class="name">Total USDT:</div>
					<div class="value">{{ formatCurrency(total, 'usdt') }}</div>
				</div>
				<div class="info-item">
					<div class="name">Total users:</div>
					<div class="value">{{ totalUsers }}</div>
				</div>
				<div class="info-item">
					<div class="name">Total payout:</div>
					<div class="value">{{ formatCurrency(totalPayout, 'usdt') }}</div>
				</div>
				<div class="info-item">
					<div class="name">Total prolong:</div>
					<div class="value">{{ formatCurrency(totalProlong, 'usdt') }}</div>
				</div>
				<div class="info-item">
					<div class="name">Total processing:</div>
					<div class="value">{{ formatCurrency(totalProcessing, 'usdt') }}</div>
				</div>
				<div class="info-item">
					<div>Payment transactions:</div>
				</div>
			</div>
			<div class="columns">
				<div class="column">
					<button class="button is-info is-fullwidth" @click="isComponentModalActive = true" :disabled="!totalUsers">
						Рассылка на почту
					</button>
				</div>
				<div class="column">
					<button class="button is-info is-fullwidth" @click="triggerPayInvoiceModal">Оплатить</button>
				</div>
				<div class="column">
					<button class="button is-info is-fullwidth" @click="saveAsExcel" :disabled="!totalUsers">
						Экспорт данных в .xls
					</button>
				</div>
			</div>
			<b-field label="Поиск">
				<b-input :placeholder="$t('typeAddressOrTxHash')" type="text" v-model="search"> </b-input>
			</b-field>
		</div>
		<div class="box">
			<DepositAccuralTable
				:loading="loading"
				:tableData="filteredAgreements"
				@updateAgreements="onDateChange(fromDate)"
			>
			</DepositAccuralTable>
		</div>
		<b-modal :active.sync="isComponentModalActive" has-modal-card>
			<mailing-users-modal :users="uniqUsersWithEmail" @sendMail="sendMail" />
		</b-modal>
	</div>
</template>

<script>
import DepositAccuralTable from '~/components/tables/DepositAccuralTable'
import moment from 'moment'
import XLSX from 'xlsx'
import formatDate from '~/mixins/formatDate'
import formatCurrency from '~/mixins/formatCurrency'
import MailingUsersModal from '../components/modals/MailingUsersModal'
import PassRepayModal from '~/components/modals/DepositAccuralModal'

export default {
	name: 'reports',
	layout: 'admin',
	middleware: ['managerOrAdminRequired'],
	components: { MailingUsersModal, DepositAccuralTable },
	mixins: [formatDate, formatCurrency],
	data() {
		return {
			agreements: [],
			fromDate: null,
			contractName: '',
			loading: false,
			total: 0,
			search: '',
			isComponentModalActive: false,
			totalPayout: 0,
			totalProlong: 0,
			totalProcessing: 0,
		}
	},
	async mounted() {
		this.fromDate = moment().startOf('month').toDate()
		await this.onDateChange(this.fromDate)
		if (!this.$store.state.metamask.gasPrice) {
			await this.$store.dispatch('metamask/getGasPrice')
		}
	},
	methods: {
		async sendMail(list) {
			const timestamp = this.getTimestamp(this.fromDate)
			const result = await this.$store.dispatch('reports/mailingSend', {
				target_close_date_timestamp: timestamp,
				user_ids: list,
			})
			if (result) {
				this.$emit('updateAgreements')
				this.$buefy.toast.open({
					message: 'Mails sent!',
					type: 'is-primary',
					queue: false,
				})
			} else {
				this.$buefy.toast.open({
					message: this.$t('investment.errorMessage'),
					type: 'is-danger',
					queue: false,
				})
			}
		},
		async onDateChange(e) {
			const timestamp = this.getTimestamp(e)
			this.loading = true
			const tableData = await this.$store.dispatch('reports/fetchAgreements', timestamp)
			const { agreements, total, total_payout, total_processing, total_prolong } = tableData
			this.agreements = agreements ? agreements : []
			this.total = total ? total : 0
			this.totalPayout = total_payout ? total_payout : 0
			this.totalProlong = total_prolong ? total_prolong : 0
			this.totalProcessing = total_processing ? total_processing : 0
			this.loading = false
		},
		triggerPayInvoiceModal() {
			this.$buefy.modal.open({
				parent: this,
				component: PassRepayModal,
				trapFocus: true,
				props: {
					fromTimestamp: this.getTimestamp(this.fromDate),
				},
			})
		},
		getTimestamp(time) {
			const offset = moment().utcOffset()
			return moment(time).add(offset, 'minutes').add(19, 'days').format('X')
		},
		saveAsExcel() {
			const dataTableWS = XLSX.utils.json_to_sheet(this.exportedFileData)
			const wb = XLSX.utils.book_new()
			XLSX.utils.book_append_sheet(wb, dataTableWS, 'data') // sheetAName is name of Worksheet
			XLSX.utils.sheet_add_aoa(dataTableWS, this.exportedTotalsData, {
				origin: -1,
			})
			// export Excel file
			XLSX.writeFile(wb, `${this.formatDate(this.fromDate)}.xlsx`)
		},
		getResult(res) {
			// UNMARKED =  1CLOSE = 2 PROLONG = 3
			let result = ''
			switch (res) {
				case 1:
					result = 'Not answer'
					break
				case 2:
					result = 'Close'
					break
				case 3:
					result = 'Prolong'
					break
			}
			return result
		},
	},
	computed: {
		filteredAgreements() {
			const search = this.search.trim()
			if (!search.length) {
				return this.agreements
			}
			return this.agreements.filter(({ ethereum_wallet, email, _id }) => {
				return (
					(ethereum_wallet && ethereum_wallet.indexOf(search) >= 0) ||
					(email && email.indexOf(search) >= 0) ||
					(_id && _id.indexOf(search) >= 0)
				)
			})
		},
		users() {
			let users = this.filteredAgreements.map((item) => item.user_id)
			return new Set(users)
		},
		totalUsers() {
			return this.users.size
		},
		uniqUsersWithEmail() {
			return [...this.users].map((user) => {
				const userData = this.filteredAgreements.find(({ user_id }) => user_id === user)
				return { id: user, email: userData.email }
			})
		},
		exportedFileData() {
			return this.filteredAgreements.map((el) => {
				return {
					Id: el._id,
					Address: el.ethereum_wallet,
					Email: el.email,
					Contract: el.contract,
					'Amount USDT': this.formatCurrency(el.amount, 'usdt'),
					'Close date': this.formatDate(el.close_date),
					Mailing: this.formatDate(el.created_at),
					Answers: this.getResult(el.result),
				}
			})
		},
		exportedTotalsData() {
			return [[`Total: ${this.formatCurrency(this.total, 'usdt')} USDT`]]
		},
	},
}
</script>

<style lang="scss" scoped>
.deposit-accural {
	color: black !important;
}
.extra-info {
	display: flex;
	flex-direction: column;
	align-items: flex-start;

	.info-item {
		display: flex;
		.name {
			width: 150px;
			margin-right: 10px;
		}
	}
}
</style>
