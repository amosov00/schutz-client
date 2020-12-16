<template lang="pug">
	b-table(
		:data="data"
		:loading="loading"
		default-sort="amount_usdt"
		default-sort-direction="desc"
	).custom-table.mb-4
		template(slot-scope="{ row }")
			b-table-column(
				field="user_id"
				label="User ID"
				width="150"
			).overflow-reset {{ row.user_id }}
			b-table-column(
				field="address"
				label='ETH Address'
				width="150"
			).overflow-reset
				b-tooltip(
					:label="row.ethereum_wallet"
					type="is-black"
					position="is-bottom"
				).w-100
					a(:href="getAddressLink(row.ethereum_wallet)" target="_blank").text-clamp {{ row.ethereum_wallet }}
			b-table-column(
				field='amount_usdt'
				label='Amount, USDT'
				width='30'
				sortable
			) {{ formatCurrency(row.amount_usdt, 'usdt')}}
			b-table-column(
				field='button'
				width='30'
				header-class='right-align'
				cell-class='text-right'
			)
				nuxt-link(:to='`/reports/${row._id}`')
					b-button(type='is-info') Просмотр
		template(slot='footer')
			div
				div.mb-6.center
					button.show-more(@click="$emit('more')") показать еще
				p.title.is-size-4
					| Total: {{ formatCurrency(data.total, 'usdt' )}}USDT
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

<style scoped>

</style>
