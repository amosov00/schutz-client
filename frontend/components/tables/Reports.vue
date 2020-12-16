<template lang="pug">
	.container
		.level
			.level-left.is-size-5.has-text-primary.mb-4 Результаты поиска
		component(
			:is="table.component"
			:data="table.data"
			@more="onMore"
		)
</template>

<script>
import {
	All,
	Investment,
	DividendWithdraw,
	DepositAccural,
	DividendAccural,
	ActiveDeposit,
} from '~/components/tables/ReportTables';
import { mapGetters } from "vuex";

export default {
	props: {
		tableType: {
			type: String,
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
				all: All,
				investment: Investment,
				dividendWithdraw: DividendWithdraw,
				dividendAccural: DividendAccural,
				depositAccural: DepositAccural,
				activeDeposit: ActiveDeposit,
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
				investment: this.transactions(this.page, 10) || [],
				dividendWithdraw: this.transactions(this.page, 10) || [],
				dividendAccural: this.transactions(this.page, 10) || [],
				depositAccural: this.transactions(this.page, 10) || [],
				activeDeposit: this.activeDeposit(this.page, 10) || [],
			}
		},

		table() {
			return {
				component: this.tableComponent[this.tableType],
				data: this.tableData[this.tableType],
			}
		}
	},

	watch: {
		tableType: {
			handler() {
				this.page = 1;
			}
		}
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
