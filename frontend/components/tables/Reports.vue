<template lang="pug">
	.container
		.level
			.level-left.is-size-5.has-text-primary.mb-4 Результаты поиска
		component(
			:is="table.component"
			:data="table.data"
			@more="onMore"
			:loading="loading"
			:count="allItems[tableType].length"
			:pagination="{ page, limit }"
		)
		.is-flex.is-justify-content-flex-end.mb-5.mr-3
			button.default-button(@click="exportData" v-if="showExport") Экспорт данных
</template>

<script>
import { mapGetters } from 'vuex'
import { exportHelper } from '~/utils/exportHelper'

export default {
	props: {
		tableType: {
			type: String,
			required: true,
		},

		loading: {
			type: Boolean,
			required: true,
		},

		showExport: {
			type: Boolean,
			default: true,
		},
	},

	data() {
		return {
			page: 1,
			limit: 20,
		}
	},

	computed: {
		...mapGetters({
			itemsPagination: 'reports/itemsPagination',
			totals: 'reports/totals',
			activeDepositsDetails: 'reports/activeDepositsByID',
		}),

		tableComponent() {
			return {
				all: () => import('@/components/tables/ReportTables/All.vue'),
				investments: () =>
					import('@/components/tables/ReportTables/Investment.vue'),
				dividend_withdraw: () =>
					import('@/components/tables/ReportTables/DividendWithdraw.vue'),
				dividend_accural: () =>
					import('@/components/tables/ReportTables/DividendAccural.vue'),
				deposit_accural: () =>
					import('@/components/tables/ReportTables/DepositAccural.vue'),
				deposits: () =>
					import('@/components/tables/ReportTables/ActiveDeposit.vue'),
				deposit_withdraw: () =>
					import('@/components/tables/ReportTables/DepositWithdraw.vue'),
				active_deposit_details: () =>
					import('~/components/tables/ReportTables/ActiveDepositDetails.vue'),
			}
		},

		activeDepositContracts() {
			return this.itemsPagination('activeDepositContracts')
		},

		table() {
			return {
				component: this.tableComponent[this.tableType],
				data: this.tableData[this.tableType],
			}
		},

		transactions() {
			return this.itemsPagination('transactions')
		},

		allItems() {
			return {
				all: this.transactions(this.page, -1) || [],
				investments: this.transactions(this.page, -1) || [],
				dividend_withdraw: this.transactions(this.page, -1) || [],
				dividend_accural: this.transactions(this.page, -1) || [],
				deposit_accural: this.transactions(this.page, -1) || [],
				deposit_withdraw: this.transactions(this.page, -1) || [],
				deposits: this.activeDeposit(this.page, -1) || [],
				active_deposit_details:
					this.activeDepositContracts(this.page, -1) || [],
			}
		},

		activeDeposit() {
			return this.itemsPagination('activeDeposits')
		},

		tableData() {
			return {
				all: this.transactions(this.page, this.limit) || [],
				investments: this.transactions(this.page, this.limit) || [],
				dividend_withdraw: this.transactions(this.page, this.limit) || [],
				dividend_accural: this.transactions(this.page, this.limit) || [],
				deposit_accural: this.transactions(this.page, this.limit) || [],
				deposit_withdraw: this.transactions(this.page, this.limit) || [],
				deposits:
					this.activeDeposit(this.page, this.limit, {
						element: 'amount_usdt',
						direction: -1,
					}) || [],
				active_deposit_details:
					this.activeDepositContracts(this.page, this.limit) || [],
			}
		},
	},

	methods: {
		onMore() {
			this.page = this.page += 1
		},

		exportData() {
			return exportHelper({
				data:
					this.tableType === 'deposits'
						? this.activeDeposit(1, -1)
						: this.transactions(1, -1),
				type: this.tableType,
				totals: this.totals,
			})
		},
	},
}
</script>

<style lang="scss" scoped></style>
