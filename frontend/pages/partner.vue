<template>
	<div>
		<custom-slider
			:activeDot="4"
			:dots="4"
			prev-page="/dividends"
			next-page="/profile"
		>
			<template slot="content">
				<div class="columns">
					<div class="column">
						<div class="is-size-5 mb-4">
							Получите 9%, 3% или 2%<br/> с каждого депозита внесенного по вашей ссылке.
						</div>
						<p class="is-size-7 has-text-grey mb-4">
							Поделитесь вашей партнерской ссылкой в своих соцсетях и с каждого, кто пройдет по ней и зарегистрируется,
							пополнив депозит, вы получите бонус 9%. Трехуровневая система строится таким образом, что если ваш
							приглашенный ранее партнер решит также, как и вы, принять участие в реферальной программе и пригласит
							человека по своей ссылке, вы получите бонус в размере 3%. Третья линия подразумевает получение вами 2% по
							аналогии.
						</p>
						<p class="is-size-7 has-text-grey mb-6">
							Партнерская программа выступает одним из основных способов продвижения инвестиционных продуктов Фонда.
							Данный способ продвижения выбран в целях создания наибольшей лояльности к продуктам Фонда и создания
							заинтересованного, участного комьюнити. Ваш процент по депозиту не зависит от партнерской программы и
							является фиксированным обозначенным процентом. Вы можете как участвовать в реферальной программе, так и не
							участвовать в ней.
						</p>
						<input
							class="is-size-5 input"
							type="text"
							readonly
							ref="reflink"
							:value="referralLink"
							@keydown="onlyCtrlC"
						/>
					</div>
				</div>
				<div class="columns mt-auto">
					<div class="column is-12-mobile is-6-desktop">
						<div>
							<div class="is-size-7 mb-1">Скачайте или поделитесь расчетом:</div>
							<div class="is-flex">
								<ShareNetwork
									v-for="link in socialLinks"
									:network="link.name"
									:key="link.name"
									:url="baseUrl()"
									title="Реферальная ссылка"
									:description="referralLink"
								>
									<div
										class="social-link mr-4"
									><img
										:src="require(`~/static/${link.icon}`)"
										:alt="link.name"
									/>
									</div>
								</ShareNetwork>
							</div>
						</div>
					</div>
					<div class="column is-12-mobile is-6-desktop">
						<custom-button
							@click.native="copy"
							class="is-fullwidth"
						>
							Копировать ссылку
						</custom-button>
					</div>
				</div>
			</template>
		</custom-slider>
		<partners-table/>
	</div>

</template>

<script>
import {mapGetters} from 'vuex'
import PartnersTable from '~/components/tables/PartnersTable'
import {mainSliderController} from "@/utils/slider";

export default {
	name: 'partner',
	layout: 'profile',
	middleware: ['authRequired', 'contracts'],
	transition: mainSliderController,
	components: {
		PartnersTable
	},
	async asyncData({store}) {
		if (store.getters.partners.length === 0) {
			await store.dispatch('fetchPartners')
		}
	},
	computed: {
		...mapGetters(['referralLink']),
	},
	data: () => ({
		isDepositOpen: true,
		loading: {
			referralLink: false,
		},
		socialLinks: [
			{name: 'twitter', icon: 'twitter.svg', path: '/'},
			{name: 'facebook', icon: 'fb.svg', path: '/'},
			{name: 'vk', icon: 'vk.svg', path: '/'},
			{name: 'telegram', icon: 'telegram.svg', path: '/'},
		]
	}),
	methods: {
		onlyCtrlC(e) {
			this.focusInput(e)
			if (e.key.toLowerCase() === 'c' && e.ctrlKey) {
				this.$buefy.toast.open({message: 'Copied to clipboard', type: 'is-primary', queue: false})
				return
			}
			e.preventDefault()
		},
		focusInput(e) {
			e.target.select()
		},
		copy() {
			this.$refs.reflink.select()
			document.execCommand('copy')
			this.$buefy.toast.open({
				message: 'Ссылка скопирована',
				type: 'is-success',
				duration: 5000
			})
		},
		baseUrl() {
			const getUrl = window.location
			return getUrl.protocol + '//' + getUrl.host + '/' + getUrl.pathname.split('/')[1]
		}
	},
	async mounted() {
		if (!this.referralLink) {
			this.loading.referralLink = true
			await this.$store.dispatch('fetchReferralLink')
			this.loading.referralLink = false
		}
	},
}
</script>

<style
	lang="scss"
	scoped
>
@import "~@/assets/scss/transitions/slide-fade.scss";

.social-link {
	display: flex;
	width: 32px;
	height: 32px;

	img {
		max-width: 100%;
		max-height: 100%;
	}
}
</style>
