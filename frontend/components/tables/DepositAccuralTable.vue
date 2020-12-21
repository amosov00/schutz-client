<template>
  <div>
    <b-modal
      :active.sync="isComponentModalActive"
      has-modal-card
    >
      <update-amount-modal
        :agreement="activeAgreement"
        @updateAmount="updateAgreement"
      />
    </b-modal>
    <b-modal
      :active.sync="isUpdateStatusModalActive"
      has-modal-card
    >
      <update-status-modal
        :agreement="activeAgreement"
        @updateStatus="updateAgreement"
      />
    </b-modal>
    <b-table
      :data="tableData"
      striped="striped"
      :loading="loading"
      pagination-simple="pagination-simple"
      default-sort="args.timestamp"
      pagination-position="bottom"
    >

      <template slot-scope="props">
        <b-table-column
          field="user_id"
          width="100"
          label="Id"
        >
          <b-tooltip
            class="w-100"
            :label="props.row.user_id"
            type="is-black"
            position="is-bottom"
          >
            <a
              class="text-clamp"
              :href="'/users/' + props.row.user_id"
            > {{ props.row.user_id }} </a>
          </b-tooltip>
        </b-table-column>
        <b-table-column
          class="has-text-primary overflow-reset"
          field="ethereum_wallet"
          label="Address"
          width="150"
        >
          <b-tooltip
            class="w-100"
            :label="props.row.ethereum_wallet"
            type="is-black"
            position="is-bottom"
          >
            <a
              class="text-clamp"
              :href="'https://etherscan.io/address/' + props.row.ethereum_wallet"
              target="_blank"
            > {{ props.row.ethereum_wallet }} </a>
          </b-tooltip>
        </b-table-column>
        <b-table-column
          field="email"
          label="Email"
          width="200"
        >
          {{ props.row.email }}
        </b-table-column>
        <b-table-column
          field="contract"
          label="Contract"
        >
          {{ props.row.contract }}
        </b-table-column>
        <b-table-column
          field="amount"
          label="Amount"
        >
          <a
            class="text-clamp has-text-link"
            @click="updateAmountModalActivate(props.row)"
          > {{ formatCurrency(props.row.amount, 'usdt') }} </a>
        </b-table-column>
        <b-table-column
          field="close_date"
          label="Close date"
        >
          {{formatDate(props.row.close_date)}}
        </b-table-column>
        <b-table-column
          field="created_at"
          label="mailing"
        >
          {{formatDate(props.row.created_at)}}
        </b-table-column>
        <b-table-column
          field="result"
          label="Answers"
        >
          {{ getResult(props.row.result) }}
        </b-table-column>
        <b-table-column
          field="delete"
          label=""
          width="100"
          class="has-text-right"
        >
          <b-button
            type="is-info is-small"
            :disabled="props.row.isPaid !== true && props.row.result !== 2"
            @click="accrualDeposit(props.row)"
          >
            {{$t('pay')}}
          </b-button>
        </b-table-column>
        <b-table-column
          width="70"
          class="has-text-right"
        >
          <b-button
            type="is-info is-small"
            @click="updateStatusModalActive(props.row)"
          >
            Статус
          </b-button>
        </b-table-column>
      </template>

      <!--<template-->
      <!--slot="footer">-->
      <!--<div class="divider"></div>-->
      <!--</template>-->

    </b-table>
  </div>
</template>

<script>
import formatDate from '~/mixins/formatDate'
import formatCurrency from '~/mixins/formatCurrency'
import UpdateAmountModal from '../modals/UpdateAmountModal'
import UpdateStatusModal from '../modals/UpdateStatusModal'

export default {
  name: 'DepositAccuralTable',
  components: { UpdateStatusModal, UpdateAmountModal },
  props: {
    tableData: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      default: () => false
    }
  },
  data: () => ({
    isComponentModalActive: false,
    isUpdateStatusModalActive: false,
    activeAgreement: {}
  }),

  mixins: [formatDate, formatCurrency],
  methods: {
    updateAmountModalActivate(row) {
      this.activeAgreement = row
      this.isComponentModalActive = true
    },
    updateStatusModalActive(row) {
      this.activeAgreement = row
      this.isUpdateStatusModalActive = true
    },
    async updateAgreement(e) {
      const result = await this.$store.dispatch('reports/updateAgreement', e)
      if (result) {
        this.$emit('updateAgreements')
        this.$buefy.toast.open({ message: 'Agreement updated!', type: 'is-primary', queue: false })
      } else {
        this.$buefy.toast.open({ message: this.$t('investment.errorMessage'), type: 'is-danger', queue: false })
      }
    },
    async accrualDeposit(data) {
      let userData = await this.$store.dispatch('users/fetchUser', data.user_id)
      if (!userData) {
        this.$buefy.toast.open({ message: 'Failed to fetch user wallet', type: 'is-danger' })
        return
      }
      await this.$store.dispatch('adminContractIntegration/accrualDeposit', {
				values: [data.amount],
				customerAddresses: [userData.ethereum_wallet_payout || userData.ethereum_wallet],
      	comment: `${data.contract} close`,
      }).then(async txHash => {
        if (txHash) {
          await this.$store.dispatch('reports/updateAgreementPayment', {
          	ids: [data._id],
						txHash: txHash
					})
          await this.$emit('updateAgreements')
        }
      })
    },
    getResult(res) {
      // UNMARKED =  1CLOSE = 2 PROLONG = 3
      let result = ''
      switch (res) {
        case 1:
          result = 'Не ответил'
          break
        case 2:
          result = 'Закрыть'
          break
        case 3:
          result = 'Продлить'
          break
      }
      return result
    }
  },

}
</script>

<style scoped>

</style>
