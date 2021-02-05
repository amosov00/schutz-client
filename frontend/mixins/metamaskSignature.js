import { makeEthSignature } from '~/utils'

export default {
	methods: {
		async makeMetamaskSignature() {
			let signature
			try {
				const { metamask } = await this.$web3()
				signature = await makeEthSignature(this.$store, metamask.provider)
			} catch (e) {
				this.$buefy.toast.open({
					message: 'Failed to sign terms and conditions',
					type: 'is-error',
				})
				return false
			}
			await this.$store.dispatch('agreeTermsAndConditions', signature)
			return true
		},
	},
}
