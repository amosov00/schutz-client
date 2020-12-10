export const state = () => ({
  ethAddress: null,
  isConnected: false,
  gasPrice: null,
});
export const getters = {
	isConnected: s => s.isConnected,
  ethAddress: s => s.ethAddress || "",
  gasPrice: s => s.gasPrice || 50,
}
export const mutations = {
  setEthAddress: (state, payload) => (state.ethAddress = payload),
  setIsConnected: (state, payload) => (state.isConnected = payload),
  setGasPrice: (state, gasPrice) => (state.gasPrice = gasPrice)
};
export const actions = {
  async getGasPrice({commit}) {
    return await this.$axios.get("/meta/gasprice/").then(resp => {
      commit("setGasPrice", resp.data.fast);
    }).catch(err => {
    });
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
