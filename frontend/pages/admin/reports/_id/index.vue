<template lang="pug">
	div
		CustomSlider(hide-dots)
			template(slot="content")
				.is-fullheight
					.content.search_block.is-fullheight.is-fullwidth
						.reports_details__container
							.profile_block__title Active deposit detailed info
							.reports_details__main_block
								.reports_details__user_block
									div User ID:
									a(@click.prevent="openUserModal(userId)") {{ userId }}
									.reports_details__address_block Wallet address:
									a(:href="getAddressLink(address)") {{ address }}
		ReportsTable(
			:loading="loading"
			table-type="active_deposit_details"
			:showExport="false"
		)
</template>

<script>
import { CustomSlider } from '~/components';
import { mapGetters } from "vuex";
import etherscan from "~/mixins/etherscan";
import UserProfile from "~/components/modals/UserProfile";
import { ReportsTable } from "~/components/tables";

export default {
	middleware: ['authRequired', 'adminRequired'],

	layout: 'profile',

	mixins: [ etherscan ],

	components: {
		ReportsTable,
		CustomSlider,
	},

	data() {
		return {
			loading: false,
		}
	},

	computed: {
		...mapGetters({
			activeDepositsDetailedInfo: 'reports/activeDepositsByID'
		}),

		userId() {
			return this.activeDepositsDetailedInfo.user_id;
		},

		address() {
			return this.activeDepositsDetailedInfo.address;
		}
	},

	methods: {
		openUserModal(userId) {
			this.$modal.open({
				factory: () => UserProfile,
				props: {
					userId,
				}
			})
		}

	},

	async asyncData({ store, params }) {
		await store.dispatch('reports/fetchActiveDepositByID', params.id)
	},
}
</script>

<style lang="scss">
.reports_details__container {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	height: 100%;

	.reports_details__main_block {
		.reports_details__user_block {
			text-align: center;

			a {
				user-select: none;
				text-decoration: underline;
			}
		}
	}
}
</style>
