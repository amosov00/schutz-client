<template lang="pug">
	div.repay-modal
		div.title.is-5.main-title Confirm deposit accural
		b-skeleton(v-if="loading" animated)
		section(v-else)
			p Total USDT to pay: {{ formatCurrency(totalUSDT, 'usdt') }}
			p Total addresses to pay: {{ totalAddresses }}
			b-button.my-3(type="is-primary" @click="passRepay" expanded) Pay
			b-table(:data="toTableData(paymentData)" :columns="tableColumns" striped :paginated='true' per-page="20")

</template>

<script>
import formatCurrency from "~/mixins/formatCurrency";
import formatDate from '~/mixins/formatDate'

export default {
	name: "PayInvoiceModal",
	mixins: [formatCurrency, formatDate],
	props: ["fromTimestamp"],
	data() {
		return {
			loading: false,
			paymentData: {},
			ids: [],
			totalUSDT: 0,
			tableColumns: [
				{field: 'address', label: 'Address'},
				{field: 'value', label: 'Value', width: 60},
				{field: 'comment', label: 'Comment'},
			]
		}
	},
	computed: {
		totalAddresses() {
			return this.paymentData.customerAddresses.length
		},
	},
	methods: {
		async passRepay() {
			return await this.$store.dispatch("adminContractIntegration/accrualDeposit", this.paymentData)
				.then(async txHash => {
					if (txHash) {
						await this.$store.dispatch('reports/updateAgreementPayment', {
							ids: this.ids,
							txHash
						})
						await this.$emit('updateAgreements')
					}
				})
		},
		toTableData(data) {
			let formattedData = []
			for (let i = 0; i < data.values.length; i++) {
				formattedData.push({
					"address": data.customerAddresses[i],
					"value": this.formatCurrency(data.values[i], "usdt"),
					"comment": data.comment,
				})
			}
			return formattedData
		}
	},
	async created() {
		this.loading = true
		const data = await this.$store.dispatch("reports/fetchAgreementPayment", this.fromTimestamp);
		this.loading = false
		if (!data) {
			this.$buefy.toast.open({message: "Failed to fetch data", type: "is-danger"})
			return
		}
		this.paymentData = data
		this.ids = data.ids
		this.totalUSDT = data.total
	},
}
</script>

<style lang="sass" scoped>
.repay-modal
	background: #ffffff
	padding: 40px 73px
	margin: auto
	color: black

.my-3
	margin: 1rem 0

.mr-auto
	margin-right: auto

.d-flex
	display: flex
</style>
