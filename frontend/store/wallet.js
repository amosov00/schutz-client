import { ToastProgrammatic as Toast } from "buefy";

export const state = () => ({});

export const getters = {};

export const mutations = {};

export const actions = {
  async addWallet({}, wallet) {
    return await this.$axios
      .post("/account/add_ethereum_wallet/", {
        ethereum_wallet: wallet
      })
      .then(() => {
        Toast.open({ message: "Wallet added!", type: "is-success" });
        return true;
      })
      .catch(err => {
        Toast.open({
          message: err.response.data[0].message,
          type: "is-danger",
          duration: 6000
        });
        return false;
      });
  }
};
