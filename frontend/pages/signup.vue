<template lang="pug">
  section.hero
    div.hero-body
      h1.is-1.has-text-centered {{$t('registration')}}
      div.card
        div.card-content
          ValidationObserver(v-slot="{ invalid }")
            b-field(grouped)
              ValidationProvider(rules="required|email" name="Email" slim v-slot="{ errors, valid }")
                b-field(:label="$t('email')" :type="{ 'is-danger': errors[0], 'is-success': valid }"
                  :message="errors")
                  b-input(type="email" placeholder="your e-mail" v-model="data.email")
              ValidationProvider(rules="required" name="Telegram" slim v-slot="{ errors, valid }")
                b-field(label="Telegram" :type="{ 'is-danger': errors[0], 'is-success': valid }"
                  :message="errors")
                  b-input(type="text" placeholder="@nickname" v-model="data.telegram")
            b-field(label="Ethereum wallet")
              b-input(type="text" placeholder="0x..." v-model="data.ethereum_wallet")
            b-field(grouped)
              ValidationProvider(rules="required" name="First Name" slim v-slot="{ errors, valid }")
                b-field(:label="$t('firstName')" :type="{ 'is-danger': errors[0], 'is-success': valid}"
                  :message="errors")
                  b-input(type="text" placeholder="first" v-model="data.first_name")
              ValidationProvider(rules="required" name="Last Name" slim v-slot="{ errors, valid }")
                b-field(:label="$t('lastName')" :type="{ 'is-danger': errors[0], 'is-success': valid }"
                  :message="errors")
                  b-input(type="text" placeholder="last" v-model="data.last_name")
            b-field(grouped)
              ValidationProvider(rules="required|min:8" vid="confirmation" name="password" slim v-slot="{ errors, valid }")
                b-field(:label="$t('password')" :type="{ 'is-danger': errors[0], 'is-success': valid }"
                  :message="errors")
                  b-input(type="password" placeholder="password" v-model="data.password")
              ValidationProvider(rules="required|confirmed:confirmation"  name="password" slim v-slot="{ errors, valid }")
                b-field(:label="$t('confirmPassword')" :type="{ 'is-danger': errors[0], 'is-success': valid }"
                  :message="errors")
                  b-input(type="password" placeholder="confirm password" v-model="data.repeat_password")
            b-field(label="Referral ID")
              b-input(type="text" placeholder="Referral ID" v-model="data.referral_id" :disabled="lockReferralIdInput")
            b-field(grouped class="between")
              b-checkbox(v-model="acceptedConditions") {{$t('acceptedAgreement')}}
              b-button(type="is-info" :loading="loading" :disabled="invalid" @click="signup") Sign up
            nuxt-link(to="/") {{$t('authorization')}}

</template>

<script>
import {ValidationObserver, ValidationProvider} from "vee-validate";

export default {
  name: "signup",
  layout: "auth",
  components: {ValidationObserver, ValidationProvider},
  middleware: ["userRedirect"],
  data() {
    return {
      data: {
        email: "",
        first_name: "",
        last_name: "",
        telegram: "",
        ethereum_wallet: "",
        password: "",
        repeat_password: "",
        referral_id: ""
      },
      acceptedConditions: false,
      lockReferralIdInput: false,
      loading: false
    };
  },
  methods: {
    async signup() {
      if (!this.acceptedConditions) {
        this.$buefy.toast.open({
          message: "You have to confirm terms of the agreement",
          type: "is-warning"
        });
        return false;
      }
      if (!this.data.referral_id) {
        this.$buefy.dialog.alert({
          message: this.modalMessage,
          confirmText: "Ok!"
        });
        return false;
      }
      this.loading = true;
      let resp = await this.$store.dispatch("signUp", this.data);
      if (resp === null) {
        this.$buefy.toast.open({
          message: "Successfully registered! Please check your email to verify your account",
          type: "is-success",
          duration: 10000
        });
        this.$router.push("/");
      } else {
        resp.map(el => {
          this.$buefy.toast.open({message: el.message, type: "is-danger"});
        });
        this.loading = false;
        return false;
      }
    }
  },
  computed: {
    modalMessage() {
      return this.$t("modalMessage");
    }
  },
  mounted() {
    let idFromCookies = this.$cookies.get("referral_id");
    if (this.$route.query.referral) {
      this.$cookies.set("referral_id", this.$route.query.referral, {
        maxAge: 60 * 60 * 24 * 365
      });
      this.data.referral_id = this.$route.query.referral;
      this.lockReferralIdInput = true;
    } else if (idFromCookies) {
      this.data.referral_id = idFromCookies;
      this.lockReferralIdInput = true;
    }
  }
};
</script>

<style lang="sass" scoped>
.hero-body
  margin: 0 auto

  h1
    margin-bottom: 30px

  .card
    width: 640px
    min-height: 555px

    .card-content
      display: flex
      flex-direction: column

  .is-grouped.between
    justify-content: space-between

  .is-grouped > .field
    width: 49%

  .button
    padding: 15px 55px
    width: 150px
    height: 50px

  span
    margin-top: 10px

    &:first-child
      margin-top: 30px

    &.control-label
      text-decoration-line: underline
</style>
