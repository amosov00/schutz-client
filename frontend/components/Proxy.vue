<script>
export default {
	props: {
		component: {
			type: [Function, Object],
			required: true,
		},
		props: {
			type: Object,
			default: null,
		},
	},

	render(createElement) {
		return createElement(this.component, {
			props: this.props,
		})
	},
}
</script>
