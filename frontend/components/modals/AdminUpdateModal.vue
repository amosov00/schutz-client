<template lang="pug">
	.modal-card.p-0
		header.modal-card-head
			.modal-card-title Total USDT
		section.modal-card-body
			base-input(
				label="Amount:"
				v-model="form.amount"
				type="number"
			).mb-5
		footer.modal-card-foot.is-flex.is-justify-content-flex-end
			b-button(type="is-danger" outlined @click="closeModal") Cancel
			b-button(type="is-primary" outlined @click="update") Submit
</template>

<script>
import formatCurrency from '~/mixins/formatCurrency'

export default {
	props: {
		agreement: {
			type: Object,
			required: true,
		},
	},

	mixins: [formatCurrency],

	data() {
		return {
			form: {
				amount: '',
			},
		}
	},

	methods: {
		closeModal() {
			this.$modal.close()
		},

		update() {
			this.$modal.resolve({
				_id: this.agreement._id,
				amount: this.formatCurrencyReversed(this.form.amount, 'usdt'),
			})

			this.closeModal()
		},
	},

	created() {
		this.form.amount = this.formatCurrency(this.agreement.amount, 'usdt')
	},
}
</script>

<style lang="scss"></style>
