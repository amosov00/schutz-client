<template lang="pug">
	b-table(
		:data="data"
		:loading="loading"
	).custom-table.mb-4
		template(slot-scope="{ row }")
			b-table-column(
				field="args.timestamp"
				label="Date"
				sortable
				width="50") {{ timestampToDate(row.args.timestamp) }}
			b-table-column(
				field="address"
				label="Address"
				width="150").has-text-primary.overflow-reset
				b-tooltip(
					:label="row.args.customerAddress"
					type="is-black"
					position="is-bottom"
				).w-100
					a(
						:href="getAddressLink(row.args.customerAddress)"
						target="_blank"
					).text-clamp {{ row.args.customerAddress }}
			b-table-column(
				field="transactionHash"
				label="TxHash"
				width="150"
			).has-text-primary.overflow-reset
				b-tooltip(
					:label="row.transactionHash"
					type="is-black"
					position="is-bottom"
				).w-100
					a(
						:href="getTxLink(row.transactionHash)"
						target="_blank"
					).text-clamp {{ row.transactionHash }}
			b-table-column(
				field="contract"
				label="Contract"
				width="20"
				header-class="right-align"
				cell-class="text-right"
			) {{ row.contract }}
			b-table-column(
				field="rate"
				label="Rate"
				width="50"
				header-class="right-align"
				cell-class="text-right"
			).text-right {{ formatCurrency(row.args.RATE, 'rate') }}
			b-table-column(
				field="amountETH"
				label="Amount, USDT"
				width="50"
				sortable
				header-class="right-align"
				:style="{ textAlign: 'right' }"
			).text-right {{ formatCurrency(row.args.USDT, 'usdt')}}
		template(slot="footer")
			div
				div.mb-6.center
					button.default-button(@click="$emit('more')" v-if="showMoreButton") {{ $t("показать еще") }}
				.is-size-5.has-background-info.total-withdraw.mb-3.is-flex.is-flex-direction-column.is-align-items-flex-start
					p Dividends accrual: {{`${formatCurrency(totals.dividend_accural, 'usdt')} USDT`}}
</template>

<script>
import formatDate from "~/mixins/formatDate";
import formatCurrency from "~/mixins/formatCurrency";
import etherscan from "~/mixins/etherscan";
import tableMixin from "~/components/tables/ReportTables/tableMixin";

export default {
	mixins: [formatDate, formatCurrency, etherscan, tableMixin],

}
</script>

<style lang="scss" scoped>

</style>
