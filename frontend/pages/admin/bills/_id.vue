<template lang="pug">
	div
		CustomSlider(hide-dots)
			template(slot="content")
				div
					.content.search_block.is-fullwidth
						.bill_details__container
							.profile_block__title Invoice info
							span Invoice created at: {{timestampFromUtc(tableData.created_at)}}
							div.columns.mt-3
								div.column
									span.is-4 From: {{readableDateWithoutDays(tableData.timestamp_from)}}
								div.column
									span.is-4 To: {{readableDateWithoutDays(tableData.timestamp_to)}}
							div.columns
								div.column
									span.is-4 Total ETH: {{formatCurrency(tableData.total_eth, 'eth')}}
								div.column
									span.is-4 Total USDT: {{formatCurrency(tableData.total_usdt, 'usdt')}}
							div(v-if="tableData.invoice_addresses").mb-3
								span Total Subinvoices: {{tableData.invoice_addresses.length}}
							div(v-if="tableData.payment_transaction_hash && tableData.payment_transaction_hash.length") Payment transactions:
								p(v-for="(tx) in tableData.payment_transaction_hash") {{tx[0] + 1}}:
									a(:href="getTxLink(tx[1])" target="_blank").text-clamp {{"\t" + tx[1].slice(0, 50)}}...
							div.columns.mt-5
								div.column
									b-button(type="is-info" @click="triggerPayInvoiceModal") {{$t('pay')}}
								div.column
									b-button(type="is-info" @click="saveAsExcel") {{$t('export')}} .xls
								div.column
									b-button(type="is-info" @click="saveAsExcelAll") {{$t('exportAll')}} .xls
		.container
			base-input(
				v-model="searchQuery"
				placeholder="Search address"
			).admin_search__bar.my-5.mx-2
			b-table(
				:data="items.elements"
			).custom-table.mb-3
				template(slot-scope="props")
					b-table-column(field="id" label="ID" width="100")
						nuxt-link(:to="`/admin/bills/address/${props.row._id}`").text-clamp {{props.row._id}}
					b-table-column(field="address" label="Address" width="150").has-text-primary.overflow-reset
						b-tooltip(:label="props.row.address" type="is-black" position="is-bottom").w-100
							a(:href="getAddressLink(props.row.address)" target="_blank").text-clamp {{ props.row.address }}
					b-table-column(field="totalInvestedUSDT" label="Invested, USDT" width="40") {{ formatCurrency(props.row.deposit_usdt, 'usdt') }}
					b-table-column(field="totalUSDT" label="Total, USDT" width="40")
						a(class="terms-link" @click="updateTotalModal({value: props.row.total_usdt, id: props.row._id})") {{ formatCurrency(props.row.total_usdt, 'usdt') }}
					b-table-column(field="delete" label="" width="90")
						PayInvoiceButton(:invoiceData="props.row" defaultButton)
				template(slot="footer")
					div
						div.mb-6.center
							button.default-button(@click="pagination.page += 1" v-if="showMoreButton") {{ $t("показать еще") }}
</template>

<script>
import { CustomSlider } from "~/components";
import formatCurrency from "~/mixins/formatCurrency";
import formatDate from "~/mixins/formatDate";
import {mapActions, mapGetters} from "vuex";
import PayInvoiceModal from "~/components/modals/PayInvoiceModal";
import {exportHelper} from "~/utils/exportHelper";
import {saveAs} from 'file-saver';
import PayInvoiceButton from "~/components/PayInvoiceButton";
import etherscan from "~/mixins/etherscan";
import {itemPagination} from "~/utils/pagination";

export default {
	layout: 'profile',

	middleware: ["authRequired", "adminRequired"],

	mixins: [formatCurrency, formatDate, etherscan],

	components: {
		CustomSlider,
		PayInvoiceButton,
	},

	data() {
		return {
			searchQuery: '',
			pagination: {
				page: 1,
				limit: 20,
			}
		}
	},

	computed: {
		...mapGetters({
			tableData: 'bills/invoiceDataByID',
		}),

		showMoreButton() {
			return this.items.total > this.pagination.limit * this.pagination.page
		},

		items() {
			let items = this.tableData.invoice_addresses;

			if (this.searchQuery.length >= 3) {
				return itemPagination(items)({
					...this.pagination,
					getTotal: true,
					query: {
						fields: ['address'],
						text: this.searchQuery,
					}
				})
			}

			return itemPagination(items)({...this.pagination, getTotal: true});
		},
	},

	methods: {
		...mapActions({
			getBillExtendedData: 'bills/getBillExtendedData',
			updateTotal: 'bills/updateTotal',
		}),

		triggerPayInvoiceModal() {
			this.$buefy.modal.open({
				parent: this,
				component: PayInvoiceModal,
				trapFocus: true,
				props: {
					invoice: this.tableData,
				}
			});
		},

		updateTotalModal(data) {
			this.$buefy.dialog.prompt({
				message: `Total USDT`,
				inputAttrs: {
					type: "number",
					placeholder: "Type total here",
					value: (data.value / 1e6).toFixed(2),
					min: 0,
					step: "any"
				},
				trapFocus: true,
				onConfirm: value =>
					this.updateTotalAction({total_usdt: value * 1e6, id: data.id})
			});
		},

		async updateTotalAction(data) {
			try {
				await this.updateTotal(data);

				this.$buefy.toast.open({
					message: "Total updated!",
					type: "is-success"
				})
			} catch (e) {
				this.$buefy.toast.open({
					message: "Something went wrong!",
					type: "is-danger"
				})
			}
		},

		saveAsExcel() {
			return exportHelper({
				data: this.tableData.invoice_addresses,
				type: 'bills',
			})
		},

		async saveAsExcelAll() {
			const { _id: id } = this.tableData
			const data = await this.getBillExtendedData(id);

			saveAs(data, `invoice_${id}_all.xlsx`);
		}
	},

	async asyncData({ params, store }) {
		const { id } = params;

		await store.dispatch("bills/fetchInvoiceById", id);
	}
}
</script>

<style lang="scss">
.bill_details__container {

}
</style>
