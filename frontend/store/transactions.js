import web3 from "~/utils/web3";

export const state = () => ({});
export const mutations = {};
export const actions = {
  addFunds({ rootState, commit, dispatch, rootGetters }, value) {
    const gasPrice = rootGetters['metamask/gasPrice']
    dispatch("passTermsAgreement", {}, { root: true });
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
            data: web3.eth.abi.encodeFunctionCall(
              {
                constant: false,
                inputs: [
                  { internalType: "uint256", name: "value", type: "uint256" },
                  { internalType: "address", name: "_ref1", type: "address" },
                  { internalType: "address", name: "_ref2", type: "address" },
                  { internalType: "address", name: "_ref3", type: "address" }
                ],
                name: "buy",
                outputs: [
                  { internalType: "uint256", name: "", type: "uint256" }
                ],
                payable: false,
                stateMutability: "nonpayable",
                type: "function"
              },
              [
                `${value * 1e6}`,
                `${rootState.user.referral_1 ||
                  "0x0000000000000000000000000000000000000000"}`,
                `${rootState.user.referral_2 ||
                  "0x0000000000000000000000000000000000000000"}`,
                `${rootState.user.referral_3 ||
                  "0x0000000000000000000000000000000000000000"}`
              ]
            )
          }
        ]
      },
      (err, result) => {
        if (result) {
          commit("setIsTermsAcceped", false, { root: true });
        }
      }
    );
  },
  async getApprove({ dispatch, rootGetters }) {
    if (!window.ethereum) {
      console.error("Metamask is not found")
    }
    const gasPrice = rootGetters['metamask/gasPrice']
    await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [
        {
          from: window.ethereum.selectedAddress,
          to: this.$contracts().USDT._address,
          value: "0x00",
          gasPrice: web3.utils.toHex(web3.utils.toWei(`${gasPrice}`, "gwei")),
          gas: web3.utils.toHex("250000"),
          data: this.$contracts().USDT.methods.approve(
              this.$contracts().NTSCD._address, 1000000e6
          ).encodeABI()
        }]
    }).then(async tx => {
      dispatch("depositToggle", true);

    }).catch(err => {
      dispatch("depositToggle", false);
    })
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
  }
};
export const getters = {};
