<template lang="pug">
  div
    h1.title.is-2 {{$t('allTransactions')}}
    div.box
      b-field(label="Search Address")
        b-input(placeholder="Type address here..." v-model="addressQuery")
      b-button.mb-12(type="is-link" :loading="loading" @click="searchAddress") {{$t('search')}}
      b-message(title="Success" aria-close-label="Close message" v-if="findedAddress === true" type="is-success") {{$t('addressFound')}}
      b-message(title="Fail" aria-close-label="Close message" v-else-if="findedAddress === false" type="is-danger") {{$t('addressNotFound')}}
    div.box
      div.level
        div.level-left History of transactions
        div.level-right
          .columns
            .column(v-for="(product, i) in products" :key="i")
              span.product-link(@click="() => currentProduct = product" :class="{ 'product-link-active':  currentProduct === product }") {{ product }}
      b-table(:data="tableData" v-if="tableData" hoverable striped :paginated='true' pagination-simple
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
          b-table-column(field="contract" label="Contract"  width="20") {{ props.row.contract }}
          b-table-column(field="amountETH" label="Amount, ETH"  width="50" sortable v-if="props.row.args.ETH").text-right {{ formatCurrency(props.row.args.ETH, 'eth')}}
          b-table-column(field="amountETH" label="Amount, ETH"  width="50" sortable v-else-if="props.row.args.incomingValue").text-right {{ formatCurrency(props.row.args.incomingValue, 'eth')}}
          b-table-column(field="amountETH" label="Amount, ETH"  width="50" sortable v-else-if="props.row.args.incomingEthereum").text-right {{ formatCurrency(props.row.args.incomingEthereum, 'eth')}}
          b-table-column(field="rate" label="Rate"  width="50").text-right {{ formatCurrency(props.row.args.RATE, 'rate') }}
          b-table-column(field="amountUSDT" label="Amount, USDT"  width="50").text-right {{ formatCurrency(props.row.args.USDT, 'usdt') }}
</template>

<script>
import { mapGetters } from "vuex";
import formatDate from "~/mixins/formatDate";
import formatCurrency from "~/mixins/formatCurrency";
export default {
  name: "transactions-all",
  layout: "profile",
  middleware: ["authRequired", "adminRequired"],
  mixins: [formatDate, formatCurrency],
  methods: {
    async searchAddress() {
      this.loading = true;
      await this.$store
        .dispatch("searchAddress", this.addressQuery)
        .finally(() => (this.loading = false));
    }
  },

  computed: {
    ...mapGetters(["user", "findedAddress"]),
    tableData() {
      return this.$store.getters.transactions !== null
        ? this.$store.getters.transactions
        : [];
    },
    getStatusClass() {
      if (this.status === "online") {
        return "status-online";
      }
      return "status-offline";
    }
  },

  data: () => ({
    isEmpty: false,
    isDepositOpen: true,
    status: "online",
    currentProduct: "All",
    products: ["All", "NTSCD", "NTS80", "NTS81", "NTS165"],
    addressQuery: "",
    loading: false
  }),

  async asyncData({ store }) {
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
.mb-12
  margin-bottom: 12px
</style>
