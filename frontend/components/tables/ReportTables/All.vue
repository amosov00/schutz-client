<template lang="pug">
	b-table.custom-table.mb-4(
		:data="data"
		:loading="loading"
	)
		template(slot-scope="{ row }")
			b-table-column(
				field="args.timestamp"
				label="Date"
				sortable
				width="50"
			) {{ timestampToDate(row.args.timestamp) }}
			b-table-column(
				field="event"
				label="Event"
				width="50"
			).is-flex.is-flex-direction-column.is-align-content-center {{ row.event }}
				span.tag.is-link(v-if="row.isReinvested") Reinvested
				span.tag.is-warning(v-if="row.isDeactivated") Deactivated
			b-table-column(
				field="address"
				label="Address"
				width="150"
			).overflow-reset
				b-tooltip(
					:label="row.args.customerAddress"
					type="is-black"
					position="is-bottom"
				).w-100
					a(:href="getAddressLink(row.args.customerAddress)" target="_blank").text-clamp {{ row.args.customerAddress }}
			b-table-column(
				field="txHash"
				label="Tx hash"
				width="150"
			).overflow-reset
				b-tooltip(
					:label="row.transactionHash"
					type="is-black"
					position="is-bottom"
				).w-100
					a(:href="getTxLink(row.transactionHash)" target="_blank").text-clamp {{ row.transactionHash }}
			b-table-column(
				field="contract"
				label="Contract"
				width="20"
				header-class="right-align"
				cell-class="text-right"
			) {{ showContract(row) }}
			b-table-column(
				field="amountUSDT"
				label="Amount, USDT"
				width="50"
				sortable
				header-class="amount_column_header"
				:style="{ textAlign: 'right' }"
			) {{ formatCurrency(row.args.USDT, 'usdt') }}
		template(slot="footer")
			div
				div.mb-6.center
					button.default-button(@click="$emit('more')" v-if="showMoreButton") {{ $t("показать еще") }}
				.is-size-5.has-background-info.total-withdraw.mb-3.is-flex.is-flex-direction-column.is-align-items-flex-start
					p Deposit accrual: {{ formatCurrency(totals.deposit_accural, 'usdt') }} USDT
					p Deposits withdraw: {{ formatCurrency(totals.deposit_withdraw, 'usdt') }} USDT
					p Dividends accrual: {{ formatCurrency(totals.dividend_accural, 'usdt')  }} USDT
					p Dividends withdraw: {{ formatCurrency(totals.dividend_withdraw, 'usdt') }} USDT
					p Deposits: {{ formatCurrency(totals.deposits, 'usdt') }}  USDT
					p Reinvestment: {{ formatCurrency(totals.reinvestment, 'usdt') }} USDT
</template>

<script>
import formatDate from '~/mixins/formatDate'
import formatCurrency from '~/mixins/formatCurrency'
import etherscan from '~/mixins/etherscan'
import tableMixin from '~/components/tables/ReportTables/tableMixin'

export default {
	mixins: [formatDate, formatCurrency, etherscan, tableMixin],
}
</script>

<style lang="scss">
.amount_column_header {
	padding-right: 0 !important;

	.th-wrap {
		margin-left: auto;
		padding-right: 0 !important;
		width: fit-content !important;
	}
}
</style>
