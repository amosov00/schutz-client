<template lang="pug">
	div
		CustomSlider(hide-dots)
			template(slot="content")
				.is-fullheight
					.content.search_block.is-fullheight.is-fullwidth
						.reports__container
							.profile_block__title Отчеты
							.reports__body
								.reports__body_form_block
									base-input(
										label="Адрес или хэш:"
										v-model="queryParams.query"
									).mb-5
									base-select(
										:options="contractOptions"
										label="Контракт:"
										v-model="queryParams.contract"
									).mb-5
									base-select(
										:options="transactionOptions"
										label="Тип:"
										v-model="queryParams.transaction"
									).mb-5
									base-datepicker(
										label="Дата старта:"
										v-model="queryParams.fromDate"
									).mb-5
									base-datepicker(
										label="Дата финала:"
										v-model="queryParams.toDate"
									).mb-5
									base-input(
										label="От USDT:"
										type="number"
										v-model.number="queryParams.fromUSDT"
									).mb-5
									base-input(
										label="До USDT:"
										type="number"
										v-model="queryParams.toUSDT"
									).mb-5
								.reports__action_block
									.reports__magnifier_image.is-fullheight
									CustomButton(style="width: 100%" @click.native="search") Найти
		ReportsTable(
			:loading="loading"
			:table-type="tableType"
		)
</template>

<script>
import { CustomSlider, CustomInput, CustomButton } from "~/components"
import { ReportsTable } from "~/components/tables";
import { mapActions } from "vuex";

import {NTS_CONTRACTS} from "~/consts";

export default {
	components: {
		CustomSlider,
		ReportsTable,
		CustomInput,
		CustomButton,
	},

	layout: "profile",
	middleware: ["managerOrAdminRequired"],

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

			tableType: 'all',
			contractType: '',

			contractOptions: [
				{
					text: "Schutz",
					value: NTS_CONTRACTS.SCHUTZ
				},
				{
					text: "Schutz v1",
					value: NTS_CONTRACTS.SCHUTZV1
				},
				{
					text: "NTSCD",
					value: NTS_CONTRACTS.NTSCD
				},
				{
					text: "NTS80",
					value: NTS_CONTRACTS.NTS80
				},
				{
					text: "NTS165",
					value: NTS_CONTRACTS.NTS165
				},
				{
					text: "NTS81",
					value: NTS_CONTRACTS.NTS81
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
					text: "Deposit Accrual",
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
			],

			loading: false,
		}
	},

	methods: {
		...mapActions({
			fetchTransactionsByQuery: 'reports/fetchTransactionsByQuery',
		}),

		async search() {
			this.loading = true;

			await this.fetchTransactionsByQuery(this.queryParams);
			this.contractType = this.queryParams.contract;

			this.tableType = this.queryParams.transaction;

			this.loading = false;
		},
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



	.reports__body {
		display: grid;
		grid-template-columns: 1fr 50px 1fr;

		.reports__action_block {
			grid-column-start: 3;

			.reports__magnifier_image {
				background-image: url('~@/assets/img/search-magnifier.svg');
				background-repeat: no-repeat;
				background-position: center center;
				background-size: 250px 330px;

			}
		}
	}
}
</style>
