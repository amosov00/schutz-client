import {Web3Controller} from "@/utils"

export default ({app, store}, inject) => {
	inject("web3", async () => {
		if (!app._web3 && !app._web3Processing) {
			app._web3Processing = true;
			app._web3 = {
				metamask: null,
				web3: null,
				contracts: null,
			}
			const web3Instance = new Web3Controller(app)
			web3Instance.init().then(_ => {
				app._web3Processing = null;
				store.dispatch("userContractIntegration/fetchBalances")
			})
		}
		return app._web3;
	});
};
