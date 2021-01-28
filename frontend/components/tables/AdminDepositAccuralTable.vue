<template lang="pug">
	b-table(
		:data="data"
		:loading="loading"
		default-sort="args.timestamp"
	).custom-table.mb-4
		template(slot-scope='{ row }')
			b-table-column.overflow-reset(field='user_id' width='100' label='Id')
				b-tooltip.w-100(
					:label='row.user_id'
					type='is-black'
					position='is-bottom'
				)
					span.text-clamp(
						@click="openUserModal(row.user_id)"
					)  {{ row.user_id }}
			b-table-column.has-text-primary.overflow-reset(
				field='ethereum_wallet'
				label='Address'
				width='150'
			)
				b-tooltip.w-100(
					:label='row.ethereum_wallet'
					type='is-black'
					position='is-bottom'
				)
					a.text-clamp(
						:href="getAddressLink(row.ethereum_wallet)"
						target='_blank'
					)  {{ row.ethereum_wallet }}
			b-table-column(
				field='email'
				label='Email'
				width='200'
			)
				| {{ row.email }}
			b-table-column(
				field='contract'
				label='Contract'
			)
				| {{ row.contract }}
			b-table-column(
				field='amount'
				label='Amount'
			)
				a.text-clamp.has-text-link(
					@click='openAmountUpdateModal(row)'
				)  {{ formatCurrency(row.amount, 'usdt') }}
			b-table-column(
				field='close_date'
				label='Close date'
			)
				| {{formatDate(row.close_date)}}
			b-table-column(
				field='created_at'
				label='mailing'
			)
				| {{formatDate(row.created_at)}}
			b-table-column(
				field='result'
				label='Answers'
			)
				| {{ getResult(row.result) }}
			b-table-column.has-text-right(
				field='delete'
				label=''
				width='100'
			)
				b-button(
					type='is-info is-small'
					:disabled='row.isPaid !== true && row.result !== 2'
					@click='pay(row)'
				)
					| {{$t('pay')}}
			b-table-column.has-text-right(width='70')
				b-button(
					type='is-info is-small'
					@click='openStatusUpdateModal(row)'
				)
					| Статус
		template(slot="footer")
			div.mt-3
				div.mb-2.center
					button.default-button(@click="$emit('more')" v-if="showMoreButton") {{ $t("показать еще") }}
				.is-flex.is-justify-content-flex-end.mb-5.mr-3
					button.default-button(@click="$emit('export')") Экспорт данных
</template>

<script>
import formatDate from "~/mixins/formatDate";
import formatCurrency from "~/mixins/formatCurrency";
import etherscan from "~/mixins/etherscan";
import { AdminUpdateModal, AdminUpdateStatusModal } from "~/components/modals";
import { mapActions } from "vuex";
import UserProfile from "~/components/modals/UserProfile";
import { getResult } from "~/consts";

export default {
	props: {
		data: {
			type: Array,
			required: true,
		},

		loading: {
			type: Boolean,
			required: true,
		},

		pagination: {
			type: Object,
			required: true,
		},

		count: {
			type: Number,
			required: true,
		}
	},

	data() {
		return {
			activeAgreement: null,
		}
	},

	mixins: [formatDate, formatCurrency, etherscan],

	computed: {
		showMoreButton() {
			return this.count > this.pagination.limit * this.pagination.page
		}
	},

	methods: {
		...mapActions({
			updateAgreement: 'reports/updateAgreement',
			updateAgreementPayment: 'reports/updateAgreementPayment',
			getUserById: 'users/getById',
			depositAccural: 'adminContractIntegration/accrualDeposit',
		}),

		getResult,

		async openAmountUpdateModal(agreement) {
			try {
				const updatedData = await this.$modal.open({
					factory: () => AdminUpdateModal,

					props: {
						agreement,
					},

					options: {
						prompt: true,
					}
				})

				await this.doUpdateAgreement(updatedData)
			} catch (e) {
				this.showErrorNotification();
			}
		},

		openUserModal(userId) {
			this.$modal.open({
				factory: () => UserProfile,
				props: {
					userId,
				}
			})
		},

		async openStatusUpdateModal(agreement) {
			try {
				const updatedData = await this.$modal.open({
					factory: () => AdminUpdateStatusModal,

					props: {
						agreement,
					},

					options: {
						prompt: true,
					},
				})

				await this.doUpdateAgreement(updatedData);
			} catch (e) {
				this.showErrorNotification();
			}
		},

		async doUpdateAgreement(updatedData) {
			await this.updateAgreement(updatedData);

			this.$buefy.toast.open({ message: 'Agreement updated!', type: 'is-primary', queue: false })

			this.$emit('updateAgreements');
		},

		showErrorNotification() {
			this.$buefy.toast.open({ message: this.$t('investment.errorMessage'), type: 'is-danger', queue: false })
		},

		async pay(data) {
			const userData = await this.getUserById(data.user_id);

			if (!userData) {
				return this.$buefy.toast.open({ message: 'Failed to fetch user wallet', type: 'is-danger' })
			}

			const txHash = await this.depositAccural({
			 	values: [data.amount],
				customerAddresses: [userData.ethereum_wallet_payout || userData.ethereum_wallet],
				comment: `${data.contract} close`,
			})

			if (txHash) {
				this.updateAgreementPayment({
					txHash,
					ids: [data._id],
				})

				await this.$emit('updateAgreements');
			}
		},
	}

}
</script>

<style lang="scss">
</style>
