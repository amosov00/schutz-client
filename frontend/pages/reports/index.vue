<template lang="pug">
  div
    h1.title.is-2 {{$t('reports')}}
    div.box
      b-field(:label="$t('searchQuery')")
        b-input(:placeholder="$t('typeAddressOrTxHash')" type="text" v-model="queryParams.query")
      div.columns
        div.column
          b-field(:label="$t('from')")
            b-datepicker(:placeholder="$t('typeFromDate')"
              icon="calendar-today"
              editable v-model="queryParams.fromDate")
        div.column
          b-field(:label="$t('to')")
            b-datepicker(:placeholder="$t('typeToDate')"
              icon="calendar-today"
              editable v-model="queryParams.toDate")
        div.column
          b-field(:label="$t('from') + ' USDT'")
            b-input(v-model="queryParams.fromUSDT")
        div.column
          b-field(:label="$t('to') + ' USDT'")
            b-input(v-model="queryParams.toUSDT")
      div.columns
        div.column
          b-field(:label="$t('contract')")
            b-select(placeholder="Select a contract" v-model="queryParams.contract" expanded)
              option(v-for="(contract, i) in contractOptions" :value="contract.value" :key="i") {{contract.label}}
        div.column
          b-field(:label="$t('type')")
            b-select(placeholder="Select a type" v-model="queryParams.transaction" expanded)
              option(v-for="(transaction, i) in transactionOptions" :value="transaction.value" :key="i") {{transaction.label}}
      b-button(type="is-info" @click="search" :loading="loading") {{$t('search')}}
    div.box
      ReportsTable(:colsType="colsType" :queryParams="queryParams" :contractName="contractName" :key="componentKey" :loading="loading")
      ActiveDepositsTable(v-if="colsType === 'deposits'" :loading="loading")
</template>

<script>
import ReportsTable from "~/components/tables/ReportsTable";
import ActiveDepositsTable from "~/components/tables/ActiveDepositsTable";

export default {
  name: "reports",
  layout: "admin",
  middleware: ["managerRequired", "contracts"],
  components: {ReportsTable, ActiveDepositsTable},
  data() {
    return {
      componentKey: 0,
      colsType: "all",
      contractName: "",
      queryParams: {
        query: "",
        contract: "all",
        transaction: "all",
        fromDate: null,
        toDate: null,
        fromUSDT: null,
        toUSDT: null,
      },
      loading: false,
      contractOptions: [
        {
          label: "NTSCD",
          value: "NTSCD"
        },
        {
          label: "NTS80",
          value: "NTS80"
        },
        {
          label: "NTS165",
          value: "NTS165"
        },
        {
          label: "NTS81",
          value: "NTS81"
        },
        {
          label: "All",
          value: "all"
        }
      ],
      transactionOptions: [
        {
          label: "Investments",
          value: "investments"
        },
        {
          label: "Dividend Withdraw",
          value: "dividend_withdraw"
        },
        {
          label: "Dividend Accural",
          value: "dividend_accural"
        },
        {
          label: "Deposit Withdraw",
          value: "deposit_withdraw"
        },
        {
          label: "Deposit Accural",
          value: "deposit_accural"
        },
        {
          label: "Active Deposits",
          value: "deposits"
        },
        {
          label: "All",
          value: "all"
        }
      ]
    };
  },
  methods: {
    async search() {
      this.componentKey += 1;
      this.loading = true;
      this.colsType = this.queryParams.transaction;
      this.contractName = this.queryParams.contract;
      await this.$store
        .dispatch("reports/fetchTransactionsByQueryV1", this.queryParams)
        .finally(() => (this.loading = false));
    }
  },
  async asyncData({store}) {
    return await store.dispatch("reports/fetchTransactionsByQuery", {
      query: "",
      contract: "",
      transaction: "all",
      fromDate: null,
      toDate: null
    });
  }
};
</script>
