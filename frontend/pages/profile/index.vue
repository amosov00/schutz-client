<template lang="pug">
  div
    .title.is-2 {{ $t('profile') }}
    div.columns
      div.column.is-3
        div.box
            div.subtitle.is-6 {{ $t('personalInformation') }}
            a.info-link.is-block(@click="isComponentModalActive = true") {{ $t('changePassword') }}
            b-modal(:active.sync="isComponentModalActive" has-modal-card)
              PasswordChange
      div.column.is-8
        div.box
          ValidationObserver(v-slot="{ handleSubmit }")
            form(@submit.prevent="handleSubmit(onSubmit)")
              div.columns.is-variable.is-vcentered
                div.column
                  b-field(:label="$t('firstName')")
                      b-input(disabled native-type="text" v-model="profile.first_name.value" placeholder="first name").input-text-center
                  b-field(:label="$t('lastName')")
                      b-input(disabled native-type="text" v-model="profile.last_name.value" placeholder="last name").input-text-center
                  b-field(label="Email")
                    b-input(disabled native-type="email" v-model="profile.email.value" placeholder="your e-mail").input-text-center
                  b-field
                    template(slot="label")
                       | {{$t('ethereumWallet')}} (
                       a(href="https://metamask.io/" target="_blank") MetaMask
                       = ' '
                       | or
                       = ' '
                       a(href="https://trustwallet.com/" target="_blank") Trust
                       | )
                    ValidationProvider(rules="alpha_num|max:42" v-slot="{ errors }" name="Ethereum address")
                      b-input(native-type="text" v-model="copiedWallet.ethereum_wallet" disabled  @focus="focusInput" custom-class="has-background-white-ter" placeholder="0x00000000000000000000000000").input-text-center
                      span.validaton-error {{ errors[0] }}
                  b-field(:label="$t('ethereumWalletPayout')")
                    b-input(disabled native-type="text" v-model="copiedWallet.ethereum_wallet_payout").input-text-center
                  b-button(type="is-primary" v-if="!user.ethereum_wallet" @click="isWalletModalActive = true").w-100 Add wallet
                  b-modal(:active.sync="isWalletModalActive" has-modal-card)
                    AddNewWalletModal
                  b-field(label="Telegram")
                    b-input(disabled native-type="text" placeholder="@").input-text-center
              div.columns
                //- div.column.is-4
                //-   b-button.is-fullwidth(type="is-info" native-type="submit" @click="changeEthereumAddress" :loading="isProfileUpdating") {{ $t('save') }}

</template>

<script>
import InlineSvg from "vue-inline-svg";
import PasswordChange from "~/components/PasswordChange";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { mapGetters } from "vuex";
import AddNewWalletModal from "~/components/modals/AddNewWalletModal";
export default {
  name: "index",
  layout: "profile",
  middleware: ["authRequired", "contracts"],
  components: {
    InlineSvg,
    PasswordChange,
    ValidationProvider,
    ValidationObserver,
    AddNewWalletModal
  },
  methods: {
    focusInput(e) {
      e.target.select();
    },
    changeEthereumAddress() {
      if (this.copiedWallet.ethereum_wallet) {
        this.$store.dispatch(
          "changeEthereumAddress",
          this.copiedWallet.ethereum_wallet
        );
      }
    },
    async onSubmit() {
      let fieldsList = "";
      let foundChanges = false;
      let data = {};

      for (let prop in this.profile) {
        if (this.profile[prop].value !== this.user[prop]) {
          foundChanges = true;
          data[prop] = this.profile[prop].value;
          fieldsList += `<li><b class="is-capitalized">${this.profile[prop].label}:</b> ${this.profile[prop].value}</li>`;
        }
      }

      if (foundChanges) {
        fieldsList = `<ul>${fieldsList}</ul>`;

        this.$buefy.dialog.confirm({
          message: `<div>Your profile data will be changed:</div><br>${fieldsList}`,
          onConfirm: async () => {
            this.isProfileUpdating = true;
            const resp = await this.$store.dispatch("changeProfile", data);
            if (resp) {
              // Обновление данных юзера на странице, чтобы не перезагружать страницу
              await this.$store.$authFetchUser();
              this.$buefy.toast.open({
                message: "Your profile is updated!",
                type: "is-primary"
              });
            } else {
              this.$buefy.toast.open({
                message: "Sorry! Can't update your profile right now!",
                type: "is-danger"
              });
            }
            this.isProfileUpdating = false;
          }
        });
      }
    }
  },
  computed: {
    ...mapGetters(["user"]),
    userWallet: {
      get: function() {
        return this.user.ethereum_wallet;
      },
      set: function(newValue) {
        this.newEthereumWallet = newValue;
      }
    },
    copiedWallet() {
      return { ...this.user };
    }
  },
  mounted() {
    for (let prop in this.profile) {
      this.profile[prop].value = this.user[prop];
    }
  },
  data: () => ({
    isProfileUpdating: false,
    regex_telegram: /^[a-zA-Z0-9_\@]*$/,
    profile: {
      first_name: { value: "", label: "First name" },
      last_name: { value: "", label: "Last name" },
      email: { value: "", label: "Email" },
      telegram: { value: "", label: "Telegram" },
      ethereum_wallet_payout: {value: "", label: ""}
    },
    newEthereumWallet: "",
    isComponentModalActive: false,
    isWalletModalActive: false
  })
};
</script>

<style lang="sass" scoped>
.subtitle
  color: #B0B0B0
.info-link
  margin-bottom: 6px
  &:last-child
    margin-bottom: 0
.box
  border: 1px solid #e3e3e3
.link-upload
  border-bottom: 1px dashed #0495FB
  margin-top: 10px
  margin-bottom: 10px
  &:hover
    opacity: 0.75
</style>
