<template>
  <div>
    <custom-slider :activeDot="1" :dots="4" :next-page="localePath('/investment')" :prev-page="localePath('/partner')">
      <template slot="content">
        <div class="columns">
          <div class="column mb-4 is-flex flex-column">
            <div class="data-item">
              <div class="icon name"></div>
              <div class="value">{{`${user.first_name} ${user.last_name}`}}</div>
            </div>
            <div class="data-item">
              <div class="icon email"></div>
              <div class="value">{{user.email}}</div>
            </div>
            <div class="data-item" v-if="user.telegram">
              <div class="icon telegram"></div>
              <div class="value">{{user.telegram}}</div>
            </div>
            <div class="data-item">
              <div class="icon password"></div>
              <a
                class="value has-text-link"
                @click="isComponentModalActive = true"
              >
                {{ $t('Сменить пароль') }}
              </a>
            </div>
            <div class="data-item" v-if="!user.ethereum_wallet">
              <div class="icon metamask"></div>
              <a
                @click="isWalletModalActive = true"
                class="value has-text-link">
                {{ $t('Добавить кошелек') }}
              </a>
            </div>
            <div class="data-item" v-else>
              <div class="icon metamask"></div>
              <div class="value">{{user.ethereum_wallet}}</div>
            </div>
          </div>
        </div>
        <div class="columns is-flex-grow-1">
          <div class="column is-half is-flex flex-column">
            <div>
              <div class="is-size-5"> {{ $t('Вклад USDT') }}:</div>
              <div class="is-size-2">{{ formatCurrency(totalDeposit) }}</div>
              <div
                class="is-size-7"
                v-if="lastContract">
                {{ $t('Дата закрытия') }}
              </div>
              <div
                class="is-size-7"
                v-if="lastContract">
                {{formatDate(lastContract.close_date)}}
              </div>
            </div>
            <a
              class="has-text-link is-cursor-pointer exit-btn is-size-5"
              @click='$authLogout'
            >
              <i class="fas fa-power-off"></i>
              {{ $t('Выйти') }}
            </a>
          </div>
          <div class="column is-half is-flex is-flex-direction-column">
            <custom-button
              @click.native="isAddFundsModalActive = true"
              v-if="user.is_deposit_open && allowance !== 0"
              :disabled="!user.ethereum_wallet" class="mb-2"
            >
              {{ $t('Пополнить депозит') }}
            </custom-button>
            <custom-button
              v-else
              :disabled="!user.ethereum_wallet"
              class="mb-2"
              @click.native="$router.push('/investment')"
            >
              {{ $t('Открыть вклад') }}
            </custom-button>
            <custom-button
              v-if="lastContract"
              class="mb-2"
              @click.native="prolongAgreement(lastContract._id)"
            >
              {{ $t('Продлить') }}
            </custom-button>
            <custom-button
              v-if="lastContract"
              class="mb-2"
              @click.native="closeAgreement(lastContract._id)"
            >
              {{ $t('Закрыть') }}
            </custom-button>

            <custom-button
              class="mb-2"
              v-if="totalDividends"
              @click.native="withdraw"
            >
              {{ $t('Вывести') }} {{ formatCurrency(totalDividends) }}
            </custom-button>
            <div
              class="has-text-danger mt-auto is-size-7 is-fullwidth has-text-centered"
              v-if="!user.ethereum_wallet"
            >
              {{ $t('Для открытия вклада необходимо добавить кошелек!') }}
            </div>
          </div>
        </div>
      </template>
    </custom-slider>
    <b-modal :active.sync="isWalletModalActive" has-modal-card>
      <AddNewWalletModal></AddNewWalletModal>
    </b-modal>
    <b-modal
      :active.sync="isComponentModalActive"
      has-modal-card
    >
      <PasswordChange />
    </b-modal>
    <b-modal
      :active.sync="isAddFundsModalActive"
      has-modal-card
    >
      <AddFundsModal />
    </b-modal>
  </div>
</template>

<script>
import InlineSvg from 'vue-inline-svg'
import PasswordChange from '~/components/PasswordChange'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { mapGetters } from 'vuex'
import AddNewWalletModal from '~/components/modals/AddNewWalletModal'
import formatCurrency from '~/mixins/formatCurrency'
import formatDate from '~/mixins/formatDate'
import AddFundsModal from '~/components/modals/AddFundsModal'
import { mainSliderController } from "@/utils/slider";

export default {
  name: 'index',
  layout: 'profile',
  middleware: ['authRequired', 'contracts'],
  mixins: [formatCurrency, formatDate],
  components: {
    InlineSvg,
    PasswordChange,
    ValidationProvider,
    ValidationObserver,
    AddNewWalletModal,
    AddFundsModal
  },
	transition: mainSliderController,
  methods: {
    async withdraw() {
      await this.$store.dispatch('userContractIntegration/withdraw', this.totalDeposit)
    },
    focusInput(e) {
      e.target.select()
    },
    changeEthereumAddress() {
      if (this.copiedWallet.ethereum_wallet) {
        this.$store.dispatch(
          'changeEthereumAddress',
          this.copiedWallet.ethereum_wallet
        )
      }
    },
    async prolongAgreement(id) {
      const res = await this.$store.dispatch('prolongAgreement', id)
      if (!res) {
        this.$buefy.toast.open({ message: this.$t('investment.errorMessage'), type: 'is-danger', queue: false })
      }
      await this.$store.dispatch('fetchContractAgreements')
    },
    async closeAgreement(id) {
      const res = await this.$store.dispatch('closeAgreement', id)
      if (!res) {
        this.$buefy.toast.open({ message: this.$t('investment.errorMessage'), type: 'is-danger', queue: false })
      }
      await this.$store.dispatch('fetchContractAgreements')
    },
  },
  computed: {
    ...mapGetters(['user', 'contractAgreements']),
		...mapGetters("metamask", ['gasPrice']),
		...mapGetters('deposit', ['totalDividends', 'allowance']),
    lastContract() {
      if (this.contractAgreements && this.contractAgreements.length) {
        return this.contractAgreements[0]
      }
      return null
    },
    userWallet: {
      get: function() {
        return this.user.ethereum_wallet
      },
      set: function(newValue) {
        this.newEthereumWallet = newValue
      }
    },
    copiedWallet() {
      return { ...this.user }
    },
    totalDeposit() {
      const total = this.$store.getters['deposit/totalDeposit']
      return total ? total : 0
    },
  },
  async created() {
    if (!this.$store.state.metamask.gasPrice) {
      await this.$store.dispatch('metamask/getGasPrice')
    }
    await this.$store.dispatch('fetchContractAgreements')
  },
  mounted() {
    for (let prop in this.profile) {
      this.profile[prop].value = this.user[prop]
    }
  },
  data: () => ({
    isProfileUpdating: false,
    regex_telegram: /^[a-zA-Z0-9_\@]*$/,
    profile: {
      first_name: { value: '', label: 'First name' },
      last_name: { value: '', label: 'Last name' },
      email: { value: '', label: 'Email' },
      telegram: { value: '', label: 'Telegram' },
      ethereum_wallet_payout: { value: '', label: '' }
    },
    newEthereumWallet: '',
    isComponentModalActive: false,
    isWalletModalActive: false,
    isAddFundsModalActive: false
  })
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/transitions/slide-fade.scss";

.exit-btn {
  margin-top: auto;
}
.data-item {
  display: flex;
  align-items: center;
  padding-left: 32px;
  position: relative;
  margin-bottom: 8px;
  .icon {
    position: absolute;
    left: 0;
    top: 50%;
    height: 100%;
    width: 30px;
    transform: translateY(-50%);
    background-position: left center;
    background-repeat: no-repeat;
    background-size: contain;

    &.name {
      background-image: url("data:image/svg+xml,%3Csvg width='24' height='30' viewBox='0 0 24 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20.1724 17.2436L15.9187 15.9678L15.8577 15.7248C15.7772 15.5029 15.6278 15.3118 15.4325 15.1789L15.0073 14.8751L15.3715 14.5106C15.6773 14.2015 15.9434 13.8546 16.1618 13.4786C16.64 12.8033 17.0281 12.0681 17.3162 11.2924C17.4373 10.9895 17.5593 10.6857 17.6804 10.3819L17.7414 10.2595L17.8625 10.1997C18.1613 9.96544 18.3399 9.60972 18.3487 9.23111V7.95615C18.362 7.69112 18.2754 7.43138 18.1056 7.2271L17.9209 7.10472V5.16146C17.9209 5.15706 17.9209 5.15354 17.9209 5.14914C17.9209 2.32627 15.5898 0.00264149 12.7558 0H10.9375C8.10343 0.00264149 5.77238 2.32627 5.77238 5.14914C5.77238 5.15354 5.77238 5.15706 5.77238 5.16146V7.10472L5.71227 7.22622C5.55138 7.4349 5.46564 7.69201 5.46917 7.95527V9.23023C5.47801 9.60884 5.65657 9.96456 5.95536 10.1988L6.07646 10.2586L6.13746 10.381C6.23204 10.6945 6.35403 10.9991 6.50166 11.2915C6.80133 12.0619 7.18851 12.7954 7.65613 13.4777C7.89923 13.8423 8.20332 14.2068 8.44641 14.5097L8.81061 14.8742L8.38542 15.178C8.19006 15.3109 8.04066 15.502 7.96022 15.7239L7.89923 15.9669L3.64552 17.2427C2.43094 17.6064 1.03337 21.1284 0 26.7151C3.62608 28.8477 7.75779 29.98 11.9691 29.9976C12.4959 30.0073 13.0236 29.9879 13.5487 29.9377C17.2393 29.7053 20.8221 28.602 24 26.7195C22.8455 21.2508 21.448 17.6073 20.1724 17.2436Z' fill='%23666666'/%3E%3C/svg%3E%0A");
    }

    &.email {
      width: 16px;
      height: 12px;
      background-image: url("data:image/svg+xml,%3Csvg width='16' height='12' viewBox='0 0 16 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7.99995 8.44066L6.07995 6.68066L0.319946 11.6407C0.639946 11.8007 0.799946 11.9607 1.11995 11.9607H14.8799C15.1999 11.9607 15.3599 11.8007 15.6799 11.6407L9.91995 6.68066L7.99995 8.44066Z' fill='%23555555'/%3E%3Cpath d='M15.6799 0.76043C15.3599 0.60043 15.1999 0.44043 14.8799 0.44043H1.11995C0.799946 0.44043 0.639946 0.60043 0.319946 0.76043L7.99995 7.32043L15.6799 0.76043Z' fill='%23555555'/%3E%3Cpath d='M0 1.56055V11.0005L5.6 6.36055L0 1.56055Z' fill='%23555555'/%3E%3Cpath d='M10.4 6.36055L16 11.0005V1.56055L10.4 6.36055Z' fill='%23555555'/%3E%3C/svg%3E%0A");
    }

    &.telegram {
      width: 16px;
      height: 12px;
      background-image: url("data:image/svg+xml,%3Csvg width='13' height='11' viewBox='0 0 13 11' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3.18783 6.23541L0.260033 5.28151C0.260033 5.28151 -0.0897973 5.13914 0.0220671 4.81778C0.0454569 4.75066 0.0922365 4.69473 0.232576 4.5971C0.881389 4.14456 12.2427 0.0604927 12.2427 0.0604927C12.2427 0.0604927 12.5631 -0.0473037 12.7512 0.0248996C12.8457 0.0540861 12.9176 0.131781 12.9394 0.228289C12.9598 0.312798 12.9683 0.399747 12.9648 0.486595C12.9648 0.561849 12.9546 0.632018 12.9485 0.740832C12.8783 1.85948 10.8129 10.1903 10.8129 10.1903C10.8129 10.1903 10.6888 10.6774 10.2444 10.6988C10.0241 10.706 9.8099 10.6234 9.65156 10.47C8.78003 9.72049 5.76986 7.69676 5.10478 7.25236C5.07447 7.23181 5.05444 7.19917 5.04986 7.16287C5.04071 7.11609 5.09156 7.06117 5.09156 7.06117C5.09156 7.06117 10.3339 2.40151 10.4733 1.91236C10.4844 1.87473 10.4438 1.85541 10.3888 1.87168C10.04 1.99981 4.00444 5.81236 3.33834 6.23236C3.28922 6.24568 3.23746 6.2467 3.18783 6.23541Z' fill='%23666666'/%3E%3C/svg%3E%0A");
    }

    &.password {
      background-image: url("data:image/svg+xml,%3Csvg width='12' height='15' viewBox='0 0 12 15' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 0C3.79 0 2 1.80504 2 4.03361V6.05042H0V14.1176H12V6.05042H10V4.03361C10 1.80504 8.21 0 6 0ZM6 2.01681C7.19 2.01681 8 2.83361 8 4.03361V6.05042H4V4.03361C4 2.83361 4.81 2.01681 6 2.01681Z' fill='%23666666'/%3E%3C/svg%3E%0A");
    }
    &.metamask {
      background-image: url("data:image/svg+xml,%3Csvg width='16' height='15' viewBox='0 0 16 15' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14.3028 1L8.84003 5.06388L9.85022 2.66624L14.3028 1Z' fill='%23E2761B' stroke='%23E2761B' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M1.69165 1L7.11047 5.10237L6.14969 2.66624L1.69165 1Z' fill='%23E4761B' stroke='%23E4761B' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M12.3372 10.4199L10.8823 12.6526L13.9952 13.5104L14.8901 10.4694L12.3372 10.4199Z' fill='%23E4761B' stroke='%23E4761B' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M1.11517 10.4694L2.00458 13.5104L5.11753 12.6526L3.66262 10.4199L1.11517 10.4694Z' fill='%23E4761B' stroke='%23E4761B' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M4.94191 6.64767L4.07446 7.96197L7.16544 8.09945L7.05564 4.77246L4.94191 6.64767Z' fill='%23E4761B' stroke='%23E4761B' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M11.0523 6.64711L8.91115 4.7334L8.83978 8.09888L11.9253 7.96141L11.0523 6.64711Z' fill='%23E4761B' stroke='%23E4761B' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M5.11749 12.6524L6.97318 11.745L5.37004 10.4912L5.11749 12.6524Z' fill='%23E4761B' stroke='%23E4761B' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M9.02112 11.745L10.8823 12.6524L10.6243 10.4912L9.02112 11.745Z' fill='%23E4761B' stroke='%23E4761B' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M10.8823 12.6525L9.02112 11.7451L9.16935 12.9604L9.15288 13.4719L10.8823 12.6525Z' fill='%23D7C1B3' stroke='%23D7C1B3' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M5.11755 12.6525L6.84697 13.4719L6.83599 12.9604L6.97324 11.7451L5.11755 12.6525Z' fill='%23D7C1B3' stroke='%23D7C1B3' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M6.87465 9.6883L5.32642 9.23187L6.41896 8.73145L6.87465 9.6883Z' fill='%23233447' stroke='%23233447' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M9.12006 9.6883L9.57574 8.73145L10.6738 9.23187L9.12006 9.6883Z' fill='%23233447' stroke='%23233447' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M5.11768 12.6526L5.38121 10.4199L3.66278 10.4694L5.11768 12.6526Z' fill='%23CD6116' stroke='%23CD6116' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M10.6189 10.4199L10.8824 12.6526L12.3373 10.4694L10.6189 10.4199Z' fill='%23CD6116' stroke='%23CD6116' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M11.9255 7.96191L8.84003 8.09939L9.12552 9.68865L9.5812 8.7318L10.6792 9.23222L11.9255 7.96191Z' fill='%23CD6116' stroke='%23CD6116' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M5.32629 9.23222L6.42433 8.7318L6.87452 9.68865L7.1655 8.09939L4.07452 7.96191L5.32629 9.23222Z' fill='%23CD6116' stroke='%23CD6116' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M4.07446 7.96191L5.37015 10.4915L5.32623 9.23222L4.07446 7.96191Z' fill='%23E4751F' stroke='%23E4751F' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M10.6792 9.23222L10.6243 10.4915L11.9255 7.96191L10.6792 9.23222Z' fill='%23E4751F' stroke='%23E4751F' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M7.16543 8.09961L6.87445 9.68887L7.2368 11.5641L7.31916 9.09496L7.16543 8.09961Z' fill='%23E4751F' stroke='%23E4751F' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M8.83995 8.09961L8.69171 9.08946L8.75759 11.5641L9.12543 9.68887L8.83995 8.09961Z' fill='%23E4751F' stroke='%23E4751F' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M9.12541 9.68885L8.75757 11.5641L9.0211 11.7455L10.6242 10.4917L10.6791 9.23242L9.12541 9.68885Z' fill='%23F6851B' stroke='%23F6851B' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M5.32642 9.23242L5.37034 10.4917L6.97347 11.7455L7.237 11.5641L6.87465 9.68885L5.32642 9.23242Z' fill='%23F6851B' stroke='%23F6851B' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M9.15285 13.4717L9.16932 12.9603L9.03207 12.8393H6.96226L6.83599 12.9603L6.84697 13.4717L5.11755 12.6523L5.72148 13.1473L6.94579 13.9996H9.04854L10.2783 13.1473L10.8823 12.6523L9.15285 13.4717Z' fill='%23C0AD9E' stroke='%23C0AD9E' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M9.02128 11.7459L8.75775 11.5645H7.23697L6.97344 11.7459L6.83618 12.9612L6.96246 12.8403H9.03226L9.16952 12.9612L9.02128 11.7459Z' fill='%23161616' stroke='%23161616' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M14.5333 5.32784L14.9999 3.08418L14.3027 1L9.02112 4.9264L11.0525 6.64763L13.9239 7.489L14.5607 6.74662L14.2862 6.54865L14.7254 6.14721L14.385 5.88325L14.8243 5.5478L14.5333 5.32784Z' fill='%23763D16' stroke='%23763D16' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M1 3.08418L1.46667 5.32784L1.1702 5.5478L1.60941 5.88325L1.27451 6.14721L1.71373 6.54865L1.43922 6.74662L2.07059 7.489L4.94196 6.64763L6.97333 4.9264L1.69176 1L1 3.08418Z' fill='%23763D16' stroke='%23763D16' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M13.9238 7.48883L11.0524 6.64746L11.9254 7.96176L10.6242 10.4914L12.3371 10.4694H14.8901L13.9238 7.48883Z' fill='%23F6851B' stroke='%23F6851B' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M4.94184 6.64746L2.07047 7.48883L1.11517 10.4694H3.66262L5.37008 10.4914L4.07439 7.96176L4.94184 6.64746Z' fill='%23F6851B' stroke='%23F6851B' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M8.83998 8.10016L9.02115 4.92715L9.85566 2.66699H6.14978L6.97331 4.92715L7.16547 8.10016L7.23135 9.10101L7.23684 11.5646H8.75762L8.7686 9.10101L8.83998 8.10016Z' fill='%23F6851B' stroke='%23F6851B' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
    }
  }
  .value {
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 19px;
    color: #666666;

    &.has-text-link {
      cursor: pointer;
    }
  }

  &:first-child {
    margin-bottom: 14px;
    .value {
      font-size: 24px;
      line-height: 120%;
      text-transform: capitalize;
    }
  }
}
</style>
