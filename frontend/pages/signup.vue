<template>
	<div>
		<ValidationObserver v-slot="{ invalid }">
			<custom-slider :activeDot="1" :dots="2" :next-page="localePath('/')" :prev-page="localePath('/')">
				<template slot="content">
					<div class="columns is-fullheight">
						<div class="column pt-0 pb-0 is-half is-flex flex-column is-justify-content-space-between">
							<div class="is-size-5 mb-20">
								{{ $t('Регистрация в системе') }}
							</div>
							<div class="mb-20">
								<ValidationProvider rules="required|email" name="Email" slim="slim" v-slot="{ errors, valid }">
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
										@input="handleBlur"
									/>
								</ValidationProvider>

								<ValidationProvider rules="required" name="Telegram" slim="slim" v-slot="{ errors, valid }">
									<base-input
										size="6"
										label="Telegram:"
										type="text"
										placeholder="@nickname"
										class="mb-20"
										:is-danger="!!errors[0]"
										:is-success="!!valid"
										:error="errors[0]"
										has-icon
										v-model="data.telegram"
										@input="handleBlur"
									/>
								</ValidationProvider>

								<base-input
									size="6"
									label="Ethereum wallet:"
									type="text"
									class="mb-20"
									placeholder="0x..."
									v-model="data.ethereum_wallet"
									@input="handleBlur"
								/>

								<ValidationProvider
									rules="required"
									name="First Name"
									slim="slim"
									v-slot="{ errors, valid }"
									@input="handleBlur"
								>
									<base-input
										size="6"
										:label="`${$t('firstName')}:`"
										type="text"
										placeholder="first"
										class="mb-20"
										:is-danger="!!errors[0]"
										:is-success="!!valid"
										:error="errors[0]"
										has-icon
										v-model="data.first_name"
										@input="handleBlur"
									/>
								</ValidationProvider>

								<ValidationProvider rules="required" name="Last Name" slim="slim" v-slot="{ errors, valid }">
									<base-input
										size="6"
										:label="`${$t('lastName')}:`"
										type="text"
										placeholder="last"
										class="mb-20"
										:is-danger="!!errors[0]"
										:is-success="!!valid"
										:error="errors[0]"
										has-icon
										v-model="data.last_name"
										@input="handleBlur"
									/>
								</ValidationProvider>

								<ValidationProvider
									rules="required|min:8"
									vid="confirmation"
									name="password"
									slim="slim"
									v-slot="{ errors, valid }"
								>
									<base-input
										size="6"
										:label="$t('password')"
										type="password"
										placeholder="password"
										v-model="data.password"
										class="mb-20"
										:is-danger="!!errors[0]"
										:is-success="!!valid"
										:error="errors[0]"
										has-icon
										@input="handleBlur"
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
										:label="$t('Подтвердите пароль')"
										type="password"
										placeholder="confirm password"
										class="mb-20"
										:is-danger="!!errors[0]"
										:is-success="!!valid"
										:error="errors[0]"
										has-icon
										v-model="data.repeat_password"
										@input="handleBlur"
									/>
								</ValidationProvider>

								<base-input
									size="6"
									label="Referral ID"
									type="text"
									placeholder="Referral ID"
									v-model="data.referral_id"
									:disabled="lockReferralIdInput"
									@input="handleBlur"
								/>
							</div>
							<div class="left-link">
								<b-checkbox v-model="acceptedConditions" @change.native="handleBlur">
									{{ $t('Я принимаю') }}
									<a href="#" @click="$store.commit('toggleTermsModal', true)">
										{{ $t('политику конфиденциальности') }}
									</a>
								</b-checkbox>
							</div>
						</div>
						<div class="column pt-0 pb-0 is-half is-flex is-flex-direction-column is-justify-content-space-between">
							<div class="auth-image">
								<img :src="status_image" :class="animate_class" />
							</div>
							<custom-button :disabled="invalid || !acceptedConditions" @click.native="signup">
								{{ $t('Зарегистрироваться') }}
							</custom-button>
						</div>
					</div>
				</template>
			</custom-slider>
			<div class="container">
				<div class="sh-privacy">
					<h1>{{ $t('Политика конфиденциальности SCHUTZ') }}</h1>

					<privacy-policy-body />
				</div>
			</div>
		</ValidationObserver>
		<b-modal :active.sync="terms" has-modal-card>
			<privacy-policy @accepted="acceptedConditions = $event"></privacy-policy>
		</b-modal>
	</div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import PrivacyPolicy from '@/components/modals/PrivacyPolicyModal'
import { authSliderController } from '@/utils/slider'
import PrivacyPolicyBody from '@/components/content/PrivacyPolicy'

export default {
	name: 'signup',
	layout: 'auth',
	components: {
		ValidationObserver,
		ValidationProvider,
		PrivacyPolicy,
		PrivacyPolicyBody,
	},
	transition: authSliderController,
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
				referral_id: '',
			},
			acceptedConditions: false,
			lockReferralIdInput: false,
			loading: false,
			status_image: '/registration.svg',
			animate_class: '',
		}
	},
	methods: {
		handleBlur() {
			if (
				this.data.email &&
				this.data.first_name &&
				this.data.last_name &&
				this.data.telegram &&
				this.data.ethereum_wallet &&
				this.data.password &&
				this.data.password === this.data.repeat_password &&
				this.data.referral_id &&
				this.acceptedConditions
			) {
				if (this.status_image != '/registration_success.svg') {
					this.animate_class = 'pulse'
					this.status_image = '/registration_success.svg'
					setTimeout(() => {
						this.animate_class = ''
					}, 1000)
				}
			} else {
				if (this.status_image != '/registration.svg') {
					this.animate_class = 'pulse'
					this.status_image = '/registration.svg'
					setTimeout(() => {
						this.animate_class = ''
					}, 1000)
				}
			}
		},

		failAnimate() {
			this.animate_class = 'shake'
			this.status_image = '/registration_failure.svg'
			setTimeout(() => {
				this.animate_class = ''
			}, 1000)
		},
		async signup() {
			if (!this.acceptedConditions) {
				this.$buefy.toast.open({
					message: 'You have to confirm terms of the agreement',
					type: 'is-warning',
				})
				return false
			}
			if (!this.data.referral_id) {
				this.$buefy.dialog.alert({
					message: `Требуется реферальный код. Если вы впервые на сайте, обратитесь в службу <a href="https://t.me/Neutrino_NTS_RU">поддержки</a>`,
					confirmText: 'Ok!',
				})
				return false
			}
			this.loading = true
			let resp = await this.$store.dispatch('signUp', this.data)
			if (resp === null) {
				this.$buefy.toast.open({
					message: 'Successfully registered! Please check your email to verify your account',
					type: 'is-success',
					duration: 5000,
				})
				this.$router.push('/')
			} else {
				this.failAnimate()
				resp.map((el) => {
					this.$buefy.toast.open({
						message: el.message,
						type: 'is-danger',
					})
				})
				this.loading = false

				return false
			}
		},
	},

	watch: {
		data(newValue, oldValue) {},
	},

	computed: {
		getImage() {
			if (
				this.data.email &&
				this.data.first_name &&
				this.data.last_name &&
				this.data.telegram &&
				this.data.ethereum_wallet &&
				this.data.password &&
				this.data.password === this.data.repeat_password &&
				this.data.referral_id &&
				this.acceptedConditions
			) {
				this.animate_class = 'flipInX'
				setTimeout(() => {
					this.animate_class = ''
				}, 1000)
				return (this.status_image = '/registration_success.svg')
			} else {
				this.status_image = '/registration.svg'
				return false
			}
		},
		modalMessage() {
			return this.$t('modalMessage')
		},
		terms: {
			get() {
				return this.$store.state.terms_modal
			},
			set(newValue) {
				this.$store.commit('toggleTermsModal', newValue)
			},
		},
		ethAddress() {
			return this.$store.getters['metamask/ethAddress'] ? `«${this.$store.getters['metamask/ethAddress']}»` : ''
		},
	},
	mounted() {
		this.getImage
		let idFromCookies = this.$cookies.get('referral_id')
		if (this.$route.query.referral) {
			this.$cookies.set('referral_id', this.$route.query.referral, {
				maxAge: 60 * 60 * 24 * 365,
				path: '/',
				domain: this.$domainForCookie(),
			})
			this.data.referral_id = this.$route.query.referral
			this.lockReferralIdInput = true
		} else if (idFromCookies) {
			this.data.referral_id = idFromCookies
			this.lockReferralIdInput = true
		}
	},
}
</script>

<style lang="scss">
@import '~@/assets/scss/transitions/slide-fade.scss';
.sh-privacy {
	margin-bottom: 50px;

	h1 {
		font-weight: normal;
		font-size: 24px;
		line-height: 120%;
		color: #fad896;
		margin-bottom: 20px;
	}
	p {
		font-style: normal;
		font-weight: 300;
		font-size: 14px;
		line-height: 19px;
		color: #ffffff;
		margin-top: 15px;
		font-weight: 300;
	}
	h3 {
		font-weight: 300;
		text-transform: uppercase;
		margin-top: 25px;
		font-style: 14px;
		margin-bottom: 0;
	}
}
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
