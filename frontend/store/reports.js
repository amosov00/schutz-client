import moment from "moment";
import {formatCurrencyReversed} from "@/mixins/formatCurrency";

export const state = () => ({
  reportData: [],
  activeDeposits: [],
  activeDepositsByID: [],
  activeDepositTransactions: []
});
export const mutations = {
  setReportData: (state, payload) => {
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
    state.reportData = payload;
  },
  setActiveDeposits: (state, payload) => {
    state.activeDeposits = payload;
  },
  setActiveDepositsByID: (state, payload) => {
    state.activeDepositsByID = payload;
  },
  setActiveDepositsByIDContracts: (state, payload) => {
    state.activeDepositsByID.contracts = payload;
  },
  setActiveDepositTransactions: (state, payload) => {
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
    state.activeDepositTransactions = payload;
  }
};
export const actions = {
  async fetchTransactionsByQuery({commit}, queryParams) {
    const fromDate = queryParams.fromDate
      ? moment
        .utc(queryParams.fromDate)
        .add(1, "days")
        .startOf("day")
        .subtract(3, "hours")
        .unix()
      : 0;
    const toDate = queryParams.toDate
      ? moment
        .utc(queryParams.toDate)
        .endOf("day")
        .add(1, "days")
        .subtract(3, "hours")
        .unix()
      : 0;
    const fromUSDT = queryParams.fromUSDT ? formatCurrencyReversed(queryParams.fromUSDT, "usdt") : null;
    const toUSDT = queryParams.toUSDT ? formatCurrencyReversed(queryParams.toUSDT, "usdt") : null;
    const contract = queryParams.contract === "all" ? "" : queryParams.contract;

    if (queryParams.transaction === "deposits") {
      return this.$axios
        .get("/admin/active-deposits/", {
          params: {
            q: queryParams.query,
            usdt_from: fromUSDT,
            usdt_to: toUSDT,
          }
        })
        .then(res => {
          commit("setActiveDeposits", res.data);
          return true;
        })
        .catch(err => {
          return false;
        });
    } else {
      return this.$axios
        .get("/admin/transactions/", {
            params: {
              q: queryParams.query,
              contract: contract,
              transaction_type: queryParams.transaction,
              timestamp_from: fromDate,
              timestamp_to: toDate,
              usdt_from: fromUSDT,
              usdt_to: toUSDT,
            }
          }
        )
        .then(res => {
          commit("setReportData", res.data);
          return true;
        })
        .catch(err => {
          return false;
        });
    }
  },
  async fetchActiveDepositByID({commit}, id) {
    await this.$axios.get(`/admin/active-deposits/${id}/`).then(resp => {
      commit("setActiveDepositsByID", resp.data);
    });
  },
  async fetchActiveDepositTransactions({commit}, params) {
    const {data} = await this.$axios.get(
      `/admin/active-deposits/${params.id}/${params.contract}/`
    );
    commit("setActiveDepositTransactions", data);
  },
  async updateCloseDate({commit}, activeDeposit) {
    await this.$axios.put(`/admin/active-deposits/${activeDeposit._id}/`, {
      deposits: activeDeposit.contracts,
    }).then(() => {
    }).catch(err => {
      console.error(err)
    })
    commit("setActiveDepositsByIDContracts", activeDeposit.contracts)
  }
};
export const getters = {
  transactions: s => s.reportData.transactions,
  totals: s => s.reportData.totals,
  activeDeposits: s => s.activeDeposits,
  activeDepositsByID: s => s.activeDepositsByID,
  activeDepositTransactions: s => s.activeDepositTransactions
};
