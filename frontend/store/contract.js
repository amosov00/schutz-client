export const state = () => ({
  contractsMeta: [],
  infura: {
    http: null,
    ws: null,
  },
});
export const getters = {
	contractMeta: s => contact => s.contractsMeta.filter(i => i.title === contact),
	contractsMeta: s => s.contractsMeta,
  infura: s => s.infura,
};
export const mutations = {
  setContractsMeta: (state, payload) => state.contractsMeta = payload,
  setInfuraLinks: (state, payload) => state.infura = payload,
};
export const actions = {
  async fetchContractsV2({commit}) {
    await this.$axios.get("/meta/v2/contract/").then(resp => {
      commit("setContractsMeta", resp.data.contracts)
      commit("setInfuraLinks", {
        "http": resp.data.infura_http,
        "ws": resp.data.infura_ws,
      })
    }).catch(_ => {
    })
    return true
  },
	async getContractsMeta({getters, dispatch}) {
  	if (getters.contractsMeta.length === 0) {
  		await dispatch("fetchContractsV2")
		}
  	return getters.contractsMeta
	}
};
