import {MetamaskWrapper, MetamaskInstance} from "~/utils/metamaskWrapper";
import Web3 from "web3";

export class Web3Controller {

	constructor(app) {
		this._app = app
	}

	async initMetamask() {
		MetamaskInstance.app = this._app
		await MetamaskInstance.init()
		return MetamaskInstance
	}

	async initWeb3() {
		let web3 = null
		const {store} = this._app
		const {metamask} = this._app._web3

		if (metamask?.provider && metamask.provider.isConnected()) {
			if (
				(process.env.ENV === "production" && metamask.provider.chainId === "0x1") ||
				(process.env.ENV !== "production" && metamask.provider.chainId === "0x4")
			) {
				try {
					web3 = new Web3(metamask.provider)
				} catch (e) {
					console.error(e)
				}
			}
		}

		if (!web3) {
			const infuraUrl = store.getters["contract/infura"]
			web3 = new Web3(new Web3.providers.WebsocketProvider(infuraUrl.ws))
		}
		return web3

	}

	async initWeb3Contracts() {
		let contracts = {}
		const {store} = this._app
		const {web3} = this._app._web3

		store.getters["contract/contractsMeta"].map(i => {
			if (i.abi && i.address) {
				contracts[i.title] = new web3.eth.Contract(i.abi, i.address)
			}
		})

		return contracts
	}

	async init() {
		const {store} = this._app
		await store.dispatch("contract/prefetchContractMeta")

		this.initMetamask().then(metamask => {
			this._app._web3.metamask = metamask
		})
		this.initWeb3().then(async web3 => {
			this._app._web3.web3 = web3
			this._app._web3.contracts = await this.initWeb3Contracts()
		})

	}
}
