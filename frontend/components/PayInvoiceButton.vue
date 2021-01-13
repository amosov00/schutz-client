<template lang="pug">
	b-button(v-if="defaultButton" @click.once="payInvoice").default-button {{$t('payInvoice')}}
	b-button(v-else type="is-info" @click.once="payInvoice") {{$t('payInvoice')}}
</template>

<script>
import {ToastProgrammatic as Toast} from 'buefy'

export default {
	props: {
		invoiceData: {
			type: Object,
			required: true
		},

		defaultButton: {
			type: Boolean,
			default: () => false,
		}
	},
	methods: {
		async payInvoice() {
			const data = await this.$store.dispatch("bills/fetchInvoiceAddressPaymentData", {
				invoiceId: this.invoiceData.invoice_id,
				invoicePaymentId: this.invoiceData._id,
			})
			if (!data || data.hasProblem) {
				Toast.open({type: "is-danger", message: "Invoice has problem or already paid", duration: 2000})
				return
			}
			this.$store.dispatch("adminContractIntegration/accrualInterest", data)
				.then(async txHash => {
					await this.$store.dispatch("bills/updateInvoiceAddessTxHash", {
						id: this.invoiceData._id,
						txHash: txHash
					})
				}).catch(err => {
				console.error(err)
			})
		}
	}
};
</script>

<style></style>
