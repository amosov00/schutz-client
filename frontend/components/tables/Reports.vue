<template lang="pug">
	.container
		.level
			.level-left.is-size-5.has-text-primary.mb-4 Результаты поиска
		component(
			:is="table.component"
			:data="table.data"
			@more="onMore"
			:loading="loading"
		)
</template>

<script>
import { mapGetters } from "vuex";

export default {
	props: {
		tableType: {
			type: String,
			required: true,
		},

		loading: {
			type: Boolean,
			required: true,
		}
	},

	data() {
		return {
			page: 1,
		}
	},

	computed: {
		...mapGetters({
			itemsPagination: 'reports/itemsPagination',
		}),

		tableComponent() {
			return {
				all: () => import('@/components/tables/ReportTables/All.vue'),
				investments: () => import('@/components/tables/ReportTables/Investment.vue'),
				dividend_withdraw: () => import('@/components/tables/ReportTables/DividendWithdraw.vue'),
				dividend_accural: () => import('@/components/tables/ReportTables/DividendAccural.vue'),
				deposit_accural: () => import('@/components/tables/ReportTables/DepositAccural.vue'),
				deposits: () => import('@/components/tables/ReportTables/ActiveDeposit.vue'),
				deposit_withdraw: () => import('@/components/tables/ReportTables/DepositWithdraw.vue'),
			}
		},

		table() {
			return {
				component: this.tableComponent[this.tableType],
				data: this.tableData[this.tableType]
			}
		},

		transactions() {
			return this.itemsPagination('transactions')
		},

		activeDeposit() {
			return this.itemsPagination('activeDeposits')
		},

		tableData() {
			return {
				all: this.transactions(this.page, 10) || [],
				investments: this.transactions(this.page, 10) || [],
				dividend_withdraw: this.transactions(this.page, 10) || [],
				dividend_accural: this.transactions(this.page, 10) || [],
				deposit_accural: this.transactions(this.page, 10) || [],
				deposit_withdraw: this.transactions(this.page, 10) || [],
				deposits: this.activeDeposit(this.page, 10) || [],
			}
		},
	},

	mounted() {
		console.log(this.tableData[this.tableType])
	},

	methods: {
		onMore() {
			this.page = this.page += 1;
		}
	},
}
</script>

<style lang="scss" scoped>

</style>
