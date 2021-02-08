<template lang="pug">
  b-table(:data="tableData" striped :paginated='true' :loading="loading" pagination-simple
      default-sort="args.timestamp" pagination-position="bottom")
    template(slot-scope="props")
      b-table-column(field="address" label="Address" width="100")
        nuxt-link(:to="`/bills/${props.row.address}?from=${props.row.timestamp_from}&to=${props.row.timestamp_to}`") {{ props.row.address }}
      b-table-column(field="eth" label="Amount, ETH"  width="40") {{ formatCurrency(props.row.deposit_eth) }}
      b-table-column(field="payoffETH" label="Payoff, ETH"  width="40") {{ formatCurrency(props.row.payoff_eth) }}
      b-table-column(field="usdt" label="Amount, USDT"  width="40") {{ formatCurrency(props.row.deposit_usdt) }}
      b-table-column(field="payoffUSDT" label="Payoff, USDT"  width="40") {{ formatCurrency(props.row.payoff_usdt) }}
</template>

<script>
import formatCurrency from '~/mixins/formatCurrency'
export default {
	mixins: [formatCurrency],
	props: {
		loading: {
			type: Boolean,
		},
		tableData: {
			type: Array,
			default: [],
		},
	},
	methods: {
		// formatAmount(num) {
		//   let num_parts = (num.toFixed(4) / 1e18).toString().split(".");
		//     num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		//     return num_parts.join(".");
		// }
	},
}
</script>

<style></style>
