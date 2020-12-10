export default function ({store}) {
	if (!store.getters["metamask/ethAddress"]) {
		store.dispatch("metamask/getMetamaskAddress")
			.then(_ => {
				if (store.getters.user.ethereum_wallet.toLowerCase() === store.getters["metamask/ethAddress"]) {
					store.commit("metamask/setIsConnected", true);
				}
			}).catch(err => {
			console.error(err)
		})
	}
}
