<template lang="pug">
	div
		CustomSlider(
			:active-dot="1"
			:dots="4"
		)
			template(slot="content")
				.is-fullheight
					.content.search_block.is-fullheight.is-fullwidth
						.reports__container
							.reports__title_block Отчеты
								| {{ queryParams }}
							.reports__body
								.reports__body_form_block
									base-input(
										label="Адрес или хэш:"
										v-model="queryParams.query"
									).mb-4
									base-select(
										:options="contractOptions"
										label="Контракт:"
										v-model="queryParams.contract"
									).mb-4
									base-select(
										:options="transactionOptions"
										label="Тип:"
										v-model="queryParams.transaction"
									).mb-4
									base-datepicker(
										label="Дата старта:"
										v-model="queryParams.toDate"
									).mb-4
									base-datepicker(
										label="Дата финала:"
										v-model="queryParams.fromDate"
									).mb-4
									base-input(
										label="От USDT:"
										type="number"
										v-model.number="queryParams.fromUSDT"
									).mb-4
									base-input(
										label="До USDT:"
										type="number"
										v-model="queryParams.toUSDT"
									).mb-4
								.reports__action_block
									| Lorem ipsum dolor sit amet.

		ReportsTable(table-type="depositAccural")
</template>

<script>
import CustomSlider from "~/components/ui/CustomSlider";
import CustomInput from "~/components/ui/CustomInput";
import { ReportsTable } from "~/components/tables";

export default {
	components: {
		CustomSlider,
		ReportsTable,
		CustomInput,
	},

	layout: "profile",
	middleware: ["managerRequired", "contracts", "adminRequired"],

	data() {
		return {
			queryParams: {
				query: '',
				contract: '',
				transaction: 'all',
				fromDate: null,
				toDate: null,
				fromUSDT: '',
				toUSDT: '',
			},

			contractOptions: [
				{
					text: "NTSCD",
					value: "NTSCD"
				},
				{
					text: "NTS80",
					value: "NTS80"
				},
				{
					text: "NTS165",
					value: "NTS165"
				},
				{
					text: "NTS81",
					value: "NTS81"
				},
				{
					text: "All",
					value: "all"
				}
			],

			transactionOptions: [
				{
					text: "Investments",
					value: "investments"
				},
				{
					text: "Dividend Withdraw",
					value: "dividend_withdraw"
				},
				{
					text: "Dividend Accural",
					value: "dividend_accural"
				},
				{
					text: "Deposit Withdraw",
					value: "deposit_withdraw"
				},
				{
					text: "Deposit Accural",
					value: "deposit_accural"
				},
				{
					text: "Active Deposits",
					value: "deposits"
				},
				{
					text: "All",
					value: "all"
				}
			]
		}
	},

	async asyncData({store}) {
		return await store.dispatch("reports/fetchTransactionsByQuery", {
			query: "",
			contract: "",
			transaction: "all",
			fromDate: null,
			toDate: null
		});
	}

}
</script>

<style lang="scss" scoped>
.reports__container {
	.reports__title_block {
		font-weight: normal;
		font-size: 24px;
		line-height: 120%;
		margin-bottom: 20px;
	}

	.reports__body {
		display: grid;
		grid-template-columns: 1fr 50px 1fr;

		.reports__action_block {
			grid-column-start: 3;
		}
	}
}
</style>
