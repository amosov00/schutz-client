<template>
  <div>
    <dividend-products />
    <dividends-table />
  </div>
</template>

<script>
import DividendProducts from '~/components/DividendProducts'
import DividendsTable from '~/components/tables/DividendsTable'

export default {
  layout: 'profile',
  name: 'dividents',
  middleware: ['authRequired', 'contracts'],
  components: { DividendProducts, DividendsTable },
  async asyncData({ store }) {
    return await store.dispatch('fetchTransactions', 'dividends')
  },
  computed: {},
  async created() {
    if (!this.$store.state.metamask.gasPrice) {
      await this.$store.dispatch('metamask/getGasPrice')
    }
  },
  data: () => ({
    isEmpty: false
  })
}
</script>

<style
  lang="sass"
  scoped
></style>
