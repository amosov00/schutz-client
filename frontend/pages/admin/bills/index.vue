<template lang="pug">
	div
		CustomSlider(hide-dots)
			template(slot="content")
				.is-fullheight
					.content.search_block.is-fullheight.is-fullwidth
						.bills__container.is-flex.is-fullheight.is-align-items-center.is-justify-content-center
							.profile_block__title {{ $t('bills') }}
		.container.mb-3.is-flex.is-justify-content-flex-end
			button.default-button(@click="openCreateModal") Создать счёт
		BillTable(
			:data="billsWithPagination"
			:count="bills.length"
			:pagination="pagination"
			@more="pagination.page += 1"
		)
</template>

<script>
import { CustomSlider } from "~/components";
import { BillTable } from "~/components/tables";
import {mapGetters} from "vuex";
import {itemPagination} from "~/utils/pagination";
import { AdminCreateBill } from "~/components/modals";

export default {
	layout: "profile",
	middleware: ["managerOrAdminRequired", "contracts"],

	components: {
		CustomSlider,
		BillTable,
	},

	data() {
		return {
			pagination: {
				page: 1,
				limit: 20,
			}
		}
	},

	computed: {
		...mapGetters({
			bills: 'bills/createdInvoices',
		}),

		billsWithPagination() {
			return itemPagination(this.bills)(this.pagination);
		}
	},

	methods: {
		openCreateModal() {
			this.$modal.open({
				factory: () => AdminCreateBill,
			})
		}
	},

	async asyncData({store}) {
		await store.dispatch("bills/fetchCreatedInvoices")
	}
}
</script>

<style lang="scss">
.bills__container {
	.profile_block__title {
		font-size: 2em;
	}
}
</style>
