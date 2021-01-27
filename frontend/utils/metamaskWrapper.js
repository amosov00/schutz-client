import detectEthereumProvider from "@metamask/detect-provider";

export class MetamaskWrapper {
	constructor() {
		this.provider = null
		this.app = null
	}

	isConnected() {
		return this.provider ? this.provider.isConnected() : false
	}

	_onConnect(connectInfo) {
		// console.log("_onConnect", connectInfo)
	}

	_onDisconnect(error) {
		// console.log("_onDisconnect", error)
	}

	_onAccountsChanged(accounts) {
		MetamaskInstance.app.store.dispatch("metamask/initMetamask", {
			force: true,
			accounts: accounts
		})
	}

	_onChainChanged(_) {
		window.location.reload()
	}

	_onMessage(message) {
		console.log("_onMessage", message)
		MetamaskInstance.app.store.dispatch("userContractIntegration/fetchBalances")
	}

	async init() {
		const {store} = this.app
		if (window.ethereum) {
			this.provider = await detectEthereumProvider()
			await store.dispatch("metamask/initMetamask", {
				force: false,
				accounts: null,
			})
		}
		this.initEventHandlers()
	}

	initEventHandlers() {
		if (this.isConnected()) {
			this.provider.on("connect", this._onConnect)
			this.provider.on("disconnect", this._onDisconnect)
			this.provider.on("accountsChanged", this._onAccountsChanged)
			this.provider.on("chainChanged", this._onChainChanged)
			this.provider.on("message", this._onMessage)
		}
	}
}


export const MetamaskInstance = new MetamaskWrapper()
