export const state = () => ({
  contracts: [],
  infura: {
    http: null,
    ws: null,
  },
});
export const getters = {
  contract: s => contact => s.contracts.filter(i => i.title === contact),
  contracts: s => s.contracts,
  infura: s => s.infura,
};
export const mutations = {
  setContracts: (state, payload) => state.contracts = payload,
  setInfuraLinks: (state, payload) => state.infura = payload,
};
export const actions = {
  async fetchContractsV2({commit}) {
    await this.$axios.get("/meta/v2/contract/").then(resp => {
      commit("setContracts", resp.data.contracts)
      commit("setInfuraLinks", {
        "http": resp.data.infura_http,
        "ws": resp.data.infura_ws,
      })
    }).catch(_ => {
    })
    return true
  },
};
