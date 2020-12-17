import Web3 from "web3";


function getWeb3(infuraURL) {
	let web3 = null

	// TODO use ENV and chainId
	if (window?.ethereum && window.ethereum.chainId === "0x1") {
		try {
			web3 = new Web3(window.ethereum)
		} catch (e) {
			console.error(e)
		}
	}

	if (!web3) {
		web3 = new Web3(infuraURL)
	}
	return web3
}

export default ({app, store, redirect}, inject) => {
	inject("contracts", () => {
		if (!app._contracts) {
			const infura = store.getters["contract/infura"]
			const web3 = getWeb3(infura.ws);
			let contracts = {}
			store.getters["contract/contracts"].map(i => {
				if (i.abi && i.address) {
					contracts[i.title] = new web3.eth.Contract(i.abi, i.address)
				}
			})
			app._contracts = contracts
		}
		return app._contracts;
	});
};
