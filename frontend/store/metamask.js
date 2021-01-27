import {METAMASK_STATE} from "~/consts";

export const state = () => ({
	isConnected: false,
	mode: METAMASK_STATE.OFFLINE,
  ethAddress: null,
  gasPrice: null,
});
export const getters = {
	isConnected: s => s.isConnected,
	mode: s => s.mode,
  ethAddress: s => s.ethAddress,
  gasPrice: s => s.gasPrice || 50,
}
export const mutations = {
	setIsConnected: (state, payload) => (state.isConnected = payload),
	setMode: (state, payload) => (state.mode = payload),
  setEthAddress: (state, payload) => (state.ethAddress = payload),
  setGasPrice: (state, gasPrice) => (state.gasPrice = gasPrice)
};
export const actions = {
  async getGasPrice({commit}) {
    return await this.$axios.get("/meta/gasprice/").then(resp => {
      commit("setGasPrice", resp.data.fast);
    }).catch(err => {
    });
  },
	async initMetamask({commit, getters, rootGetters}, {force, accounts}) {
  	if (force || !getters.isConnected) {
  		if (!accounts) {
				accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
			}
			const {ethereum_wallet} = rootGetters.user
			const activeAccount = accounts.length !== 0 ? accounts[0] : ""

			await commit("setIsConnected", true)
			await commit("setEthAddress", activeAccount)
			if (activeAccount.toLowerCase() === ethereum_wallet.toLowerCase()) {
				await commit("setMode", METAMASK_STATE.ONLINE)
			} else {
				await commit("setMode", METAMASK_STATE.WAITING)
			}
		}
	},
  async getMetamaskAddress({commit, getters, rootGetters}) {
    if (window.ethereum && !getters["ethAddress"]) {
      try {
        const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
        await commit("setEthAddress", accounts[0])
        return accounts[0]
      } catch (e) {
        console.error(e)
      }
    }
    return getters["ethAddress"]
  },
};
