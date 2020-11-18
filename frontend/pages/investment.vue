<template>
  <div>
    <custom-slider :activeDot="2" :dots="4" next-page="/dividends" prev-page="/profile">
      <template slot="content">
        <div class="columns">
          <div class="column is-half">
            <div>
              <div class="is-size-5 mb-5">
                Откройте вклад<br />
                и начните зарабатывать<br />
                до 101% годовых в USDT
              </div>
              <div class="mb-5 calc">
                <div class="is-size-7 mb-2">Укажите сумму вклада в долларе США</div>
                <base-input v-model="input" type="number" size="4" :max="999999" :maxLength="8" onlyNumber />
              </div>
              <div class="mb-5">
                <div class="is-size-7">ваш доход составит:</div>
                <div class="is-size-2">$ {{Math.round(profit)}}</div>
              </div>
              <div class="mb-5">
                <div class="is-size-7">с учетом реинвестирования:</div>
                <div class="is-size-1">$ {{Math.round(reinvest)}}</div>
              </div>
              <div>
                <div class="is-size-7 mb-1">
                  Вклад будет доступен к выводу<br />
                  после 20 ноября, 2021
                </div>
              </div>
            </div>
          </div>
          <div class="column is-half is-flex is-flex-direction-column is-justify-content-flex-end">
            <custom-button>Открыть вклад</custom-button>
          </div>
        </div>
      </template>
    </custom-slider>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import formatDate from '~/mixins/formatDate'
import AddFundsModal from '../components/modals/AddFundsModal'
import formatCurrency from '~/mixins/formatCurrency'
import gsap from 'gsap'

export default {
  name: 'investment',
  layout: 'profile',
  middleware: ['authRequired', 'contracts', 'metamask'],
  mixins: [formatDate, formatCurrency],
  components: {
    AddFundsModal
  },

  async created() {
    if (!this.$store.state.metamask.gasPrice) {
      await this.$store.dispatch('metamask/getGasPrice')
    }
    if (this.$store.state.deposit.repayBalance === null) {
      console.log('Get repay balance')
      await this.$store.dispatch('deposit/getRepayBalance')
    }
  },
  methods: {
    promptNumber() {
      this.$buefy.modal.open({
        parent: this,
        component: AddFundsModal,
        hasModalCard: true,
        customClass: 'custom-class custom-class-2',
        trapFocus: true,
        confirmText: 'Ok'
      })
    },
    getProductClass(product) {
      if (this.product === product) {
        return 'product-link-active'
      }
    },
    setProduct(product) {
      this.currentProduct = product
    },
    approve() {
      this.$store.dispatch('transactions/getApprove')
    },
    getRepay() {
      this.$store.dispatch('deposit/getRepay')
    },
    animateNumbers(newVal) {
      gsap.to(this.$data, 0.5, {
        profit: newVal * 2,
        reinvest: newVal * 3,
      })
    }
  },
  watch: {
    input: {
      handler(newVal) {
        this.animateNumbers(newVal)
      },
      immediate: true
    }
  },
  computed: {
    ...mapGetters(['user']),
    gasPrice() {
      return this.$store.getters['metamask/gasPrice']
    },
    tableData() {
      return this.$store.getters.transactions.transactions !== null
        ? this.$store.getters.transactions.transactions
        : []
    },
    getStatusClass() {
      if (this.status === 'online') {
        return 'status-online'
      }
      return 'status-offline'
    },
    repayBalance() {
      return this.$store.getters['deposit/repayBalance']
    },
    allowance() {
      return this.$store.getters['deposit/allowance']
    },
    totalDeposit() {
      return this.$store.getters['deposit/totalDeposit']
    },
    status() {
      return this.$store.getters['metamask/status']
    },
    filteredData() {
      return this.$store.getters.investmentsWithFilter(this.currentProduct)
    },
    txTotals() {
      return this.$store.getters.txTotals
    },
    filteredTotals() {
      let result = 0
      let minus = 0
      this.filteredData.forEach(el => {
        switch (el.event) {
          case 'Dividend Withdraw':
            result -= el.args.USDT
            minus += el.args.USDT
            break
          case 'Deposit Withdraw':
            result -= el.args.USDT
            minus += el.args.USDT
            break
        }
        result += el.args.USDT
      })
      return result - minus
    }
  },
  data: () => ({
    profit: '',
    reinvest: '',
    input: '2500',
    isEmpty: false,
    currentProduct: 'All',
    products: ['All', 'NTS80', 'NTS81', 'NTS165']
  }),
  async asyncData({ store }) {
    return await store.dispatch('fetchTransactions', 'investments')
  }
}
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
