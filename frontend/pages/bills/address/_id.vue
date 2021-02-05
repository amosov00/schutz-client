<template lang="pug">
  div
    div.box
      div.columns
        div.column
          h1.subtitle.is-4 From: {{readableDateWithoutDays(invoiceData.timestamp_from)}}
        div.column
          h1.subtitle.is-4 To: {{readableDateWithoutDays(invoiceData.timestamp_to)}}
      div.columns
        div.column
          h1.subtitle.is-4 Total Deposit (ETH): {{formatCurrency(invoiceData.deposit_eth, 'eth')}}
        div.column
          h1.subtitle.is-4 Total Deposit (USDT): {{formatCurrency(invoiceData.deposit_usdt, 'usdt')}}
      div.columns
        div.column
          h1.subtitle.is-4 Total ETH: {{formatCurrency(invoiceData.total_eth, 'eth')}}
        div.column
          h1.subtitle.is-4 Total USDT:
            a(class="terms-link" v-if="invoiceData.is_paid") {{ formatCurrency(invoiceData.total_usdt, 'usdt')}}
            a(class="terms-link" v-else @click="updateTotalModal({value: invoiceData.total_usdt, id: invoiceData._id})") {{ formatCurrency(invoiceData.total_usdt, 'usdt')}}
      div.columns
        div.column(v-if="invoiceData.payment_transaction_hash")
          h1.subtitle.is-5 TxHash:
            a(:href="`https://etherscan.io/tx/${invoiceData.payment_transaction_hash}`" target="_blank" rel="noopener") 0x26c6968bf7e3237953b60b530fcc77d356c5c6704eaf3763f74d9046790cf46c
              b-button.is-primary.ml-2(v-clipboard:copy="invoiceData.payment_transaction_hash" v-clipboard:success="onCopy"
                v-clipboard:error="onError")
                b-icon(pack="fas" icon="copy")
      div
        a(:href="`https://etherscan.io/tx/${invoiceData.address}`").is-size-5 Address: {{invoiceData.address}}
        b-button.is-primary.ml-2(v-clipboard:copy="invoiceData.address" v-clipboard:success="onCopy"
          v-clipboard:error="onError")
          b-icon(pack="fas" icon="copy")
      div.columns
        div.column
          PayInvoiceButton(:invoiceData="invoiceData")
      div.divider.ma-1
      b-table(:data="tableData" striped :paginated='true' pagination-simple
      pagination-position="bottom")
        template(slot-scope="props")
          b-table-column(field="args.timestamp" label="Date" width="70") {{ timestampToDate(props.row.timestamp) }}
          b-table-column(field="txHash" label="txHash" width="150").has-text-primary.overflow-reset
            b-tooltip(:label="props.row.transactionHash" type="is-black" position="is-bottom").w-100
              a(:href="'https://etherscan.io/tx/' + props.row.transactionHash" target="_blank" rel="noopener").text-clamp {{ props.row.transactionHash }}
          b-table-column(field="event" label="Event" width="50") {{ props.row.event }}
          b-table-column(field="deposit" label="Depoit, USDT" width="90").text-right {{ formatCurrency(props.row.deposit_usdt, 'usdt') }}
          b-table-column(field="months" label="Months" width="20").text-right {{ props.row.months }}
          b-table-column(field="profitability" label="Profit, %" width="20").text-right {{ toFixed4(props.row.total_profitability) }}
          b-table-column(field="rate" label="Rate" width="60").text-right {{ props.row.rate }}
          b-table-column(field="usdt" label="Total, USDT" v-if="props.row.total_usdt" width="90").text-right {{ formatCurrency(props.row.total_usdt, 'usdt') }}
          b-table-column(field="usdt" label="Total, USDT" width="90" v-else).text-right {{0}}
          b-table-column(field="contract" label="Contract" width="20") {{ props.row.contract }}
</template>

<script>
import formatDate from '~/mixins/formatDate'
import formatCurrency from '~/mixins/formatCurrency'
import PayInvoiceButton from '~/components/PayInvoiceButton'

export default {
	name: 'bills_address',
	layout: 'admin',
	mixins: [formatDate, formatCurrency],
	components: { PayInvoiceButton },
	middleware: ['authRequired', 'adminRequired'],
	methods: {
		updateTotalModal(data) {
			this.$buefy.dialog.prompt({
				message: `Total USDT`,
				inputAttrs: {
					type: 'number',
					placeholder: 'Type total here',
					value: (data.value / 1e6).toFixed(2),
					min: 0,
					step: 'any',
				},
				trapFocus: true,
				onConfirm: (value) =>
					this.updateTotalAction({ total_usdt: value * 1e6, id: data.id }),
			})
		},
		updateTotalAction(data) {
			this.$store
				.dispatch('bills/updateTotal', data)
				.then(() =>
					this.$buefy.toast.open({
						message: 'Total updated!',
						type: 'is-success',
					})
				)
				.catch((e) => {
					this.$buefy.toast.open({
						message: 'Something went wrong!',
						type: 'is-danger',
					})
				})
		},
		toFixed4(value) {
			return value.toFixed(4)
		},
		onCopy(e) {
			this.$buefy.toast.open({
				message: `Copied: ${e.text}`,
				type: 'is-success',
			})
		},
		onError(e) {
			this.$buefy.toast.open({
				message: 'Copying failed!',
				type: 'is-danger',
			})
		},
	},
	computed: {
		invoiceData() {
			return this.$store.getters['bills/addressInvoiceData']
		},
		tableData() {
			return this.$store.getters['bills/addressTransactions']
		},
	},
	asyncData({ store, route }) {
		return store.dispatch('bills/fetchDetailedAddressData', route.params.id)
	},
}
</script>

<style>
.ml-2 {
	margin-left: 10px;
}
</style>
