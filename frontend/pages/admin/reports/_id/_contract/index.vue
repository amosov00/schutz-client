<template lang="pug">
	div
		CustomSlider(hide-dots)
			template(slot="content")
				.is-fullheight
					.content.search_block.is-fullheight.is-fullwidth
						.contract_details__container
							.contract_details__header.profile_block__title Contract details
							div
								p.contract_details__line Address -
									a.ml-1(:href="getAddressLink(address)") {{ address }}
									span.ml-3(
										v-clipboard="activeDepositTransactions.ethereum_wallet"
										v-clipboard:success="clipboardSuccessHandler"
									)
										b-icon(pack="fas" icon="copy" type="is-primary")
								p.contract_details__line Contract - {{ contract }}
								p.contract_details__line Status -
									span.ml-1(v-if="isActive") Active
									span.ml-1(v-else) Not active
		ActiveDepositTransactions(
			:data="transactionsWithPagination"
			:count="transactions.length"
			:pagination="pagination"
			:total="activeDepositTransactions.total_usdt"
			@more="page = page + 1"
		)
</template>

<script>
import { CustomSlider } from "~/components";
import { ActiveDepositTransactions } from "~/components/tables/ReportTables";
import {mapGetters} from "vuex";
import etherscan from "~/mixins/etherscan";
import {itemPagination} from "~/utils/pagination";

export default {
	middleware: ["authRequired", "adminRequired", "contracts"],

	components: {
		CustomSlider,
		ActiveDepositTransactions,
	},

	mixins: [ etherscan ],

	layout: 'profile',

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
			activeDepositTransactions: 'reports/activeDepositTransactions'
		}),

		address() {
			return this.activeDepositTransactions.ethereum_wallet;
		},

		contract() {
			return this.activeDepositTransactions.contract;
		},

		isActive() {
			return this.activeDepositTransactions.is_active;
		},

		transactions() {
			return this.activeDepositTransactions.transactions;
		},

		transactionsWithPagination() {
			return itemPagination(this.transactions)(this.pagination.page, this.pagination.limit);
		}
	},

	methods: {
		clipboardSuccessHandler() {
			this.$buefy.toast.open({
				message: "Copied!",
				type: "is-success"
			});
		}
	},

	async asyncData({ store, params }) {
		return await store.dispatch("reports/fetchActiveDepositTransactions", params);
	}
}
</script>

<style lang="scss">
.contract_details__container {

	.contract_details__line {
		font-size: 1.25rem;
		font-weight: 400;
		line-height: 1.25;
	}
}
</style>
