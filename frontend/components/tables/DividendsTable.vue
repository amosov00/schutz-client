<template lang="pug">
  div.box
      div.level
        div.level-left {{$t('accuralHistory')}}
        div.level-right
          .columns
            .column(v-for="(product, i) in products" :key="i")
              span.product-link(@click="() => currentProduct = product" :class="{ 'product-link-active':  currentProduct === product }") {{ product }}
      b-table(:data="filteredData" hoverable striped :paginated='true' pagination-simple
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
          b-table-column(field="amountETH" label="Amount, ETH"  width="50" sortable v-if="props.row.args.ETH" header-class="right-align").text-right {{ formatCurrency(props.row.args.ETH, 'eth')}}
          b-table-column(field="amountETH" label="Amount, ETH"  width="50" sortable v-else-if="props.row.args.incomingValue").text-right {{ formatCurrency(props.row.args.incomingValue, 'eth')}}
          b-table-column(field="amountETH" label="Amount, ETH"  width="50" sortable v-else-if="props.row.args.incomingEthereum").text-right {{ formatCurrency(props.row.args.incomingEthereum, 'eth')}}
          b-table-column(field="rate" label="Rate"  width="50" header-class="right-align" cell-class="text-right") {{ formatCurrency(props.row.args.RATE, 'rate') }}
          b-table-column(field="amountUSDT" label="Amount, USDT"  width="50" header-class="right-align" cell-class="text-right") {{ formatCurrency(props.row.args.USDT, 'usdt') }}
        template(slot="footer")
          .divider
        template(slot="bottom-left")
          div
            p.title.is-size-4 Total withdraw USDT: {{`${formatCurrency(withdrawTotal, 'usdt')}`}}
            p.title.is-size-4 Total accrual USDT: {{`${formatCurrency(accrualTotal, 'usdt')}`}}
</template>

<script>
import { mapGetters } from "vuex";
import formatDate from "~/mixins/formatDate";
import formatCurrency from "~/mixins/formatCurrency";

export default {
  name: "DividendsTable",
  mixins: [formatDate, formatCurrency],
  computed: {
    ...mapGetters(["user"]),
    tableData() {
      return this.$store.getters.transactions;
    },
    filteredData() {
      return this.$store.getters.dividendsWithFilter(this.currentProduct);
    },
    withdrawTotal() {
      let result = 0;
      this.filteredData.forEach(el => {
        switch (el.event) {
          case 'Dividend Withdraw':
            result += el.args.USDT
            break;
        }
      })
      return result
    },
    accrualTotal() {
      let result = 0;
      this.filteredData.forEach(el => {
        switch (el.event) {
          case 'Dividend Accrual':
            result += el.args.USDT
            break;
        }
      })
      return result
    },
    getStatusClass() {
      if (this.status === "online") {
        return "status-online";
      }
      return "status-offline";
    },
    txTotals() {
      return this.$store.getters.txTotals;
    }
  },
  data: () => ({
    isEmpty: false,
    currentProduct: "All",
    products: ["All", "NTSCD", "NTS80", "NTS81", "NTS165"]
  })
};
</script>

<style lang="scss">
.right-align {
  padding-right: 0 !important;
  & > * {
    text-align: right;
  }
}
</style>
