import web3 from "~/utils/web3";
import {ToastProgrammatic as Toast} from 'buefy'
import _ from "lodash";

export const actions = {
  async prolongContract({}, {userId, data}) {
    return await this.$axios.post(`/admin/users/${userId}/deposits/prolong/`, data).then(resp => {
      return true
    }).catch(err => {
      Toast.open({message: err, type: 'is-danger'})
    })
  },
	// TODO deprecated, delete after 01.01.2020
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
	// TODO deprecated, delete after 01.01.2020
  async _passRepayMany({rootGetters}, data) {
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

