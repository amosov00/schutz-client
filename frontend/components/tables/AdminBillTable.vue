<template lang="pug">
	.container
		b-table(
			:data="data"
			:loading="loading"
		).custom-table.mb-4
			template(slot-scope="props")
				b-table-column(field="id" label="ID" width="70").has-text-primary.overflow-reset
					b-tooltip(:label="props.row._id" type="is-black" position="is-bottom").w-100
						nuxt-link(:to="`bills/${props.row._id}`").text-clamp {{props.row._id}}
				b-table-column(field="date" label="Date" width="120") {{ timestampFromUtc(props.row.created_at) }}
				b-table-column(field="totalUSDT" label="Total, USDT"  width="30") {{ formatCurrency(props.row.total_usdt, 'usdt') }}
				b-table-column(field="totalInvestedUSDT" label="Invested, USDT"  width="30") {{ formatCurrency(props.row.deposit_usdt, 'usdt') }}
				b-table-column(field="delete" label=""  width="150").has-text-right
					div.is-flex
						b-button.default-button.is-info( @click="triggerPayInvoiceModal(props.row)" :loading="loading") {{$t('pay')}}
						b-button.default-button.ml-1.delete-btn.is-info(@click="deleteInvoice(props.row._id)")
							b-icon( icon="close").mt-1
			template(slot="footer")
				div.mb-6.center
					button.default-button(@click="$emit('more')" v-if="showMoreButton") {{ $t("показать еще") }}
			template(slot="bottom-left")
				div
					nuxt-link(class="is-primary button" to="/bills/create") {{$t('createBill')}}
</template>

<script>
import tableMixin from '~/components/tables/ReportTables/tableMixin'
import formatCurrency from '~/mixins/formatCurrency'
import formatDate from '~/mixins/formatDate'
import PayInvoiceModal from '~/components/modals/PayInvoiceModal'

export default {
	mixins: [tableMixin, formatCurrency, formatDate],

	methods: {
		triggerPayInvoiceModal(invoice) {
			this.$buefy.modal.open({
				parent: this,
				component: PayInvoiceModal,
				trapFocus: true,
				props: {
					invoice: invoice,
				},
			})
		},

		async deleteInvoice(id) {
			this.$buefy.dialog.confirm({
				type: 'is-danger',
				confirmText: this.$t('delete'),
				cancelText: this.$t('cancel'),
				message: `<div class="mb-2">${this.$t(
					'deleteBill'
				)}</div><strong>${id}</strong>`,
				onConfirm: async () => {
					await this.$store.dispatch('bills/deleteInvoice', id)
				},
			})
		},
	},
}
</script>

<style lang="scss"></style>
