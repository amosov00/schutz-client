<template lang="pug">
  div
    h1.title.is-2 Update User Data
    div.box
      ValidationObserver(v-slot="{ invalid }")
        b-field(grouped)
          b-field(label="ID")
            b-input(type="test" disabled :value="user._id")
          b-field(:label="$t('registerDate')")
            b-input(type="test" disabled :value="timestampFromUtc(user.created_at)")
        b-field(grouped)
          b-field(label="Telegram")
            b-input(type="text" placeholder="@nickname" v-model="user.telegram")
          b-field(:label="$t('NTSCDbalance')")
            b-input(type="text" placeholder="NTSCD" disabled :value="userDeposit")
        b-field(:label="$t('ethereumWallet')")
          b-input(type="text" placeholder="0x..." v-model="user.ethereum_wallet")
        b-field(:label="$t('ethereumWalletPayout')")
          b-input(type="text" placeholder="0x..." v-model="user.ethereum_wallet_payout")
        b-field(:label="$t('referralLink')")
          b-input(type="text" :placeholder="$t('referralLink')" disabled :value="user.referral_link")
        div
          nuxt-link.label(:to="'/reports/' + user._id") {{$t('activeDeposits')}}
          b-table.table-custom-m0(:data="activeDeposits" striped)
            template(slot-scope="props")
              b-table-column(field="contract" label="Contract name") {{ showContract(props.row) }}
              b-table-column(field="open_date" label="Open date") {{ timestampToDate(props.row.open_date) }}
              b-table-column(field="close_date" label="Close date") {{ timestampToDate(props.row.close_date) }}
              b-table-column(label="Prolong")
                b-button(@click="showProlongDepositModal(props.row.contract)" type="is-info") Prolong
        b-field(grouped)
          b-field(:label="$t('firstName')")
            b-input(type="text" placeholder="first" v-model="user.first_name")
          b-field(:label="$t('lastName')")
            b-input(type="text" placeholder="last" v-model="user.last_name")
        div.block
          b-checkbox(v-model="user.is_superuser") Admin
          b-checkbox(v-model="user.is_manager") Manager
        div.block
          b-switch(v-model="user.is_active") Email is activated
        b-field(:label="$t('email')")
          b-input(type="email" placeholder="your e-mail" v-model="user.email")
        b-field(grouped)
          ValidationProvider(rules="min:8" vid="confirmation" name="password" slim v-slot="{ errors, valid }")
            b-field(:label="$t('password')" :type="{ 'is-danger': errors[0], 'is-success': valid }"
            :message="errors")
              b-input(type="password" placeholder="password" v-model="user.password")
          ValidationProvider(rules="confirmed:confirmation"  name="password" slim v-slot="{ errors, valid }")
            b-field(:label="$t('confirmPassword')" :type="{ 'is-danger': errors[0], 'is-success': valid }"
            :message="errors")
              b-input(type="password" placeholder="confirm password" v-model="user.repeat_password")
        b-field(label="Referral 1")
          b-input(type="text" placeholder="Referral 1" v-model="user.referral_1")
        b-field(label="Referral 2")
          b-input(type="text" placeholder="Referral 2" v-model="user.referral_2")
        b-field(label="Referral 3")
          b-input(type="text" placeholder="Referral 3" v-model="user.referral_3")
        b-field(grouped class="between")
          nuxt-link(class="button is-link is-medium mr-3" to="/users")  {{$t('cancel')}}
          b-button(
          v-if="$userIsSuperuser()"
          size="is-medium"
          type="is-info"
          @click="update"
          :disabled="invalid") {{$t('update')}}
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import moment from 'moment'
import formatDate from '~/mixins/formatDate'
import ProlongDepositModal from '~/components/modals/ProlongDepositModal'

export default {
  layout: 'admin',
  mixins: [formatDate],
  middleware: ['authRequired', 'adminRequired', 'contracts'],
  components: { ValidationObserver, ValidationProvider },
  data() {
    return {
      user: {},
    }
  },
  async created() {
    this.user = await this.$store.dispatch('fetchUser', this.$route.params.id)
    if (this.user.ethereum_wallet) {
      this.$store.dispatch('deposit/getDeposit', this.user.ethereum_wallet)
    }
  },
  methods: {
    async showProlongDepositModal(contract) {
      let modal = this.$buefy.modal.open({
        parent: this,
        component: ProlongDepositModal,
        trapFocus: true,
        props: {
          user: this.user,
          contract: contract
        }
      })
      modal.$on('close', async() => (await this.reloadActiveDeposits()))
    },
    showContract(data) {
      return data.prolongedContract ? `${data.contract} (prolonged to ${data.prolongedContract})` : data.contract
    },
    async update() {
      if (
        this.updatedUser.password === '' ||
        this.updatedUser.repeat_password === ''
      ) {
        delete this.updatedUser.password
      }
      let resp = await this.$store.dispatch('updateUser', this.updatedUser)
      if (resp.status === 200) {
        this.$buefy.toast.open({
          message: this.$t('dataUpdated'),
          type: 'is-success'
        })
      } else {
        this.$buefy.toast.open({
          message: this.$t('dataNotUpdated'),
          type: 'is-danger'
        })
      }
    },
    async reloadActiveDeposits() {
      await this.$axios.get(`/admin/active-deposits/${this.user._id}/`).then(resp => {
        this.user.active_deposits = resp.data.contracts
      })
    },
  },
  computed: {
    createdAt() {
      return this.timestampToDate(this.user.created_at)
    },
    updatedUser() {
      return { ...this.user }
    },
    userDeposit() {
      if (this.user.ethereum_wallet) {
        return this.$store.getters['deposit/totalDeposit']
      } else {
        return 0
      }
    },
    closeDate: {
      get: function() {
        return moment.unix(this.user.close_date).toDate()
      },
      set: function(newValue) {
        this.user.close_date = moment(newValue).unix()
      }
    },
    activeDeposits() {
      return this.user.active_deposits
    }
  }
}
</script>

<style
  lang="sass"
  scoped
>
.hero-body
  margin: 10px

  h1
    margin-bottom: 30px

  .card
    width: 100vw
    min-height: 100vh

    .card-content
      display: flex
      flex-direction: column

  .is-grouped.between
    justify-content: space-between

  .is-grouped > .field
    width: 49%


  span
    margin-top: 10px

    &:first-child
      margin-top: 30px

    &.control-label
      text-decoration-line: underline
</style>
