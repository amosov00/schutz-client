<template lang="pug">
	b-table(
		:data="data"
		:paginated='true'
		pagination-simple
		default-sort="args.timestamp"
		pagination-position="bottom"
	).custom-table
		template(slot-scope="props")
			b-table-column(field="args.timestamp" label="Date" sortable width="50") {{ timestampToDate(props.row.args.timestamp) }}
			b-table-column(field="event" label="Event" width="50") {{ props.row.event }}
				span(class="tag is-link" v-if="props.row.isReinvested") Reinvested
			b-table-column(field="txHash" label="txHash" width="150").has-text-primary.overflow-reset
				b-tooltip(:label="props.row.transactionHash" type="is-black" position="is-bottom").w-100
					a(:href="'https://etherscan.io/tx/' + props.row.transactionHash" target="_blank").text-clamp {{ props.row.transactionHash }}
			b-table-column(field="contract" label="Contract" width="20" header-class="right-align" cell-class="text-right") {{ showContract(props.row) }}
			b-table-column(field="amountUSDT" label="Amount, USDT" width="50" sortable header-class="right-align" cell-class="text-right") {{ formatCurrency(props.row.args.USDT, 'usdt')}}
			b-table-column(field="isDeactivated" label="is Deactivated" width="50" header-class="right-align" cell-class="text-right") {{ props.row.isDeactivated }}

</template>

<script>
import formatDate from '~/mixins/formatDate'
import formatCurrency from '~/mixins/formatCurrency'

export default {
	name: 'TransactionDeactivateTable',
	mixins: [formatDate, formatCurrency],
	props: {
		data: {
			type: Array,
			required: true,
		},
	},
	methods: {
		showContract(data) {
			return data.prolongedContract ? `${data.contract} (${data.prolongedContract})` : data.contract
		},
	},
}
</script>

<style scoped></style>
