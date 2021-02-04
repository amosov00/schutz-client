<template lang="pug">
	div
		CustomSlider(hide-dots)
			template(slot="content")
				.is-fullheight
					.content.is-fullheight.is-fullwidth
						.deposit_accural__container
							.deposit_accural__information_block
								.deposit_accural__title_block
									| {{ $t('depositAccural') }}
								base-datepicker(
									:label="`${$t('from')}:`"
									v-model="fromDate"
									type="month"
								).deposit_accural__datepicker
								.deposit_accural__total_block.is-flex(
									v-for="({ label, amount }) in totals"
								)
									.deposit_accural__total_label {{ label }}:
									.deposit_accural__total_amount.ml-1 {{ amount }}
							.deposit_accural__action_block
								CustomButton(style="width: 100%" @click.native="openUserEmailSendModal")
									span(style="color: #846756") Рассылка e-mail
								CustomButton(style="width: 100%" @click.native="triggerPayInvoiceModal").mt-2
									span(style="color: #846756") Оплатить
		.container
			.is-size-5.has-text-white.mb-4
				base-input(
					v-model="searchQuery"
					placeholder="Введите адрес или Email"
				).admin_search__bar
			AdminDepositAccuralTable(
				:loading="loading"
				:data="tableData"
				:pagination="pagination"
				:count="allAgreements.length"
				@updateAgreements="onDateChange($moment().startOf('month').toDate())"
				@more="getMore"
				@export="onExport"
			).mb-4
</template>

<script>
import { CustomSlider, CustomButton } from '@/components';
import {mapActions, mapGetters} from "vuex";
import formatDate from "~/mixins/formatDate";
import formatCurrency from "~/mixins/formatCurrency";
import AdminDepositAccuralTable from "~/components/tables/AdminDepositAccuralTable";
import { AdminDepositSendMail } from "~/components/modals";
import uniqBy from 'lodash/uniqBy';
import PassRepayModal from "~/components/modals/DepositAccuralModal";
import {exportHelper} from "~/utils/exportHelper";

export default {
	layout: 'profile',

	components: {
		CustomSlider,
		AdminDepositAccuralTable,
		CustomButton,
	},

	mixins: [formatDate, formatCurrency],

	middleware: ['adminRequired'],

	data() {
		return {
			loading: false,

			fromDate: this.$moment().startOf('month').toDate(),
			total: 0,
			payout: 0,
			prolong: 0,
			processing: 0,
			searchQuery: '',
			pagination: {
				page: 1,
				limit: 20,
			}
		}
	},

	computed: {
		...mapGetters({
			allTotals: 'reports/total',
			agreements: 'reports/agreements',
			agreementsWithFilter: 'reports/agreementsWithFilter',
		}),

		totals() {
			return [{
				label: 'USDT',
				amount: this.formatCurrency(this.allTotals.total, 'usdt'),
			}, {
				label: 'Users',
				amount: this.users.length,
			}, {
				label: 'Payouts',
				amount: this.formatCurrency(this.allTotals.totalPayout, 'usdt'),
			}, {
				label: 'Prolong',
				amount: this.formatCurrency(this.allTotals.totalProlong, 'usdt'),
			}, {
				label: 'Processing',
				amount: this.formatCurrency(this.allTotals.totalProcessing, 'usdt'),
			},
			]
		},

		tableData() {
			return this.agreementsWithFilter({
				searchQuery: this.searchQuery,
				page: this.pagination.page,
				limit: this.pagination.limit,
			})
		},

		allAgreements() {
			return this.agreementsWithFilter({ searchQuery: '', limit: -1 });
		},

		users() {
			return uniqBy(this.allAgreements, ({ user_id }) => user_id)
		},
	},

	watch: {
		fromDate: {
			handler(time) {
				this.onDateChange(time);
			}
		}
	},

	methods: {
		...mapActions({
			fetchAgreements: 'reports/fetchAgreements',
			sendMailing: 'reports/mailingSend',
		}),

		async onDateChange(time) {
			const timestamp = this.getTimestamp(time);

			this.loading = true;

			await this.fetchAgreements(timestamp)

			this.loading = false;
		},

		getMore() {
			this.pagination.page += 1;
		},

		getTimestamp(time) {
			if(typeof time !== 'object') {
				time = new Date(time * 1000)
			}

			const offset = this.$moment().utcOffset()
			return this.$moment(time)
				.add(offset, 'minutes')
				.add(19, 'days')
				.format('X')
		},

		async openUserEmailSendModal() {
			const data = await this.$modal.open({
				factory: () => AdminDepositSendMail,

				options: {
					prompt: true,
				},

				props: {
					users: this.users.map(({ user_id, email }) => ({
						email,
						id: user_id,
					})),
				}
			})

			await this.doSendMailing(data);
		},

		async doSendMailing({ user_ids }) {
			try {
				const timestamp = this.getTimestamp(this.$moment().startOf('month').toDate())

				await this.sendMailing({
					user_ids,
					target_close_date_timestamp: timestamp,
				})

				this.$buefy.toast.open({ message: 'Mails sent!', type: 'is-primary', queue: false })
			} catch ({ response: { data: errorMessages } }) {
				if (errorMessages.some(({ message }) => message === 'Email already sent to that close date')) {
					return this.$buefy.toast.open({ message: 'Email to this user is already sent!', type: 'is-danger', queue: false })
				} else {
					return this.$buefy.toast.open({ message: this.$t('investment.errorMessage'), type: 'is-danger', queue: false })
				}
			}
		},

		triggerPayInvoiceModal() {
			this.$buefy.modal.open({
				parent: this,
				component: PassRepayModal,
				trapFocus: true,
				props: {
					fromTimestamp: this.getTimestamp(this.$moment().startOf('month').toDate())
				}
			})
		},

		onExport() {
			return exportHelper({
				data: this.agreementsWithFilter({
					searchQuery: this.searchQuery,
					page: this.pagination.page,
					limit: -1,
				}),
				type: 'agreements',
				totals: this.allTotals.total,
			})
		},
	},
}
</script>

<style lang="scss">
.deposit_accural__container {
	display: grid;
	grid-template-columns: 1fr 50px 1fr;
	height: 100%;

	.deposit_accural__information_block {
		.deposit_accural__title_block {
			font-size: 24px;
			line-height: 120%;
			margin-bottom: 40px;
		}

		.deposit_accural__datepicker {
			margin-bottom: 88px;
		}

		.deposit_accural__total_block {
			color: #666666;

			.deposit_accural__total_amount {
				font-weight: bold;
			}
		}
	}

	.deposit_accural__action_block {
		grid-column-start: 3;
		display: flex;
		justify-content: flex-end;
		height: 100%;
		flex-direction: column;
	}
}
</style>
