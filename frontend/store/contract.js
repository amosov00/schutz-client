import web3 from "@/plugins/web3";

export const state = () => ({
  NTSCD: {},
  USDT: {},
  OperatorNTS: {},
});
export const getters = {
  contract: s => contact => s[contact],
  contracts: s => s,
};
export const mutations = {
  setContract: (state, payload) => state[payload.title] = payload,
};
export const actions = {
  async fetchContracts({commit}) {
    const {data} = await this.$axios.get("/meta/contract/");
    data.map(i => {
      commit("setContract", i);
    })
    return true
  },
};
