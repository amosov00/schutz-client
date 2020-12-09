import web3 from "~/utils/web3";
import {ToastProgrammatic as Toast} from 'buefy'
import _ from "lodash";

export const state = () => ({
  allowance: 0,
  totalDeposit: 0,
  totalDividends: 0,
  repayBalance: 0,
});


export const getters = {
  allowance: s => s.allowance,
  totalDeposit: s => s.totalDeposit,
  totalDividends: s => s.totalDividends,
  repayBalance: s => s.repayBalance,
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
    if (_.isEmpty(getters["totalDividends"])) {
      await dispatch("getDividends", address);
    }
    if (_.isEmpty(getters["allowance"])) {
      await dispatch("getAllowance", address);
    }
  },
	async getAllowance({commit, dispatch}, address) {
		return await this.$contracts().USDT.methods
			.allowance(address, this.$contracts().Schutz._address)
			.call()
			.then(allowance => {
				allowance = parseInt(allowance)
				if (allowance === 0) {
					commit("setAllowance", allowance);
				} else {
					commit("setAllowance", Math.round(allowance / 1e6));
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
      .Schutz.methods.balanceOf(address)
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
      .Schutz.methods.interestBalance_(address)
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
    const repayBalance = await this.$contracts().Schutz.methods.repayBalance_(address).call();
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
    const methodABI = this.$contracts().Schutz._jsonInterface.find(
      el => el.name === "getRepay"
    );
    ethereum.sendAsync(
      {
        method: "eth_sendTransaction",
        params: [
          {
            from: ethereum.selectedAddress,
            to: this.$contracts().Schutz._address,
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
  },
  async passRepaySingle({rootGetters}, data) {
    if (!window.ethereum) {
      console.error("Metamask is not found")
      return
    }
    const gasPrice = rootGetters["metamask/gasPrice"];

    return window.ethereum
      .request({
        method: "eth_sendTransaction",
        params: [
          {
            from: window.ethereum.selectedAddress,
            to: this.$contracts().Schutz._address,
            value: "0x00",
            gasPrice: web3.utils.toHex(web3.utils.toWei(`${gasPrice}`, "gwei")),
            gas: web3.utils.toHex("250000"),
            data: this.$contracts().Schutz.methods.passRepay(
              data.amount,
              data.ethereum_wallet,
              `${data.contract} close`
            ).encodeABI()
          }
        ]
      })
      .then(txHash => {
        Toast.open({type: "is-success", message: "Success", duration: 1000})
        return true
      })
      .catch(err => {
        Toast.open({type: "is-danger", message: "Error", duration: 1000})
        return false
      })
  },
  async passRepayMany({rootGetters}, data) {
    /* формат данных
    data: {
      values: [Intereger, ],
      customerAddresses: [String, ],
      comments: [String, ]
    }
   */
    if (!window.ethereum) {
      console.error("Metamask is not found")
      return
    }
    const gasPrice = rootGetters["metamask/gasPrice"];

    return window.ethereum
      .request({
        method: "eth_sendTransaction",
        params: [
          {
            from: window.ethereum.selectedAddress,
            to: this.$contracts().OperatorNTS._address,
            value: "0x00",
            gasPrice: web3.utils.toHex(web3.utils.toWei(`${gasPrice}`, "gwei")),
            gas: web3.utils.toHex("7500000"),
            data: this.$contracts().OperatorNTS.methods.passRepayNTSCD(
              data.values,
              data.customerAddresses,
              data.comments,
              0
            ).encodeABI()
          }
        ]
      })
      .then(txHash => {
        Toast.open({type: "is-success", message: "Success", duration: 1000})
        return true
      })
      .catch(err => {
        Toast.open({type: "is-danger", message: "Error", duration: 1000})
      })
  }
};

