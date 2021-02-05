let screenWidthMixin = {
	data() {
		return {
			screenWidth:
				window.innerWidth ||
				document.documentElement.clientWidth ||
				document.body.clientWidth,
		}
	},
	computed: {
		isMobile() {
			return this.screenWidth <= 768
		},
	},
	mounted() {
		window.addEventListener('resize', () => {
			this.screenWidth =
				window.innerWidth ||
				document.documentElement.clientWidth ||
				document.body.clientWidth
		})
	},
}

export default screenWidthMixin
