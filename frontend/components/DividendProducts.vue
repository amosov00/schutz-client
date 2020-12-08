<template>
	<div>
		<custom-slider :activeDot="3" :dots="4" next-page="/partner" prev-page="/investment">
			<template slot="content">
				<div class="columns is-fullheight">
					<div
						class="column is-half is-flex is-flex-direction-column"
					>
						<div class="is-size-5 mb-5">
							Выводите<br/>
							или реинвестируйте<br/>
							полученные дивиденды
						</div>
						<div class="is-size-4">Доступно USDT:</div>
						<div class="is-size-2 mb-5">
							{{ formatCurrency(totalDividends) }}
						</div>
						<div class="is-size-7 mb-5 has-text-grey mt-auto">
							Ближайшие дивиденды поступят<br/>
							15 января, 2021
						</div>
					</div>
					<div
						class="column is-half is-flex is-flex-direction-column "
					>
						<div>
							<div class="is-size-7 ethereum">
								Ethereum адрес:
							</div>
							<div class="mb-5 ethereum-address">
								<span v-if="user.ethereum_wallet">{{
										user.ethereum_wallet
									}}</span>
								<a
									v-else
									@click="isWalletModalActive = true"
									class="value has-text-link has-text-weight-light"
								>
									Добавить кошелек
								</a>
							</div>
							<div class="is-flex mb-3 is-align-items-center">
								<div
									:class="[isConnected ? 'status-online' : 'status-offline']"
									class="is-size-4 status mr-5"
								>
									{{ isConnected ? "Online" : "Offline" }}
								</div>
								<div class="is-size-6">
									Gas price (fast): {{ gasPrice }}
								</div>
							</div>
							<div
								v-if="isConnected"
								class="is-size-7 has-text-grey"
							>
								Кошелек готов к работе.
							</div>
							<div
								v-else-if="!user.ethereum_wallet"
								class="is-size-7 status-offline"
							>
								Добавьте кошелек
							</div>
							<div v-else class="is-size-7 status-offline">
								Выберите этот кошелек в вашем MetaMask.
							</div>
						</div>
						<custom-button
							:disabled="!totalDividends || !user.ethereum_wallet || !isConnected"
							@click.native="withdrawModalActive = true"
							class="mt-auto mb-2"
						>
							Вывести
						</custom-button>
						<custom-button
							:disabled="!totalDividends || !user.ethereum_wallet || !isConnected"
							@click.native="reinvestModalActive = true"
						>
							Реинвестировать
						</custom-button>
					</div>
				</div>
			</template>
		</custom-slider>
		<b-modal :active.sync="withdrawModalActive" has-modal-card>
			<withdraw-modal/>
		</b-modal>
		<b-modal :active.sync="reinvestModalActive" has-modal-card>
			<reinvest-modal/>
		</b-modal>
	</div>
</template>

<script>
import formatCurrency from "~/mixins/formatCurrency";
import {mapGetters} from "vuex";
import WithdrawModal from "./modals/WithdrawModal";
import ReinvestModal from "./modals/ReinvestModal";

export default {
	name: "DividendProducts",
	components: {ReinvestModal, WithdrawModal},
	mixins: [formatCurrency],

	async created() {
		if (!this.$store.state.metamask.gasPrice) {
			await this.$store.dispatch("metamask/getGasPrice");
		}
	},

	methods: {
		withdraw() {
			this.$store.dispatch("dividends/withdraw");
		},
		reinvest() {
			this.$store.dispatch("dividends/reinvest");
		}
	},
	data: () => ({
		withdrawModalActive: false,
		reinvestModalActive: false
	}),
	computed: {
		...mapGetters(["user"]),
		...mapGetters("metamask", ["isConnected", "gasPrice"]),
		...mapGetters("deposit", ["totalDeposit", "totalDividends"]),
	}
};
</script>

<style lang="scss" scoped>
.ethereum-address {
	font-size: 14px;
	line-height: 19px;
	font-weight: bold;
}

.ethereum {
	padding-top: 120px;
	position: relative;

	&::before {
		content: "";
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		width: 60px;
		height: 55.33px;
		background-image: url("data:image/svg+xml,%3Csvg width='62' height='57' viewBox='0 0 62 57' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M58.0116 1L34.5999 18.2975L38.9293 8.09222L58.0116 1Z' fill='%23E2761B' stroke='%23E2761B' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M3.9646 1L27.1881 18.4614L23.0705 8.09222L3.9646 1Z' fill='%23E4761B' stroke='%23E4761B' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M49.5883 41.0957L43.353 50.5988L56.6942 54.2503L60.5295 41.3064L49.5883 41.0957Z' fill='%23E4761B' stroke='%23E4761B' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M1.49414 41.3064L5.3059 54.2503L18.6471 50.5988L12.4118 41.0957L1.49414 41.3064Z' fill='%23E4761B' stroke='%23E4761B' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M17.8942 25.0383L14.1765 30.6325L27.4236 31.2177L26.953 17.0566L17.8942 25.0383Z' fill='%23E4761B' stroke='%23E4761B' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M44.0824 25.0391L34.906 16.8936L34.6001 31.2184L47.8236 30.6333L44.0824 25.0391Z' fill='%23E4761B' stroke='%23E4761B' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M18.647 50.5992L26.5999 46.7371L19.7293 41.4004L18.647 50.5992Z' fill='%23E4761B' stroke='%23E4761B' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M35.3765 46.7371L43.3529 50.5992L42.2471 41.4004L35.3765 46.7371Z' fill='%23E4761B' stroke='%23E4761B' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M43.3529 50.5984L35.3765 46.7363L36.0118 51.9092L35.9412 54.086L43.3529 50.5984Z' fill='%23D7C1B3' stroke='%23D7C1B3' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M18.647 50.5984L26.0587 54.086L26.0117 51.9092L26.5999 46.7363L18.647 50.5984Z' fill='%23D7C1B3' stroke='%23D7C1B3' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M26.1766 37.9829L19.5413 36.0402L24.2236 33.9102L26.1766 37.9829Z' fill='%23233447' stroke='%23233447' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M35.7998 37.9829L37.7527 33.9102L42.4586 36.0402L35.7998 37.9829Z' fill='%23233447' stroke='%23233447' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M18.6469 50.5988L19.7763 41.0957L12.4116 41.3064L18.6469 50.5988Z' fill='%23CD6116' stroke='%23CD6116' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M42.2234 41.0957L43.3528 50.5988L49.5881 41.3064L42.2234 41.0957Z' fill='%23CD6116' stroke='%23CD6116' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M47.8234 30.6328L34.5999 31.218L35.8234 37.9825L37.7763 33.9097L42.4822 36.0397L47.8234 30.6328Z' fill='%23CD6116' stroke='%23CD6116' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M19.541 36.0397L24.2469 33.9097L26.1763 37.9825L27.4233 31.218L14.1763 30.6328L19.541 36.0397Z' fill='%23CD6116' stroke='%23CD6116' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M14.1765 30.6328L19.7295 41.3999L19.5412 36.0397L14.1765 30.6328Z' fill='%23E4751F' stroke='%23E4751F' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M42.4826 36.0397L42.2473 41.3999L47.8238 30.6328L42.4826 36.0397Z' fill='%23E4751F' stroke='%23E4751F' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M27.4236 31.2178L26.1765 37.9823L27.7295 45.964L28.0824 35.4544L27.4236 31.2178Z' fill='%23E4751F' stroke='%23E4751F' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M34.5999 31.2178L33.9646 35.431L34.247 45.964L35.8234 37.9823L34.5999 31.2178Z' fill='%23E4751F' stroke='%23E4751F' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M35.8235 37.9828L34.2471 45.9645L35.3765 46.7369L42.2471 41.4002L42.4824 36.04L35.8235 37.9828Z' fill='%23F6851B' stroke='%23F6851B' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M19.5413 36.04L19.7295 41.4002L26.6001 46.7369L27.7295 45.9645L26.1766 37.9828L19.5413 36.04Z' fill='%23F6851B' stroke='%23F6851B' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M35.9411 54.0862L36.0117 51.9094L35.4234 51.3945H26.5529L26.0117 51.9094L26.0587 54.0862L18.647 50.5986L21.2352 52.7052L26.4823 56.3333H35.494L40.7646 52.7052L43.3529 50.5986L35.9411 54.0862Z' fill='%23C0AD9E' stroke='%23C0AD9E' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M35.3764 46.7363L34.247 45.9639H27.7294L26.6 46.7363L26.0117 51.9092L26.5529 51.3942H35.4235L36.0117 51.9092L35.3764 46.7363Z' fill='%23161616' stroke='%23161616' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M59.0002 19.421L61.0002 9.87113L58.012 1L35.3767 17.7124L44.0826 25.0386L56.3885 28.6199L59.1179 25.46L57.9414 24.6173L59.8238 22.9086L58.365 21.7851L60.2473 20.3573L59.0002 19.421Z' fill='%23763D16' stroke='%23763D16' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M1 9.87113L3 19.421L1.72941 20.3573L3.61177 21.7851L2.17647 22.9086L4.05882 24.6173L2.88235 25.46L5.58824 28.6199L17.8941 25.0386L26.6 17.7124L3.96471 1L1 9.87113Z' fill='%23763D16' stroke='%23763D16' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M56.3882 28.6203L44.0824 25.0391L47.8235 30.6333L42.2471 41.4003L49.5882 41.3067H60.5294L56.3882 28.6203Z' fill='%23F6851B' stroke='%23F6851B' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M17.8941 25.0391L5.58826 28.6203L1.49414 41.3067H12.4118L19.7294 41.4003L14.1765 30.6333L17.8941 25.0391Z' fill='%23F6851B' stroke='%23F6851B' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M34.6 31.2176L35.3764 17.7119L38.9529 8.0918H23.0706L26.6 17.7119L27.4235 31.2176L27.7059 35.4776L27.7294 45.9638H34.247L34.2941 35.4776L34.6 31.2176Z' fill='%23F6851B' stroke='%23F6851B' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
		background-position: left top;
		background-repeat: no-repeat;
		background-size: contain;
	}
}

.status {
	display: flex;
	align-items: center;
	text-transform: capitalize;

	&:before {
		content: "";
		position: relative;
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background-color: #919191;
		display: block;
		margin-right: 6px;
	}

	&-offline {
		color: #d60d0d;

		&:before {
			background-color: #d60d0d;
		}
	}

	&-online {
		color: #00c236;

		&:before {
			background-color: #00c236;
		}
	}
}
</style>
