<template>
  <div>
    <ValidationObserver v-slot="{ invalid }">
      <custom-slider :activeDot="1" :dots="2" next-page="/" prev-page="/">
        <template slot="content">

          <div class="columns is-fullheight">
            <div class="column pt-0 pb-0 is-half is-flex flex-column is-justify-content-space-between">
              <div class="is-size-5 mb-20">
                Регистрация в системе
              </div>
              <div class="mb-20">

                <ValidationProvider
                  rules="required|email"
                  name="Email"
                  slim="slim"
                  v-slot="{ errors, valid }"
                >
                  <base-input
                    size="6"
                    type="email"
                    label="E-mail:"
                    class="mb-20"
                    :is-danger="!!errors[0]"
                    :is-success="!!valid"
                    :error="errors[0]"
                    has-icon
                    v-model="data.email"
                  />
                </ValidationProvider>

                <ValidationProvider
                  rules="required"
                  name="Telegram"
                  slim="slim"
                  v-slot="{ errors, valid }">
                  <base-input
                    size="6"
                    label="Telegram"
                    type="text"
                    placeholder="@nickname"
                    class="mb-20"
                    :is-danger="!!errors[0]"
                    :is-success="!!valid"
                    :error="errors[0]"
                    has-icon
                    v-model="data.telegram" />
                </ValidationProvider>

                <base-input
                  size="6"
                  label="Ethereum wallet"
                  type="text"
                  class="mb-20"
                  placeholder="0x..."
                  v-model="data.ethereum_wallet" />

                <ValidationProvider
                  rules="required"
                  name="First Name"
                  slim="slim"
                  v-slot="{ errors, valid }">
                  <base-input
                    size="6"
                    label="Имя"
                    type="text"
                    placeholder="first"
                    class="mb-20"
                    :is-danger="!!errors[0]"
                    :is-success="!!valid"
                    :error="errors[0]"
                    has-icon
                    v-model="data.first_name"
                  />
                </ValidationProvider>

                <ValidationProvider
                  rules="required"
                  name="Last Name"
                  slim="slim"
                  v-slot="{ errors, valid }">
                  <base-input
                    size="6"
                    label="Фамилия"
                    type="text"
                    placeholder="last"
                    class="mb-20"
                    :is-danger="!!errors[0]"
                    :is-success="!!valid"
                    :error="errors[0]"
                    has-icon
                    v-model="data.last_name" />
                </ValidationProvider>

                <ValidationProvider
                  rules="required|min:8"
                  vid="confirmation"
                  name="password"
                  slim="slim"
                  v-slot="{ errors, valid }">
                  <base-input
                    size="6"
                    label="Пароль"
                    type="password"
                    placeholder="password"
                    v-model="data.password"
                    class="mb-20"
                    :is-danger="!!errors[0]"
                    :is-success="!!valid"
                    :error="errors[0]"
                    has-icon
                  />
                </ValidationProvider>

                <ValidationProvider
                  rules="required|confirmed:confirmation"
                  name="password"
                  slim="slim"
                  v-slot="{ errors, valid }"
                >
                  <base-input
                    size="6"
                    label="Подтвердите пароль"
                    type="password"
                    placeholder="confirm password"
                    class="mb-20"
                    :is-danger="!!errors[0]"
                    :is-success="!!valid"
                    :error="errors[0]"
                    has-icon
                    v-model="data.repeat_password" />
                </ValidationProvider>

                <base-input
                  size="6"
                  label="Referral ID"
                  type="text"
                  placeholder="Referral ID"
                  v-model="data.referral_id"
                  :disabled="lockReferralIdInput"
                />

              </div>
              <div class="left-link">
                <b-checkbox v-model="acceptedConditions">
                  Я принимаю <a href="#terms">условия соглашения</a>
                </b-checkbox>
              </div>
            </div>
            <div class="column pt-0 pb-0 is-half is-flex is-flex-direction-column is-justify-content-space-between">
              <img src="../static/login-page.png">
              <custom-button
                :disabled="invalid || !acceptedConditions"
                @click.native="signup"
              >
                Зарегистрироваться
              </custom-button>
            </div>
          </div>

        </template>
      </custom-slider>
      <div class="container">
        <div class="terms mb-6" id="terms">
          <p class="is-size-4 has-text-primary mb-2">Terms and conditions</p>
          <p class="is-size-6 mb-5">«15» мая 2020 г.</p>
          <p class="is-size-7 has-text-weight-light mb-6">
            NTS Crypto, именуемый в дальнейшем «Управляющий», с одной стороны, и пользователь математического кода
            «0x5dfb0d30ac6fe828ed6ba9cffde6b60d166d8d1f», именуемый в дальнейшем «Инвестор», с другой стороны, совместно
            именуемые в дальнейшем «Стороны», заключили настоящее Соглашение о нижеследующем:
          </p>
          <div class="is-flex mb-4 has-text-weight-light is-size-7">
            <span class="num">1</span>
            <p>ПРЕДМЕТ СОГЛАШЕНИЯ</p>
          </div>

          <div class="is-flex mb-3 has-text-weight-light is-size-7">
            <span class="num">1.1</span>
            <p>
              Управляющий обязуется принять в управление цифровые активы и управлять ими в течение срока действия
              настоящего вклада.
            </p>
          </div>

          <div class="is-flex mb-3 has-text-weight-light is-size-7">
            <span class="num">1.2</span>
            <p>
              Технологией по приему и выдачи цифровых активов выступает централизованный смарт-контракт на
              базе блокчейна
              Эфириума (Ethereum) Neutrino Token Standart (NTS). Данный смарт-контракт не влияет на получение прибыли
              Управляющим, а лишь является автоматизированной платформой - электронным бухгалтером NTS Crypto.
            </p>
          </div>
          <div class="is-flex mb-3 has-text-weight-light is-size-7">
            <span class="num">1.3</span>
            <p>
              Управляющий обязуется управлять цифровыми активами, совершая спекулятивные операции на биржевом
              рынке в целях извлечения в пользу Инвестора прибыли от колебаний курсов в течение расчетного периода.
              Управляющий имеет
              право на свое усмотрение выбирать любые спекулятивные сделки для извлечения прибыли в пользу Инвестора.
            </p>
          </div>
          <div class="is-flex mb-3 has-text-weight-light is-size-7">
            <span class="num">1.4</span>
            <p>
              Расчетный период определяется условиями тарифного плана.
            </p>
          </div>
          <div class="is-flex mb-3 has-text-weight-light is-size-7">
            <span class="num">1.5</span>
            <p>
              Заключение Соглашения между Управляющим и Инвестором, вместе именуемыми – «Стороны»,
              осуществляется путем
              полного и безоговорочного присоединения Клиента к Соглашению (акцепта Соглашения) в соответствии со ст.
              428
              Гражданского кодекса Российской Федерации.
            </p>
          </div>
          <div class="is-flex mb-3 has-text-weight-light is-size-7">
            <span class="num">1.6</span>
            <p>
              В рамках настоящего Соглашения допускается внесение цифровых токенов на криптовалютный кошелек
              Управляющего.
              Возврат объектов управления или процентов по ним осуществляются в цифровых токенах. Передача цифровых
              активов
              в доверительное управление не влечет перехода права собственности на них к Управляющему.
            </p>
          </div>
          <div class="is-flex mb-3 has-text-weight-light is-size-7">
            <span class="num">1.7</span>
            <p>
              Передача в доверительное управление цифровых активов осуществляется Инвестором путем
              перечисления цифровых
              активов на кошелек Управляющего. Днем передачи цифровых активов Инвестора в доверительное управление
              считается
              день их поступления на кошелек Управляющего.
            </p>
          </div>
          <div class="is-flex mb-3 has-text-weight-light is-size-7">
            <span class="num">1.8</span>
            <p>
              Перечисления начисленных процентов на суммы переданных в управление средств («тела депозита»)
              происходит за
              каждый квартал (первый квартал 15-20 апреля, второй квартал 15-20 июля, третий квартал 15-20
              октября,
              четвертый
              квартал 15-20 января), за исключением выходных и праздничных дней.
            </p>
          </div>
          <div class="is-flex mb-6 has-text-weight-light is-size-7">
            <span class="num">1.9</span>
            <p>
              Выгодоприобретателем по Договору является Инвестор.
            </p>
          </div>

          <div class="is-flex mb-4 has-text-weight-light is-size-7">
            <span class="num">2</span>
            <p>
              ПРАВА И ОБЯЗАННОСТИ СТОРОН
            </p>
          </div>
          <div class="is-flex mb-3 has-text-weight-light is-size-7">
            <span class="num">2.1</span>
            <p>
              Права и обязанности Управляющего:
            </p>
          </div>
          <div class="is-flex mb-3 has-text-weight-light is-size-7">
            <span class="num">2.1.1</span>
            <p>
              Использовать переданные Инвестором в управление средства исключительно в целях извлечения
              в
              пользу Инвестора
              спекулятивной прибыли, управляя средствами путем совершения сделок купли-продажи на
              биржевом рынке с целевой
              доходностью согласно условиям тарифного плана. Действовать добросовестно и тем способом,
              который является
              наилучшим для интересов Инвестора.
            </p>
          </div>
          <div class="is-flex mb-3 has-text-weight-light is-size-7">
            <span class="num">2.1.2</span>
            <p>
              В случае наступления форс-мажорных обстоятельств Управляющий вправе менять (повышать или
              снижать) процент
              прибыли, заявленный согласно тарифному плану, уведомив другую Сторону в срок не менее,
              чем за 30 календарных
              дней.
            </p>
          </div>
          <div class="is-flex mb-3 has-text-weight-light is-size-7">
            <span class="num">2.1.3</span>
            <p>
              Управляющий вправе изменять данное «Соглашение», «Ограничение отвественности» и
              «Регламент
              ввода/вывода
              средств», без обязательства уведомления клиента о внесенных изменениях в
              вышеупомянутые документы.
            </p>
          </div>
          <div class="is-flex mb-3 has-text-weight-light is-size-7">
            <span class="num">2.2</span>
            <p>
              Права и обязанности Инвестора:
            </p>
          </div>
          <div class="is-flex mb-3 has-text-weight-light is-size-7">
            <span class="num">2.2.1</span>
            <p>
              Инвестор обязан принять условия тарифного плана, в том числе предусмотренные им
              регламент
              ввода/вывода цифровых
              активов.
            </p>
          </div>
          <div class="is-flex mb-3 has-text-weight-light is-size-7">
            <span class="num">2.2.2</span>
            <p>
              Инвестор не праве вмешиваться в деятельность управляющего по Доверительному
              управлению активами.
            </p>
          </div>
          <div class="is-flex mb-3 has-text-weight-light is-size-7">
            <span class="num">2.2.3</span>
            <p>
              Инвестор обязуется фиксировать полученную путем вывода или реинвестирования
              всего объема
              полученной прибыли в
              срок до 3-х календарных лет с даты открытого депозита. В противном случае
              итоговый баланс (итоговая сумма
              депозита и ежеквартальных выплат) будет списан со счета Инвестора в пользу
              Компании.
            </p>
          </div>
          <div class="is-flex mb-3 has-text-weight-light is-size-7">
            <span class="num">2.2.4</span>
            <p>
              Инвестор обязуется по истечении полного срока работы депозита произвести
              вывод тела депозита,
              нажав «вывод тела
              депозита». В противном случае, во избежание риска потери средств инвестором
              Управляющий автоматически продлит
              срок работы депозита на период следующих 12 месяцев (или на период,
              установленный тарифным планом).
            </p>
          </div>
          <div class="is-flex mb-3 has-text-weight-light is-size-7">
            <span class="num">2.2.5</span>
            <p>
              Инвестор несет ответственность за уплату всех налоговых обязательств
              (налог на доходы физических
              лиц), Инвестор
              обязан исполнять (исчислять и уплачивать) все выплаты самостоятельно.
              Ответственность за неисполнение
              (ненадлежащее исполнение) налоговых обязательств Инвестор несет
              самостоятельно.
            </p>
          </div>
          <div class="is-flex mb-3 has-text-weight-light is-size-7">
            <span class="num">2.2.6</span>
            <p>
              Инвестор подтверждает, что он уведомлен о возможных рисках по ведению
              спекулятивных сделок с
              цифровыми активами.
            </p>
          </div>
        </div>
      </div>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  name: 'signup',
  layout: 'auth',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  middleware: ['userRedirect'],
  data() {
    return {
      data: {
        email: '',
        first_name: '',
        last_name: '',
        telegram: '',
        ethereum_wallet: '',
        password: '',
        repeat_password: '',
        referral_id: ''
      },
      acceptedConditions: false,
      lockReferralIdInput: false,
      loading: false
    }
  },
  methods: {
    async signup() {
      if (!this.acceptedConditions) {
        this.$buefy.toast.open({
          message: 'You have to confirm terms of the agreement',
          type: 'is-warning'
        })
        return false
      }
      if (!this.data.referral_id) {
        this.$buefy.dialog.alert({
          message: `Требуется реферальный код. Если вы впервые на сайте, обратитесь в службу <a href="https://t.me/Neutrino_NTS_RU">поддержки</a>`,
          confirmText: 'Ok!'
        })
        return false
      }
      this.loading = true
      let resp = await this.$store.dispatch('signUp', this.data)
      if (resp === null) {
        this.$buefy.toast.open({
          message: 'Successfully registered! Please check your email to verify your account',
          type: 'is-success',
          duration: 5000
        })
        this.$router.push('/')
      } else {
        resp.map(el => {
          this.$buefy.toast.open({ message: el.message, type: 'is-danger' })
        })
        this.loading = false
        return false
      }
    }
  },
  computed: {
    modalMessage() {
      return this.$t('modalMessage')
    }
  },
  mounted() {
    let idFromCookies = this.$cookies.get('referral_id')
    if (this.$route.query.referral) {
      this.$cookies.set('referral_id', this.$route.query.referral, {
        maxAge: 60 * 60 * 24 * 365
      })
      this.data.referral_id = this.$route.query.referral
      this.lockReferralIdInput = true
    } else if (idFromCookies) {
      this.data.referral_id = idFromCookies
      this.lockReferralIdInput = true
    }
  }
}
</script>

<style lang="scss" scoped>
.terms {
  .num {
    width: 50px;
    flex-shrink: 0;
  }

  p {
    max-width: 810px;
  }
}
.left-link {
  line-height: 80px;
}
</style>
