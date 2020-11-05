import _ from "lodash";
import { ToastProgrammatic as Toast } from "buefy";

export const state = () => ({
  user: null,
  findedAddress: null,
  users: [],
  partners: [],
  referralLink: null,
  userTxData: null,
  isTermsAcceped: false
});

export const getters = {
  user: s => s.user,
  userById: s => id => s.users.filter(i => i._id === id)[0],
  transactions: s => s.transactions,
  transactionsAllWithFilter: s => contract => {
    return contract
      ? s.transactions.all.filter(i => i.contract === contract)
      : s.transactions.all;
  },
  txTotals: s => s.transactions.totals,
  investmentsWithFilter: s => contract => {
    return contract === "All"
      ? s.transactions.transactions
      : s.transactions.transactions.filter(i => i.contract === contract);
  },
  dividendsWithFilter: s => contract => {
    return contract === "All"
      ? s.transactions.transactions
      : s.transactions.transactions.filter(i => i.contract === contract);
  },
  findedAddress: s => s.findedAddress,
  users: s => s.users,
  partners: s => s.partners,
  referralLink: s => s.referralLink,
  userTxData: s => s.userTxData,
  isTermsAcceped: s => s.isTermsAcceped
};

export const mutations = {
  setUser: (state, user) => (state.user = user),
  deleteUser: state => (state.user = null),
  setTransactions: (state, payload) => {
    payload.transactions.forEach(el => {
      switch (el.event.toLowerCase()) {
        case "ontokenpurchase":
          el.event = "Deposit";
          break;
        case "onreinvestment":
          el.event = "Reinvest";
          break;
        case "onwithdraw":
          el.event = "Dividend Withdraw";
          break;
        case "oninterestpassed":
          el.event = "Dividend Accrual";
          break;
        case "ongotrepay":
          el.event = "Deposit Withdraw";
          break;
        case "onrepaypassed":
          el.event = "Deposit Accrual";
          break;
      }
    });
    state.transactions = payload;
  },
  setFindedAddress: (state, payload) => (state.findedAddress = payload),
  setUsers: (state, payload) => (state.users = payload),
  setPartners: (state, payload) => (state.partners = payload),
  setReferralLink: (state, payload) => (state.referralLink = payload),
  setIsTermsAcceped: (state, payload) => (state.isTermsAcceped = payload)
};

export const actions = {
  async changeProfile({}, data) {
    return await this.$axios
      .put("/account/user/", data)
      .then(_ => {
        return true;
      })
      .catch(err => {
        return false;
      });
  },
  async changeEthereumAddress({}, address) {
    return await this.$axios
      .put("/account/user/", {
        ethereum_wallet: address
      })
      .then(_ => {
        Toast.open({ message: "Wallet changed!", type: "is-success" });
      })
      .catch(err => {
        Toast.open({
          message: err.response.data[0].message,
          type: "is-danger",
          duration: 6000
        });
      });
  },
  async changePassword({}, data) {
    return await this.$axios
      .post("/account/change_password/", data)
      .then(_ => {
        return true;
      })
      .catch(err => {
        return false;
      });
  },
  async signUp({ commit }, data) {
    if (!data) return false;
    return await this.$axios
      .post("/account/signup/", data)
      .then(resp => {
        this.$axios.setToken(resp.data.token, "Bearer");
        this.$cookies.set("token", resp.data.token, {
          path: "/",
          maxAge: 60 * 60 * 24 * 7
        });
        commit("setUser", resp.data.user);
        return null;
      })
      .catch(resp => {
        return _.isArray(resp.response.data)
          ? resp.response.data
          : Array.from(resp.response.data);
      });
  },

  async startRecover({}, data) {
    return await this.$axios
      .post("/account/recover/", data)
      .then(_ => {
        return true;
      })
      .catch(err => {
        return false;
      });
  },
  async finishRecover({}, data) {
    return await this.$axios
      .put("/account/recover/", data)
      .then(_ => {
        return true;
      })
      .catch(err => {
        return false;
      });
  },
  async activateAccount({}, data) {
    if (!data) return false;

    return await this.$axios
      .post("/account/verify/", data)
      .then(resp => {
        return resp.data;
      })
      .catch(_ => {
        return false;
      });
  },
  async searchAddress({ commit }, address) {
    const { data } = await this.$axios.get("/transactions/all/");

    const finded = data.find(el => el.args.customerAddress === address);
    if (finded) {
      commit("setFindedAddress", true);
    } else {
      commit("setFindedAddress", false);
    }
  },
  async fetchUsers({ commit }) {
    const { data } = await this.$axios.get("/admin/users/");
    commit("setUsers", data);
  },
  async fetchPartners({ commit }) {
    const { data } = await this.$axios.get("/account/partners/");
    commit("setPartners", data);
  },
  async fetchReferralLink({ commit }) {
    const { data } = await this.$axios.get("/account/referral_link/");
    commit("setReferralLink", data);
  },
  async fetchTransactions({ commit }, type) {
    const { data } = await this.$axios.get(`/transactions/?q=${type}`);
    commit("setTransactions", data);
  },
  async updateUser({}, user) {
    return await this.$axios
      .put(`/admin/users/${user._id}/`, {
        ...user
      })
      .then(res => {
        return res;
      })
      .catch(err => {
        return err;
      });
  },
  async passTermsAgreement({ commit }) {
    return await this.$axios
      .post("/account/terms_agreement/", {
        agree: true
      })
      .then(() => {
        commit("setIsTermsAcceped", true);
        return true;
      })
      .catch(() => {
        commit("setIsTermsAcceped", false);
        return false;
      });
  },
  async fetchUser({}, id) {
    return await this.$axios.get(`/admin/users/${id}/`);
  }
};
