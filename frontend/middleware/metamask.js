export default async function ({store}) {
	if (!store.getters["metamask/ethAddress"]) {
		await store.dispatch("metamask/getMetamaskAddress");
		if (window.ethereum !== undefined) {
			if (store.getters.user.ethereum_wallet.toLowerCase() === store.getters["metamask/ethAddress"]) {
				store.commit("metamask/setIsConnected", true);
			}
		}
	}
}
