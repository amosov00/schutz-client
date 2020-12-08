import web3 from "~/utils/web3";

export const state = () => ({});
export const getters = {};
export const mutations = {};
export const actions = {
  async invest({commit, dispatch, rootGetters}, value) {
    const gasPrice = rootGetters['metamask/gasPrice']
    const user = rootGetters["user"]
    return await window.ethereum
      .request({
        method: "eth_sendTransaction",
        params: [
          {
            from: window.ethereum.selectedAddress,
            to: this.$contracts().NTSCD._address,
            value: "0x00",
            gasPrice: web3.utils.toHex(web3.utils.toWei(`${gasPrice}`, "gwei")),
            gas: web3.utils.toHex("250000"),
            data: this.$contracts().NTSCD.methods.buy(
              value * 1e6,
              user.referral_1 || "0x0000000000000000000000000000000000000000",
              user.referral_2 || "0x0000000000000000000000000000000000000000",
              user.referral_3 || "0x0000000000000000000000000000000000000000",
            ).encodeABI()
          }]
      })
      .then(async tx => {
        commit("setIsTermsAcceped", false, {root: true});
        return true
      })
      .catch(err => {
        return false
      })
  },
  async withdraw({rootGetters}, value) {
    const gasPrice = rootGetters['metamask/gasPrice']
    return await window.ethereum
      .request({
        method: "eth_sendTransaction",
        params: [
          {
            from: window.ethereum.selectedAddress,
            to: this.$contracts().Schutz._address,
            value: "0x00",
            gasPrice: web3.utils.toHex(web3.utils.toWei(`${gasPrice}`, "gwei")),
            gas: web3.utils.toHex("250000"),
            data: this.$contracts().Schutz.methods.withdraw(
              value * 1e6
            ).encodeABI()
          }]
      })
      .then(async tx => {
        return true
      })
      .catch(err => {
        return false
      })
  },
  async reinvest({rootGetters}, value) {
    const gasPrice = rootGetters['metamask/gasPrice']
    return await window.ethereum
      .request({
        method: "eth_sendTransaction",
        params: [
          {
            from: window.ethereum.selectedAddress,
            to: this.$contracts().Schutz._address,
            value: "0x00",
            gasPrice: web3.utils.toHex(web3.utils.toWei(`${gasPrice}`, "gwei")),
            gas: web3.utils.toHex("250000"),
            data: this.$contracts().Schutz.methods.reinvest(
              value * 1e6
            ).encodeABI()
          }]
      })
      .then(async tx => {
        return true
      })
      .catch(err => {
        return false
      })
  }
}
