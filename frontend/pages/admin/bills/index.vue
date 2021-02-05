<template lang="pug">
	div
		CustomSlider(hide-dots)
			template(slot="content")
				.is-fullheight
					.content.search_block.is-fullheight.is-fullwidth
						.bills__container.is-fullheight
							.profile_block__title {{ $t('bills') }}
							AdminCreateBill
		BillTable(
			:data="billsWithPagination"
			:count="bills.length"
			:pagination="pagination"
			@more="pagination.page += 1"
		)
</template>

<script>
import { CustomSlider } from '~/components'
import { BillTable } from '~/components/tables'
import { mapGetters } from 'vuex'
import { itemPagination } from '~/utils/pagination'
import { AdminCreateBill } from '~/components'

export default {
	layout: 'profile',
	middleware: ['managerOrAdminRequired'],

	components: {
		CustomSlider,
		BillTable,
		AdminCreateBill,
	},

	data() {
		return {
			pagination: {
				page: 1,
				limit: 20,
			},
		}
	},

	computed: {
		...mapGetters({
			bills: 'bills/createdInvoices',
		}),

		billsWithPagination() {
			return itemPagination(this.bills)(this.pagination)
		},
	},

	async asyncData({ store }) {
		await store.dispatch('bills/fetchCreatedInvoices')
	},
}
</script>

<style lang="scss">
.bills__container {
	.profile_block__title {
		font-size: 2em;
	}
}
</style>
