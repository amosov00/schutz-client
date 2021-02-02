<template lang="pug">
	.container
		b-table(
			:data="data"
			:loading="loading"
		).custom-table.mb-3
			template(slot-scope="props")
				b-table-column(field="args.timestamp" label="Date" width="50") {{timestampToDate(props.row.args.timestamp)}}
				b-table-column(field="event" label="Event" width="50") {{props.row.event}}
					span(class="tag is-link" v-if="props.row.isReinvested") Reinvested
				b-table-column(field="txHash" label="TxHash" width="150").overflow-reset
					b-tooltip(
						:label="props.row.transactionHash"
						type="is-black"
						position="is-bottom"
					).w-100
						a(:href="getTxLink(props.row.transactionHash)" target="_blank").text-clamp {{ props.row.transactionHash }}
				b-table-column.text-right(
					field="amount_usdt"
					label="Amount, USDT"
					width="50"
					header-class="right"
					cell-class="text-right"
				) {{ formatCurrency(props.row.args.USDT, 'usdt')}}
				b-table-column(field="isDeactivated" label="is Deactivated" width="50")
					span(class="tag is-warning" v-if="props.row.isDeactivated") Deactivated
			template(slot="footer")
				div
					div.mb-6.center
						button.default-button(@click="$emit('more')" v-if="showMoreButton") {{ $t("показать еще") }}
					.is-size-5.has-background-info.total-withdraw.mb-3.is-flex.is-flex-direction-column.is-align-items-flex-start
						p Total: {{ formatCurrency(total, 'usdt') }} USDT
</template>

<script>
import formatDate from "~/mixins/formatDate";
import formatCurrency from "~/mixins/formatCurrency";
import etherscan from "~/mixins/etherscan";
import tableMixin from "~/components/tables/ReportTables/tableMixin";

export default {
	mixins: [formatDate, formatCurrency, etherscan, tableMixin],

	props: {
		total: {
			type: Number,
			required: true,
		}
	},
}
</script>

<style scoped>

</style>
