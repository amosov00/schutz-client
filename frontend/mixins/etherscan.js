export default {
	methods: {
		getAddressLink(address) {
			return `https://etherscan.io/address/${address}`
		},

		getTxLink(txHash) {
			return `https://etherscan.io/tx/${txHash}`
		},
	},
}
