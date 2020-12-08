import Web3 from "web3";


function getWeb3(infuraURL) {
	let web3 = null

	if (window?.ethereum) {
		try {
			web3 = new Web3(window.ethereum)
			window.ethereum.enable();
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
