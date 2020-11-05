<template lang="pug">
  div
    h1.title.is-2 {{ $t('investments') }}
    div.box
      .columns.is-vcentered.is-multiline
        .column.is-4
          div.is-size-5 {{ $t('totalDeposit') }}:
          div.is-size-5.has-text-weight-medium {{formatCurrency(totalDeposit)}} USDT
          div.is-size-7.has-text-grey-light {{$t('withdrawalAvaible')}} April 20, 2021
        .column(style="display: flex; align-items: center")
          button(@click="promptNumber" v-if="user.is_deposit_open && allowance !== 0").button.is-info.is-size-6 {{$t('addFunds')}}
          button(@click="approve" v-else).button.is-info.is-size-6 {{$t('approve')}}
          strong.ml-3 #[span Gas price (fast):] #[span(class="has-text-info") {{ gasPrice }}]
        .column(v-if="repayBalance > 0")
          button(@click="getRepay").button.is-primary.is-size-6 {{$t('widthdraw')}} {{formatRepayBalnce(repayBalance)}} USDT
      .column.is-12-tablet.is-7-widescreen.p-0
        div Ethereum {{$t('address')}}:
        div.columns
          div.column.is-9-desktop.is-10-fullhd.has-text-weight-bold.wb-all {{ user.ethereum_wallet }}
          div.column.is-3-desktop.is-2-fullhd.status(:class="getStatusClass") {{ status }}
    div.box
      div.level
        div.level-left {{$t('historyOfTansactions')}}
        div.level-right
          .columns
            .column(v-for="(product, i) in products" :key="i")
              span.product-link(@click="setProduct(product)" :class="{ 'product-link-active':  currentProduct === product }") {{ product }}
      b-table(:data="filteredData" v-if="filteredData" hoverable striped :paginated='true' pagination-simple
      default-sort="args.timestamp" pagination-position="bottom")
        template(slot-scope="props")
          b-table-column(field="args.timestamp" label="Date" sortable width="50") {{ timestampToDate(props.row.args.timestamp) }}
          b-table-column(field="event" label="Event"  width="50") {{ props.row.event }}
            span(class="tag is-link" v-if="props.row.isReinvested") Reinvested
          b-table-column(field="address" label="Address" width="150").has-text-primary.overflow-reset
            b-tooltip(:label="props.row.args.customerAddress" type="is-black" position="is-bottom").w-100
              a(:href="'https://etherscan.io/address/' + props.row.args.customerAddress" target="_blank").text-clamp {{ props.row.args.customerAddress }}
          b-table-column(field="txHash" label="txHash" width="150").has-text-primary.overflow-reset
            b-tooltip(:label="props.row.transactionHash" type="is-black" position="is-bottom").w-100
              a(:href="'https://etherscan.io/tx/' + props.row.transactionHash" target="_blank").text-clamp {{ props.row.transactionHash }}
          b-table-column(field="contract" label="Contract"  width="20" header-class="right-align" cell-class="text-right") {{ props.row.contract }}
          b-table-column(field="amountETH" label="Amount, ETH"  width="50" sortable v-if="props.row.args.ETH" header-class="right-align" cell-class="text-right") {{ formatCurrency(props.row.args.ETH, 'eth')}}
          b-table-column(field="rate" label="Rate"  width="20" header-class="right-align" cell-class="text-right") {{ formatCurrency(props.row.args.RATE, 'rate') }}
          b-table-column(field="amountUSDT" label="Amount, USDT"  width="50" header-class="right-align" cell-class="text-right") {{ formatCurrency(props.row.args.USDT, 'usdt') }}
        template(slot="footer")
          .divider
        template(slot="bottom-left")
          div
            p.title.is-size-4 Total USDT: {{`${formatCurrency(filteredTotals, 'usdt')}`}}
</template>

<script>
import {mapGetters} from "vuex";
import formatDate from "~/mixins/formatDate";
import AddFundsModal from "../components/modals/AddFundsModal";
import formatCurrency from "~/mixins/formatCurrency";

export default {
  name: "investment",
  layout: "profile",
  middleware: ["authRequired", "contracts", "metamask"],
  mixins: [formatDate, formatCurrency],
  components: {
    AddFundsModal
  },

  async created() {
    if (!this.$store.state.metamask.gasPrice) {
      await this.$store.dispatch("metamask/getGasPrice");
    }
    if (this.$store.state.deposit.repayBalance === null) {
      console.log("Get repay balance")
      await this.$store.dispatch("deposit/getRepayBalance");
    }
  },
  methods: {
    promptNumber() {
      this.$buefy.modal.open({
        parent: this,
        component: AddFundsModal,
        hasModalCard: true,
        customClass: "custom-class custom-class-2",
        trapFocus: true,
        confirmText: "Ok"
      });
    },
    getProductClass(product) {
      if (this.product === product) {
        return "product-link-active";
      }
    },
    setProduct(product) {
      this.currentProduct = product;
    },
    approve() {
      this.$store.dispatch("transactions/getApprove");
    },
    getRepay() {
      this.$store.dispatch("deposit/getRepay");
    }
  },
  computed: {
    ...mapGetters(["user"]),
    gasPrice() {
      return this.$store.getters['metamask/gasPrice']
    },
    tableData() {
      return this.$store.getters.transactions.transactions !== null
        ? this.$store.getters.transactions.transactions
        : [];
    },
    getStatusClass() {
      if (this.status === "online") {
        return "status-online";
      }
      return "status-offline";
    },
    repayBalance() {
      return this.$store.getters["deposit/repayBalance"];
    },
    allowance() {
      return this.$store.getters["deposit/allowance"];
    },
    totalDeposit() {
      return this.$store.getters["deposit/totalDeposit"];
    },
    status() {
      return this.$store.getters["metamask/status"];
    },
    filteredData() {
      return this.$store.getters.investmentsWithFilter(this.currentProduct);
    },
    txTotals() {
      return this.$store.getters.txTotals;
    },
    filteredTotals() {
      let result = 0;
      let minus = 0;
      this.filteredData.forEach(el => {
        switch (el.event) {
          case "Dividend Withdraw":
            result -= el.args.USDT;
            minus += el.args.USDT;
            break;
          case "Deposit Withdraw":
            result -= el.args.USDT;
            minus += el.args.USDT;
            break;
        }
        result += el.args.USDT;
      });
      return result - minus;
    }
  },
  data: () => ({
    isEmpty: false,
    currentProduct: "All",
    products: ["All", "NTS80", "NTS81", "NTS165"]
  }),
  async asyncData({store}) {
    return await store.dispatch("fetchTransactions", "investments");
  }
};
</script>

<style lang="sass" scoped>
.status
  display: flex
  align-items: center
  text-transform: capitalize
  font-weight: 500
  font-size: 16px

  &:before
    content: ""
    position: relative
    width: 6px
    height: 6px
    border-radius: 100px
    background-color: #919191
    display: inline-block
    margin-right: 6px

  &-offline
    color: #F62F2F

    &:before
      background-color: #F62F2F

  &-online
    color: #45981E

    &:before
      background-color: #45981E
</style>
