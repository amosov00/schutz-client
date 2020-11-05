<template lang="pug">
  div
    h1.title.is-size-2 {{$t('partnerProgram')}}
    div.top-text.has-text-grey {{$t('partnerProgramDesc')}}
    div.box
      div.box-title {{$t('yourRefferalLink')}}
      .columns(v-if="!isDepositOpen")
        .column.is-12.has-text-centered.has-text-dark.has-text-weight-medium To get partner link, open your fist deposit.
      .columns(v-else)
        .column.is-10
          input(:value="referralLink" ref="reflink").hidden-input
          b-input(
            :value="referralLink" custom-class="input-shadow input-text-center is-size-6"
            @focus="focusInput" @keydown.native="onlyCtrlC" size="is-medium"
            :loading="loading.referralLink")
        .column.is-2
          button.button.is-info.is-fullwidth(@click="copy") Copy
    PartnersTable
</template>

<script>
  import { mapGetters } from "vuex";
  import PartnersTable from "~/components/tables/PartnersTable";

  export default {
    name: 'partner',
    layout: 'profile',
    middleware: ["authRequired", "contracts"],
    components: {
      PartnersTable
    },
    async asyncData({ store }){
      if (store.getters.partners.length === 0 ) {
        await store.dispatch("fetchPartners")
      }
    },
    computed: {
      ...mapGetters(['referralLink']),
    },
    data: () => ({
      isDepositOpen: true,
      loading: {
        referralLink: false,
      }
    }),
    methods: {
      onlyCtrlC(e) {
        this.focusInput(e);
        if (e.key.toLowerCase() === 'c' && e.ctrlKey) {
          this.$buefy.toast.open({message: 'Copied to clipboard', type: 'is-primary', queue: false});
          return
        }

        e.preventDefault();
      },
      focusInput(e) {
        e.target.select();
      },
      copy() {
        this.$refs.reflink.select();
        document.execCommand('copy');
        this.$buefy.toast.open({message: 'Copied to clipboard', type: 'is-primary'});
      }
    },
    async mounted() {
      if (!this.referralLink) {
        this.loading.referralLink = true
        await this.$store.dispatch("fetchReferralLink")
        this.loading.referralLink = false
      }
    },
  }
</script>

<style lang="sass">
  .hidden-input
    position: absolute
    left: -9999px

  .box-title
    font-size: 16px
    margin-bottom: 10px

  .top-text
    font-weight: 300
    font-size: 15px
    line-height: 24px
    margin-bottom: 20px

  .input-shadow
    box-shadow: inset 0px 6px 4px rgba(0, 0, 0, 0.06)

  .input-text-center
    text-align: center
</style>
