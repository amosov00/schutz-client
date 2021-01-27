<template lang="pug">
	div
		CustomSlider(hide-dots)
			template(slot="content")
				div
					.content.search_block.is-fullwidth
						.bill_address_details__container
							div.columns.mt-3
								div.column
									span.is-4 From: {{readableDateWithoutDays(invoiceData.timestamp_from)}}
								div.column
									span.is-4 To: {{readableDateWithoutDays(invoiceData.timestamp_to)}}
							div.columns
								div.column
									span.is-4 Total Deposit (ETH): {{formatCurrency(invoiceData.deposit_eth, 'eth')}}
								div.column
									span.is-4 Total Deposit (USDT): {{formatCurrency(invoiceData.deposit_usdt, 'usdt')}}
							div.columns
								div.column
									span.is-4 Total ETH: {{formatCurrency(invoiceData.total_eth, 'eth')}}
								div.column
									span.is-4 Total USDT:
										a(
											class="terms-link"
											v-if="invoiceData.is_paid"
										).ml-1 {{ formatCurrency(invoiceData.total_usdt, 'usdt')}}
										a(
											class="terms-link"
											v-else
											@click="updateTotalModal({value: invoiceData.total_usdt, id: invoiceData._id})"
										).ml-1 {{ formatCurrency(invoiceData.total_usdt, 'usdt')}}
							div.columns
								div.column(v-if="invoiceData.payment_transaction_hash")
									span.is-flex.is-align-items-center TxHash:
										a(:href="getTxLink(invoiceData.payment_transaction_hash)" target="_blank" rel="noopener").ml-1 {{ invoiceData.payment_transaction_hash }}
										b-icon(
											v-clipboard:copy="invoiceData.payment_transaction_hash"
											v-clipboard:success="onCopy"
											v-clipboard:error="onError"
											pack="fas"
											icon="copy"
											type="is-primary"
										).ml-2.is-cursor-pointer
							div.is-flex.is-align-items-center.columns
								.column
									span Address:
									a(:href="getTxLink(invoiceData.address)").ml-1 {{invoiceData.address}}
									b-icon(
										v-clipboard:copy="invoiceData.address"
										v-clipboard:success="onCopy"
										v-clipboard:error="onError"
										pack="fas"
										icon="copy"
										type="is-primary"
									).ml-2.is-cursor-pointer
							div.columns
								div.column
									PayInvoiceButton(:invoiceData="invoiceData")
		.container
			b-table(:data="transactions").custom-table.mb-4
				template(slot-scope="props")
					b-table-column(field="args.timestamp" label="Date" width="70") {{ timestampToDate(props.row.timestamp) }}
					b-table-column(field="txHash" label="txHash" width="150").has-text-primary.overflow-reset
						b-tooltip(:label="props.row.transactionHash" type="is-black" position="is-bottom").w-100
							a(:href="getTxLink(props.row.transactionHash)" target="_blank" rel="noopener").text-clamp {{ props.row.transactionHash }}
					b-table-column(field="event" label="Event" width="50") {{ props.row.event }}
					b-table-column(field="deposit" label="Depoit, USDT" width="90").text-right {{ formatCurrency(props.row.deposit_usdt, 'usdt') }}
					b-table-column(field="months" label="Months" width="20").text-right {{ props.row.months }}
					b-table-column(field="profitability" label="Profit, %" width="20").text-right {{ props.row.total_profitability.toFixed(4) }}
					b-table-column(field="rate" label="Rate" width="60").text-right {{ props.row.rate }}
					b-table-column(field="usdt" label="Total, USDT" v-if="props.row.total_usdt" width="90").text-right {{ formatCurrency(props.row.total_usdt, 'usdt') }}
					b-table-column(field="usdt" label="Total, USDT" width="90" v-else).text-right {{0}}
					b-table-column(field="contract" label="Contract" width="20") {{ props.row.contract }}
</template>

<script>
import { CustomSlider } from "~/components";
import {mapGetters} from "vuex";
import formatDate from "~/mixins/formatDate";
import formatCurrency from "~/mixins/formatCurrency";
import PayInvoiceButton from "~/components/PayInvoiceButton";
import etherscan from "~/mixins/etherscan";

export default {
	layout: 'profile',
	components: {
		CustomSlider,
		PayInvoiceButton,
	},

	mixins: [formatDate, formatCurrency, etherscan],

	middleware: ["authRequired", "adminRequired"],

	computed: {
		...mapGetters({
			invoiceData: 'bills/addressInvoiceData',
			transactions: 'bills/addressTransactions',
		})
	},

	methods: {
		onCopy(e) {
			this.$buefy.toast.open({
				message: `Copied: ${e.text}`,
				type: "is-success"
			});
		},

		onError() {
			this.$buefy.toast.open({
				message: "Copying failed!",
				type: "is-danger"
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

		updateTotalAction(data) {
			this.$store
				.dispatch("bills/updateTotal", data)
				.then(() =>
					this.$buefy.toast.open({
						message: "Total updated!",
						type: "is-success"
					})
				)
				.catch(() => {
					this.$buefy.toast.open({
						message: "Something went wrong!",
						type: "is-danger"
					});
				});
		}
	},

	async asyncData({ store, params }) {
		await store.dispatch("bills/fetchDetailedAddressData", params.id);
	}

}
</script>

<style lang="scss">
.bill_address_details__container {

}
</style>
