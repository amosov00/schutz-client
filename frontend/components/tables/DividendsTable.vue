<template>
  <div class="container">
    <div class="level">
      <div
        class="level-left is-size-5 has-text-primary mb-4"
      >
        История транзакций
      </div>
    </div>
    <b-table
      :data="filteredData"
      default-sort="args.timestamp"
      pagination-position="bottom"
      class="custom-table mb-6"
    >
      <template slot-scope="props">
        <b-table-column
          field="args.timestamp"
          label="Дата и время"
          sortable="sortable"
          width="20%"
        >
          {{ timestampToDateTime(props.row.args.timestamp) }}
        </b-table-column>
        <b-table-column
          field="event"
          label="Событие"
          width="20%"
        >
          {{ props.row.event }} <span
          class="tag is-link"
          v-if="props.row.isReinvested"
        > Reinvested </span>
        </b-table-column>
        <b-table-column
          class="has-text-primary overflow-reset"
          field="txHash"
          label="Хэш"
          width="20%"
        >
          <b-tooltip
            class="w-100"
            :label="props.row.transactionHash"
            type="is-black"
            position="is-bottom"
          >
            <a
              :href="'https://etherscan.io/tx/' + props.row.transactionHash"
              target="_blank"
            > {{ hashSlice(props.row.transactionHash) }} </a>
          </b-tooltip>
        </b-table-column>
        <b-table-column
          field="contract"
          label="Контракт"
          width="20%"
          header-class="right-align"
          cell-class="text-right"
        >
          {{ props.row.contract }}
        </b-table-column>
        <b-table-column
          field="amountUSDT"
          label="Сумма, USDT"
          width="10%"
          header-class="right-align"
          cell-class="text-right"
          align="right"
        >
          {{ formatCurrency(props.row.args.USDT, 'usdt') }}
        </b-table-column>
      </template>
    </b-table>
    <div class="is-size-5 has-background-primary total-withdraw mb-6">
      Всего выведено: {{`${formatCurrency(withdrawTotal, 'usdt')}`}} USDT
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import formatDate from '~/mixins/formatDate'
import formatCurrency from '~/mixins/formatCurrency'
import formatText from '~/mixins/formatText'

export default {
  name: 'DividendsTable',
  mixins: [formatDate, formatCurrency, formatText],
  computed: {
    ...mapGetters(['user']),
    tableData() {
      return this.$store.getters.transactions
    },
    filteredData() {
      return this.$store.getters.dividendsWithFilter(this.currentProduct)
    },
    withdrawTotal() {
      let result = 0
      this.filteredData.forEach(el => {
        switch (el.event) {
          case 'Dividend Withdraw':
            result += el.args.USDT
            break
        }
      })
      return result
    },
    accrualTotal() {
      let result = 0
      this.filteredData.forEach(el => {
        switch (el.event) {
          case 'Dividend Accrual':
            result += el.args.USDT
            break
        }
      })
      return result
    },
    getStatusClass() {
      if (this.status === 'online') {
        return 'status-online'
      }
      return 'status-offline'
    },
    txTotals() {
      return this.$store.getters.txTotals
    }
  },
  data: () => ({
    isEmpty: false,
    currentProduct: 'All',
    products: ['All', 'NTSCD', 'NTS80', 'NTS81', 'NTS165']
  })
}
</script>

<style lang="scss">
.total-withdraw {
  padding: 10px 20px;
  border-radius: 12px;
  color: black;
}
</style>
