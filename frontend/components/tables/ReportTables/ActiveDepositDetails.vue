<template lang="pug">
	b-table(
		:data="data"
		:loading="loading"
		:row-class="() => 'table-row-fade'"
	).custom-table.mb-4
		template(slot-scope="{ row }")
			b-table-column(field="contract" label="Contract" width="30") {{ showContract(row) }}
			b-table-column(field="open_date" label="Open date" width="30") {{ timestampToDate(row.open_date) }}
			b-table-column(field="close_date" label="Close date" width="30")
				a(@click.prevent="openUpdateCloseDateModal(row)") {{ timestampToDate(row.close_date) }}
			b-table-column(field="is_active" label="Active" width="30").has-text-primary.overflow-reset
				span(v-if="row.is_active").green Active
				span(v-else).red Not active
			b-table-column(
				field="amount_usdt"
				label="Amount, USDT"
				width="30"
				header-class="right"
				cell-class="text-right"
			) {{ formatCurrency(row.amount_usdt, 'usdt')}}
			b-table-column(field="button" width="70" cell-class="text-right").overflow-reset
				nuxt-link(:to="`/admin/reports/${$route.params.id}/${row.contract}`")
					b-button(type="is-primary is-small") История вкладов
		template(slot="footer")
			div
				div.mb-6.center
					button.default-button(@click="$emit('more')" v-if="showMoreButton") {{ $t("показать еще") }}
				.is-size-5.has-background-info.total-withdraw.mb-3.is-flex.is-flex-direction-column.is-align-items-flex-start
					p Total: {{ formatCurrency(total, 'usdt') }} USDT
					p TotalActive: {{ formatCurrency(totalActive, 'usdt') }} USDT
</template>

<script>
import formatDate from "~/mixins/formatDate";
import formatCurrency from "~/mixins/formatCurrency";
import etherscan from "~/mixins/etherscan";
import tableMixin from "~/components/tables/ReportTables/tableMixin";
import {mapActions, mapGetters} from "vuex";
import {UpdateCloseDateOfActiveDeposit} from "~/components/modals";

export default {
	mixins: [formatDate, formatCurrency, etherscan, tableMixin],

	computed: {
		...mapGetters({
			activeDepositDetails: 'reports/activeDepositsByID',
		}),

		total() {
			return this.activeDepositDetails.total;
		},

		totalActive() {
			return this.activeDepositDetails.total_active;
		},
	},

	methods: {
		...mapActions({
			updateCloseModal: 'reports/updateCloseDate',
			fetchActiveDepositByID: 'reports/fetchActiveDepositByID',
		}),

		showContract(data) {
			return data.prolongedContract ? `${data.contract} (${data.prolongedContract})` : data.contract
		},

		async openUpdateCloseDateModal(contractInfo) {
			try {
				console.log(contractInfo)
				const contract = Object.assign({}, contractInfo);
				let contracts = [...this.data];
				contract.close_date = await this.$modal.open({
					factory: () => UpdateCloseDateOfActiveDeposit,

					props: {
						title: 'Close Date for ' + this.showContract(contractInfo),
						closeDate: contractInfo.close_date,
					},

					options: {
						prompt: true,
					}
				});
				contracts = [...contracts.filter(({ contract: _ }) => _ !== contract.contract), contract];

				await this.updateCloseModal(Object.assign({}, this.activeDepositDetails, { contracts }))

				await this.fetchActiveDepositByID(this.activeDepositDetails._id);
			} catch (e) {
				console.error(e)
			}
		}
	}
}
</script>

<style scoped>

</style>
