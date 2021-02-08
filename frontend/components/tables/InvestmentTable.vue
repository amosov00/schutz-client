<template lang="pug">
  div.box
    div.level
      div.level-left {{$t('historyOfTransactions')}}
      div.level-right
        .columns
          .column(v-for="(product, i) in products" :key="i")
            span.product-link(@click="() => currentProduct = product" :class="{ 'product-link-active':  currentProduct === product }") {{ product }}
    b-table.table-custom(:data="investments" striped paginated pagination-simple
    default-sort="args.timestamp" pagination-position="bottom")
      template(slot-scope="props")
        b-table-column(field="transactionIndex" label="#" width="70" numeric) {{ props.row.transactionIndex }}
        b-table-column(field="args.timestamp" label="Date" sortable) {{ timestampToDate(props.row.args.timestamp) }}
        b-table-column(field="event" label="Type"  width="150") {{ props.row.event }}
        b-table-column(field="args.incomingEthereum" label="Amount, ETH" width="140").text-clamp {{formatCurrency(props.row.args.value) }}
        b-table-column(field="transactionHash" label="TxHash" width="150").has-text-primary.overflow-reset
          b-tooltip(:label="props.row.transactionHash" type="is-black" position="is-bottom").w-100
            a(:href="'https://etherscan.io/tx/' + props.row.transactionHash" target="_blank").text-clamp {{ props.row.transactionHash }}
        b-table-column(field="" label="Rate") {{ props.row.args.usdRate }}
        b-table-column(field="" label="Product") {{ props.row.contract }}
        b-table-column(field="" label="Amount, USDT") {{ props.row.amount_usdt }}
      //template(slot="footer")
        .divider
      //template(slot="bottom-left")
        div
          div.total Total: 14,951.99 USDT
          div.columns
            .column Export
            .column
              a(href="#") .csv
            .column
              a(href="#") .xls
            .column
              a(href="#") .pdf

</template>

<script>
import formatDate from '~/mixins/formatDate'
import formatCurrency from '~/mixins/formatCurrency'

export default {
	name: 'investmentTable',
	mixins: [formatDate, formatCurrency],
	computed: {
		investments() {
			let filter = this.currentProduct === 'All' ? null : this.currentProduct
			return this.$store.getters.investmentsWithFilter(filter)
		},
		getStatusClass() {
			if (this.status === 'online') {
				return 'status-online'
			}
			return 'status-offline'
		},
	},
	data: () => ({
		isEmpty: false,
		currentProduct: 'All',
		products: ['All', 'NTSCD', 'NTS80', 'NTS81', 'NTS165'],
	}),
	methods: {
		setProduct(product) {
			this.currentProduct = product
		},
	},
}
</script>

<style scoped></style>
