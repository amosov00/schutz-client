import web3 from "~/plugins/web3";
import {ToastProgrammatic as Toast} from 'buefy'
import _ from "lodash";

export const state = () => ({
  allowance: "",
  totalDeposit: "",
  totalDividends: "",
  repayBalance: null,
});


export const getters = {
  allowance: s => s.allowance,
  totalDeposit: s => s.totalDeposit,
  totalDividends: s => s.totalDividends,
  repayBalance: s => s.repayBalance || 0,
};
export const mutations = {
  setAllowance: (state, allowance) => (state.allowance = allowance),
  setTotalDeposit: (state, deposit) => (state.totalDeposit = deposit),
  setTotalDividends: (state, deposit) => (state.totalDividends = deposit),
  setRepayBalance: (state, balance) => (state.repayBalance = balance),
};

export const actions = {
  async fetchBalanceData({dispatch, getters, rootGetters}) {
    let address = await dispatch("metamask/getMetamaskAddress", {}, {root: true});

    if (!address) {
      address = rootGetters["user"].ethereum_wallet
    }
    if (_.isEmpty(getters["totalDeposit"])) {
      await dispatch("getDeposit", address);
    }
    if (_.isEmpty(getters["deposit/totalDividends"])) {
      await dispatch("getDividends", address);
    }
    if (_.isEmpty(getters["deposit/allowance"])) {
      await dispatch("getAllowance", address);
    }
  },
  async getAllowance({commit, dispatch}, address) {
    return await this.$contracts()
      .USDT.methods.allowance(address, this.$contracts().NTSCD._address)
      .call()
      .then(allowance => {
        if (allowance === "0") {
          dispatch("depositToggle", false);
          commit("setAllowance", allowance / 1e6);
        } else {
          commit("setAllowance", allowance / 1e6);
        }
        return true;
      })
      .catch(err => {
        console.error(err)
        return false;
      });
  },
  async getDeposit({commit}, address) {
    return await this.$contracts()
      .NTSCD.methods.balanceOf(address)
      .call()
      .then(balance => {
        commit("setTotalDeposit", balance / 1e18);
        return true;
      })
      .catch(() => {
        return false;
      });
  },
  async getDividends({commit}, address) {
    return await this.$contracts()
      .NTSCD.methods.referralBalance_(address)
      .call()
      .then(balance => {
        commit("setTotalDividends", balance / 1e6);
        return true;
      })
      .catch(() => {
        return false;
      });
  },
  async getRepayBalance({commit, dispatch, rootGetters}) {
    let address = await dispatch("metamask/getMetamaskAddress", {}, {root: true});
    if (!address) {
      address = rootGetters["user"].ethereum_wallet
    }
    const repayBalance = await this.$contracts().NTSCD.methods.repayBalance_(address).call();
    commit("setRepayBalance", parseInt(repayBalance))
  },
  async depositToggle({}, value) {
    return await this.$axios
      .put("/account/user/", {
        is_deposit_open: value
      })
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  },
  async getRepay({rootGetters}) {
    const gasPrice = rootGetters["metamask/gasPrice"];
    const methodABI = this.$contracts().NTSCD._jsonInterface.find(
      el => el.name === "getRepay"
    );
    ethereum.sendAsync(
      {
        method: "eth_sendTransaction",
        params: [
          {
            from: ethereum.selectedAddress,
            to: this.$contracts().NTSCD._address,
            value: "0x00",
            gasPrice: web3.utils.toHex(web3.utils.toWei(`${gasPrice}`, "gwei")),
            gas: web3.utils.toHex("250000"),
            data: web3.eth.abi.encodeFunctionSignature(methodABI)
          }
        ]
      },
      (err, result) => {
        if (result) {
          Toast.open({message: 'Transaction sent!', type: 'is-primary'})
        } else {
          Toast.open({message: 'Something went wrong!', type: 'is-danger'})
        }
      }
    );
  },
  async prolongContract({}, {userId, data}) {
    return await this.$axios.post(`/admin/users/${userId}/deposits/prolong/`, data).then(resp => {
      return true
    }).catch(err => {
      Toast.open({message: err, type: 'is-danger'})
    })
  }
};

