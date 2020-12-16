<template lang="pug">
	div
		CustomSlider(
			:active-dot="1"
			:dots="4"
		)
			template(slot="content")
				.is-fullheight.is-flex.is-align-items-center.is-justify-content-center
					.content.search_block.is-fullheight.is-fullwidth Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, nostrum.
		ReportsTable(table-type="activeDeposit")
</template>

<script>
import CustomSlider from "~/components/ui/CustomSlider";
import { ReportsTable } from "~/components/tables";

export default {
	components: {
		CustomSlider,
		ReportsTable,
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
			}
		}
	},

	async asyncData({store}) {
		return await store.dispatch("reports/fetchTransactionsByQuery", {
			query: "",
			contract: "",
			transaction: "deposits",
			fromDate: null,
			toDate: null
		});
	}

}
</script>

<style lang="scss" scoped>

</style>
