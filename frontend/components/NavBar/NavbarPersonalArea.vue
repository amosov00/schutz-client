<template lang="pug">
  b-navbar(type='is-white').navbar-personal
    template(slot='start')
      div.is-flex.nav-item
        .column.is-narrow
          div.has-text-weight-bold {{ $t('deposit') }}
          div {{ `${formatCurrency(tokenBalance)} USDT` }}
        .column
          PayoutButton(:allowPayment="false" :customTooltipLabel="userActiveDeposits")
      div.is-flex.nav-item
        .column.is-narrow
          div.has-text-weight-bold {{ $t('dividends') }}
          div {{ `${formatCurrency(interestBalance)} USDT` }}
        .column
          PayoutButton(:allowPayment="true" @click.native="withdraw")

    template(slot='end')
      .nav-item.is-flex
        LangSwitcher

    template(slot='end', v-if='$store.state.users')
      div.is-flex.nav-item
        .column
          img(:src="require('~/assets/img/no-avatar.jpg')")
        .column.username {{ $store.state.users.email }}

      b-navbar-item(@click='$authLogout')
        InlineSvg(:src="require('~/assets/icons/logout.svg')")

</template>

<script>
import {mapGetters} from "vuex"
import InlineSvg from "vue-inline-svg";
import LangSwitcher from "~/components/NavBar/LangSwitcher";
import PayoutButton from "~/components/NavBar/PayoutButton";
import formatCurrency from '~/mixins/formatCurrency'
import moment from "moment";

export default {
  name: "NavbarPersonalArea",
  components: {PayoutButton, LangSwitcher, InlineSvg},
  mixins: [formatCurrency],
  data: () => ({

  }),
  computed: {
  	...mapGetters("userContractIntegration", ["tokenBalance", "interestBalance"]),
    userActiveDeposits() {
      if (!this.$store.getters.user || !this.$store.getters.user.active_deposits) {
        return ""
      }
      return this.$store.getters.user.active_deposits.reduce((acc, curr) => {
        acc += `${curr.contract}: ${moment.unix(curr.close_date).utc().format("DD/MM/YYYY")}\n`
        return acc
      }, "")
    }
  },
  methods: {
  },
};
</script>

<style lang="sass" scoped>
.nav-item
  align-items: center

  &:after
    content: ""
    width: 1px
    height: 2rem
    background: #B0B0B0
    position: relative
    opacity: 0.25
    margin: 0 10px

.navbar-personal
  width: 100%

.username
  position: relative
  top: -1px
</style>
