<template lang="pug">
  div
    h1.title.is-2 {{ $t('dividends') }}
    div.level.has-text-grey {{ $t('dividendsDesc') }}
    DividendProducts
    DividendsTable
</template>

<script>
import DividendProducts from "~/components/DividendProducts";
import DividendsTable from "~/components/tables/DividendsTable";

export default {
  layout: "profile",
  name: "dividents",
  middleware: ["authRequired", "contracts"],
  components: {DividendProducts, DividendsTable},
  async asyncData({store}) {
    return await store.dispatch("fetchTransactions", "dividends");
  },
  computed: {},
  async created() {
    if (!this.$store.state.metamask.gasPrice) {
      await this.$store.dispatch("metamask/getGasPrice");
    }
  },
  data: () => ({
    isEmpty: false
  })
};
</script>

<style lang="sass" scoped></style>
