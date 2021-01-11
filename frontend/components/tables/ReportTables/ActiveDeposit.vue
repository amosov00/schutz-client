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
			).overflow-reset
				a.text-clamp(@click="openUserModal(row.user_id)") {{ row.user_id }}
			b-table-column(
				field="address"
				label='ETH Address'
				width="250"
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
				width='50'
				centered
				sortable
			) {{ formatCurrency(row.amount_usdt, 'usdt')}}
			b-table-column(
				field='button'
				width='100'
				header-class='right-align'
				cell-class='text-right'
			)
				nuxt-link(:to='`/admin/reports/${row._id}`')
					b-button(type='is-info') Просмотр
		template(slot='footer')
			div
				div.mb-6.center
					button.default-button(@click="$emit('more')" v-if="showMoreButton") {{ $t("показать еще") }}
				.is-size-5.has-background-info.total-withdraw.mb-3.is-flex.is-flex-direction-column.is-align-items-flex-start
					p.title.is-size-4
						| Total: {{ formatCurrency(activeDeposits.total, 'usdt' )}}USDT
				button.default-button(@click="saveAsExcelAll") Экспортировать все данные

</template>

<script>
import formatDate from "~/mixins/formatDate";
import formatCurrency from "~/mixins/formatCurrency";
import etherscan from "~/mixins/etherscan";
import tableMixin from "~/components/tables/ReportTables/tableMixin";
import { saveAs } from 'file-saver';
import {mapGetters} from "vuex";
import UserProfile from "~/components/modals/UserProfile";

export default {
	mixins: [formatDate, formatCurrency, etherscan, tableMixin],

	computed: {
		...mapGetters({
			activeDeposits: 'reports/activeDeposits'
		}),
	},

	methods: {
		async saveAsExcelAll() {
			this.$axios.get("/admin/active-deposits/extended/",{
				params: {
					as_excel: true,
				},
				responseType: "blob"
			}).then(resp => {
				saveAs(resp.data, `active_deposits_all.xlsx`)
			}).catch(e => {
				console.log(e)
			})
		},

		openUserModal(userId) {
			this.$modal.open({
				factory: () => UserProfile,
				props: {
					userId,
				}
			})
		},
	},
}
</script>

<style scoped>

</style>
