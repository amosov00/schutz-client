<template>
	<div class="modal-card" style="height: 300px">
		<header class="modal-card-head">
			<p class="modal-card-title">Total USDT</p>
		</header>
		<section class="modal-card-body">
			<b-field label="Amount">
				<b-input step="any" type="number" v-model="mutableAmount"></b-input>
			</b-field>
		</section>
		<footer class="modal-card-foot">
			<button class="button" type="button" @click="$parent.close()">
				Cancel
			</button>
			<button class="button is-primary" @click="updateAmount">Done</button>
		</footer>
	</div>
</template>

<script>
import formatCurrency from '~/mixins/formatCurrency'
export default {
	name: 'UpdateAmountModal',
	mixins: [formatCurrency],
	props: {
		agreement: {
			type: Object,
			required: true,
		},
	},
	data: () => ({
		mutableAmount: '',
	}),
	methods: {
		updateAmount() {
			const { _id } = this.agreement
			this.$emit('updateAmount', {
				_id,
				amount: this.formatCurrencyReversed(this.mutableAmount, 'usdt'),
			})
			this.$parent.close()
		},
	},
	mounted() {
		this.mutableAmount = this.formatCurrency(this.agreement.amount, 'usdt')
	},
}
</script>

<style scoped></style>
