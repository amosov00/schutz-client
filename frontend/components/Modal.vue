<template>
</template>

<script>
export default {
	props: {
		modal: {
			type: Object,
			required: true
		}
	},

	data() {
		return {
			open: false,
		}
	},

	mounted() {
		this.$buefy.modal.open({
			parent: this,
			component: this.modal.factory(),
			hasModalCard: true,
			props: this.modal.props,
		})
	}
}
</script>

<style lang="scss">
.modal-card {
	background: #F9F9F6;
	border-radius: 12px;
	color: #000000;
	padding: 45px;

	.modal-card-body {
		background: transparent;
	}
}
</style>
