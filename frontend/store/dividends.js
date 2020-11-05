import web3 from "~/plugins/web3";

export const state = () => ({});
export const mutations = {};
export const actions = {
  async withdraw({rootGetters}) {
    const gasPrice = rootGetters['metamask/gasPrice']
    ethereum.sendAsync(
      {
        method: "eth_sendTransaction",
        params: [
          {
            from: ethereum.selectedAddress,
            to: this.$contracts().NTSCD._address, // contract
            value: "0x00",
            gasPrice: web3.utils.toHex(web3.utils.toWei(`${gasPrice}`, "gwei")),
            gas: web3.utils.toHex("250000"),
            data: web3.eth.abi.encodeFunctionSignature({
              constant: false,
              inputs: [],
              name: "withdraw",
              outputs: [],
              payable: false,
              stateMutability: "nonpayable",
              type: "function"
            })
          }
        ]
      },
      (err, result) => {
        if (result) {
        } else {
        }
      }
    );
  },
  async reinvest({rootGetters}) {
    const gasPrice = rootGetters['metamask/gasPrice']
    ethereum.sendAsync(
      {
        method: "eth_sendTransaction",
        params: [
          {
            from: ethereum.selectedAddress,
            to: this.$contracts().NTSCD._address, // contract
            value: "0x00",
            gasPrice: web3.utils.toHex(web3.utils.toWei(`${gasPrice}`, "gwei")),
            gas: web3.utils.toHex("250000"),
            data: web3.eth.abi.encodeFunctionSignature({
              constant: false,
              inputs: [],
              name: "reinvest",
              outputs: [],
              payable: false,
              stateMutability: "nonpayable",
              type: "function"
            })
          }
        ]
      },
      (err, result) => {
        if (result) {
        } else {
        }
      }
    );
  }
};
export const getters = {};
