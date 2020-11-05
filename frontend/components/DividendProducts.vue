<template lang="pug">
  div.box
    div.columns
      div.column.is-2.has-text-weight-medium {{ $t('avaible') }}, USDT
    div.columns.product.is-vcentered(v-for="p in productList" :key="p.name")
      div.column.is-2 {{ formatCurrency(totalDividends) }}
    div.column.is-12.p-0
      div.columns
        .column.is-4
          button.button.is-info.is-outlined.is-fullwidth( @click="reinvest") {{ $t('reinvest') }}
        .column.is-4
          button.button.is-primary.is-outlined.is-fullwidth( @click="withdraw")  {{ $t('widthdraw') }}
        .column.is-4(@click="invest")
          button.button.is-info.is-outlined.is-fullwidth {{ $t('invest') }}
    strong(class="is-block").mt-3 #[span Gas price (fast):] #[span(class="has-text-info") {{ gasPrice }}]
</template>

<script>
import AddFundsModal from './modals/AddFundsModal'
import formatCurrency from '~/mixins/formatCurrency'
export default {
  name: "DividendProducts",
  mixins: [formatCurrency],

  async created() {
    if (!this.$store.state.metamask.gasPrice) {
      await this.$store.dispatch("metamask/getGasPrice");
    }
  },

  methods: {
    withdraw() {
      this.$store.dispatch("dividends/withdraw");
    },
    reinvest() {
      this.$store.dispatch("dividends/reinvest");
    },
    invest() {
      this.$buefy.modal.open({
        parent: this,
        component: AddFundsModal,
        hasModalCard: true,
        customClass: "custom-class custom-class-2",
        trapFocus: true,
        confirmText: "Ok"
      });
    }
  },
  data: () => ({
    productList: [
      { name: "NTSCD", amount: 2013.35, available: 200.35 }
    ]
  }),
  computed: {
    gasPrice() {
      return this.$store.getters['metamask/gasPrice']
    },
    totalDeposit() {
      return this.$store.getters["deposit/totalDeposit"];
    },
    totalDividends() {
      return this.$store.getters["deposit/totalDividends"];
    }
  }
};
</script>

<style lang="sass" scoped>
.product
  border-bottom: 1px solid rgba(0, 0, 0, 0.2)
  &:last-child
    border-bottom: 0
</style>
