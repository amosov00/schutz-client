<template lang="pug">
	b-modal(
		:active.sync="open"
		has-modal-card
	)
		Proxy(
			:component="modal.factory()"
			:props="modal.props"
			ref="dialog"
		)
</template>

<script>
import Proxy from '~/components/Proxy'

export default {
	components: { Proxy },

	props: {
		modal: {
			type: Object,
			required: true,
		},
	},

	data() {
		return {
			open: false,
		}
	},

	mounted() {
		this.open = true
	},
}
</script>

<style lang="scss">
.modal-card {
	background: #f9f9f6;
	border-radius: 12px;
	color: #000000;
	padding: 45px;

	.modal-card-body {
		background: transparent;
	}
}
</style>
