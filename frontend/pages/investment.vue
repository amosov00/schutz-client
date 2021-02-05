<template>
	<div>
		<custom-slider
			:activeDot="2"
			:dots="4"
			:next-page="localePath('/dividends')"
			:prev-page="localePath('/profile')"
		>
			<template slot="content">
				<div class="columns">
					<div class="column is-half">
						<div>
							<div class="is-size-5 mb-5" v-html="$t('investmentTitle')"></div>
							<div class="mb-5 calc">
								<div class="is-size-7 mb-2 has-text-grey">
									{{ $t("Укажите сумму вклада в USDT") }}
								</div>
								<base-input
									v-model="input"
									type="number"
									size="4"
									:max="999999"
									:maxLength="8"
									onlyNumber
								/>
							</div>
							<div class="mb-5">
								<div class="is-size-7">{{ $t("ваш доход составит:") }}</div>
								<div class="is-size-2">
									{{ Math.round(profit) }}
								</div>
							</div>
							<div class="mb-5">
								<div class="is-size-7">
									{{ $t("с учетом реинвестирования:") }}
								</div>
								<div class="is-size-1">
									{{ Math.round(reinvest) }}
								</div>
							</div>
							<div>
								<div class="is-size-7 mb-4 has-text-grey">
									{{ $t("Вклад будет доступен к выводу") }} <br/>
									{{ $t("после") }} {{ getWithdrawDate }}
								</div>
							</div>
						</div>
					</div>
					<div class="column is-half is-flex is-flex-direction-column ">
						<div>
							<div class="is-size-4">{{ $t("Вклад USDT") }}:</div>
							<div class="is-size-2 mb-5">
								{{ formatCurrency(tokenBalance) }}
							</div>
							<div class="is-size-7 ethereum">{{ $t("Ethereum адрес") }}:</div>
							<div class="ethereum-address mb-5">
								<span v-if="user.ethereum_wallet">{{ user.ethereum_wallet }}</span>
								<a
									v-else
									@click="isWalletModalActive = true"
									class="value has-text-link has-text-weight-light"
								>
									{{ $t("Добавить кошелек") }}
								</a>
							</div>
							<div class="is-flex mb-3 is-align-items-center">
								<div
									:class="`status-${mode}`"
									class="is-size-4 status mr-5"
								>
									{{ mode }}
								</div>
								<div class="is-size-6">Gas price (fast): {{ gasPrice }}</div>
							</div>
							<div v-if="mode === metamaskState.ONLINE" class="is-size-7 has-text-grey">
								<span v-if="allowance === 0">{{ $t('walletOnlineApprove') }}</span>
								<span v-else>{{ $t('walletOnline') }}</span>

							</div>
							<div v-else-if="mode === metamaskState.WAITING" class="is-size-7 status-offline">
								{{ $t('walletWaiting') }}
							</div>
							<div v-else-if="mode === metamaskState.OFFLINE" class="is-size-7 status-offline">
								{{ $t('walletOffline') }}
							</div>
						</div>
						<custom-button
							v-if="!isMetamaskInstalled"
							@click.native="isMetaMaskInstallModalActive = true"
							class="mt-auto"
						>
							{{ $t("Авторизовать кошлек") }}
						</custom-button>
						<custom-button
							v-else-if="isMetamaskInstalled && allowance === 0"
							@click.native="allowUSDT"
							class="mt-auto"
							:disabled="!metamaskActionsAreAllowed"
						>
							{{ $t("Одобрить USDT") }}
						</custom-button>
						<custom-button
							v-else-if="isMetamaskInstalled && tokenBalance > 0"
							@click.native="isAddFundsModalActive = true"
							class="mt-auto"
							:disabled="!metamaskActionsAreAllowed"
						>
							{{ $t("Пополнить депозит") }}
						</custom-button>
						<custom-button
							v-else
							@click.native="isAddFundsModalActive = true"
							class="mt-auto"
							:disabled="!metamaskActionsAreAllowed"
						>
							{{ $t("Открыть вклад") }}
						</custom-button>
					</div>
				</div>
			</template>
		</custom-slider>
		<div class="container">
			<div class="level">
				<div class="level-left page-title">
					{{ $t("История транзакций") }}
				</div>
			</div>
			<b-table
				:data="filteredData"
				v-if="filteredData.length"
				pagination-position="bottom"
				class="custom-table mb-4"
				:default-sort="['args.timestamp', 'asc']"
			>
				<template slot-scope="props">
					<b-table-column
						field="args.timestamp"
						:label="$t('Дата и время')"
						sortable
						:custom-sort="sortByDate"
						width="20%"
					>
						{{ timestampToDateTime(props.row.args.timestamp) }}
					</b-table-column>
					<b-table-column
						sortable
						field="event"
						:label="$t('Событие')"
						width="20%"
						:custom-sort="sortByEvent"
					>
						<span class="text-nowrap">{{ $t(props.row.event) }}</span>
						<span class="tag is-link" v-if="props.row.isReinvested">
							{{ $t("Реинвестиция") }}
						</span>
					</b-table-column>
					<b-table-column
						class="has-text-primary overflow-reset"
						field="txHash"
						:label="$t('Хэш')"
						width="20%"
					>
						<b-tooltip
							class="w-100"
							:label="props.row.transactionHash"
							type="is-black"
							position="is-bottom"
						>
							<a
								:href="'https://etherscan.io/tx/' + props.row.transactionHash"
								target="_blank"
								class="is-flex"
							>
								{{ hashSlice(props.row.transactionHash) }}
							</a>
						</b-tooltip>
					</b-table-column>
					<b-table-column
						field="contract"
						:label="$t('Контракт')"
						header-class="right-align"
						cell-class="text-right"
						width="20%"
						sortable
						:custom-sort="sortByContract"
					>
						{{ props.row.contract }}
					</b-table-column>
					<b-table-column
						field="args.USDT"
						:label="$t('Сумма, USDT')"
						cell-class="text-right"
						header-class="has-text-right"
						width="10%"
						align="right"
						sortable
						:custom-sort="sortByAmount"
					>
						{{ formatCurrency(props.row.args.USDT, "usdt") }}
					</b-table-column>
				</template>
			</b-table>

			<div class="center mb-6">
				<button
					v-if="!hide_button"
					type="button"
					@click="showMore()"
					class="default-button"
				>
					{{ $t("показать еще") }}
				</button>
			</div>
			<div class="is-size-5 has-background-info total-withdraw mb-6">
				<div v-for="(total, k) in totals" :key="k">
					{{ $t(k) }}: {{ `${formatCurrency(total, "usdt")}` }} USDT
				</div>
			</div>
		</div>
		<b-modal :active.sync="isWalletModalActive" has-modal-card>
			<add-new-wallet-modal></add-new-wallet-modal>
		</b-modal>
		<b-modal :active.sync="isMetaMaskInstallModalActive" has-modal-card>
			<install-meta-mask-modal/>
		</b-modal>
		<b-modal :active.sync="isAddFundsModalActive" has-modal-card>
			<AddFundsModal :preparedData="input" has-modal-card/>
		</b-modal>
	</div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import formatDate from "~/mixins/formatDate";
import AddFundsModal from "../components/modals/AddFundsModal";
import formatCurrency from "~/mixins/formatCurrency";
import formatText from "~/mixins/formatText";
import moment from "moment";
import gsap from "gsap";
import AddNewWalletModal from "../components/modals/AddNewWalletModal";
import InstallMetaMaskModal from "../components/modals/installMetaMaskModal";
import {mainSliderController} from "@/utils/slider";
import {METAMASK_STATE} from "~/consts";

export default {
	name: "investment",
	layout: "profile",
	middleware: ["authRequired"],
	mixins: [formatDate, formatCurrency, formatText],
	transition: mainSliderController,
	components: {
		InstallMetaMaskModal,
		AddNewWalletModal,
		AddFundsModal
	},

	async created() {
		if (!this.$store.state.metamask.gasPrice) {
			await this.$store.dispatch("metamask/getGasPrice");
		}
	},
	watch: {
		input: {
			handler(newVal) {
				this.animateNumbers(newVal);
			},
			immediate: true
		}
	},
	computed: {
		...mapGetters(["user", "txTotals"]),
		...mapGetters("metamask", ["gasPrice", "isConnected", "mode"]),
		...mapGetters("userContractIntegration", [
			"depositBalance",
			"allowance",
			"tokenBalance"
		]),
		isMetamaskInstalled() {
			return this.isConnected && this.user.ethereum_wallet
		},
		metamaskActionsAreAllowed() {
			return this.user.ethereum_wallet && this.mode === METAMASK_STATE.ONLINE
		},
		tableData() {
			return this.$store.getters.transactions.transactions !== null
				? this.$store.getters.transactions.transactions
				: [];
		},
		filteredData() {
			let d = this.$store.getters.investmentsWithFilter(this.currentProduct);
			d.sort((a, b) => {
				if (this.sort_date) {
					if (this.sort_date === "asc") {
						return b.args.timestamp - a.args.timestamp;
					} else {
						return a.args.timestamp - b.args.timestamp;
					}
				}

				if (this.sort_amount) {
					if (this.sort_amount === "asc") {
						return b.args.USDT - a.args.USDT;
					} else {
						return a.args.USDT - b.args.USDT;
					}
				}

				if (this.sort_contract) {
					if (this.sort_contract === "asc") {
						return b.contract.localeCompare(a.contract);
					} else {
						return a.contract.localeCompare(b.contract);
					}
				}

				if (this.sort_event) {
					if (this.sort_event === "asc") {
						return b.event.localeCompare(a.event);
					} else {
						return a.event.localeCompare(b.event);
					}
				}
			});

			return d.slice(0, this.limit);
		},

		totals() {
			let d = this.$store.getters.investmentsWithFilter(this.currentProduct);
			let t = {
				investments: 0,
				deposit_accrual: 0,
				deposit_withdraw: 0
			};

			d.forEach(el => {
				switch (el.event) {
					case "Deposit":
						t.investments += el.args.USDT;
						break;
					case "Deposit Accrual":
						t.deposit_accrual += el.args.USDT;
						break;
					case "Deposit Withdraw":
						t.deposit_withdraw += el.args.USDT;
						break;
				}
			});

			if (this.limit > this.filteredData.length) {
				this.hide_button = true;
			}

			return t;
		},

		getWithdrawDate() {
			const offset = moment().utcOffset();
			return moment()
				.startOf("month")
				.locale(this.$i18n.locale)
				.add(offset, "minutes")
				.add(13, "month")
				.add(19, "days")
				.format("DD MMM YYYY");
		},
	},
	data: () => ({
		limit: 5,
		hide_button: false,
		profit: "",
		reinvest: "",
		input: "2500",
		isEmpty: false,
		currentProduct: "All",
		products: ["All", "NTS80", "NTS81", "NTS165"],
		isWalletModalActive: false,
		isMetaMaskInstallModalActive: false,
		isAddFundsModalActive: false,
		sort_date: "asc",
		sort_event: false,
		sort_contract: false,
		sort_amount: false,
		metamaskState: METAMASK_STATE,
	}),
	methods: {
		...mapActions({
			allowUSDT: "userContractIntegration/allowUSDT",
		}),
		showMore() {
			this.limit += 5;
			if (this.limit > this.filteredData.length) {
				this.hide_button = true;
			}
		},
		setProduct(product) {
			this.currentProduct = product;
		},
		animateNumbers(newVal) {
			gsap.to(this.$data, 0.5, {
				profit: newVal * 1.8,
				reinvest: newVal * 2.018
			});
		},

		sortByDate(a, b, isAsc) {
			this.sort_date = isAsc ? "asc" : "desc";
			this.sort_event = false;
			this.sort_contract = false;
			this.sort_amount = false;
		},
		sortByAmount(a, b, isAsc) {
			this.sort_date = false;
			this.sort_event = false;
			this.sort_contract = false;
			this.sort_amount = isAsc ? "asc" : "desc";
		},
		sortByContract(a, b, isAsc) {
			this.sort_date = false;
			this.sort_event = false;
			this.sort_contract = isAsc ? "asc" : "desc";
			this.sort_amount = false;
		},
		sortByEvent(a, b, isAsc) {
			this.sort_date = false;
			this.sort_event = isAsc ? "asc" : "desc";
			this.sort_contract = false;
			this.sort_amount = false;
		}
	},
	async asyncData({store}) {
		await store.dispatch("fetchTransactions", "investments");
	}
};
</script>
<style lang="scss">
.has-text-right {
	.th-wrap {
		text-align: right;

		.is-invisible {
			display: none;
		}
	}
}
</style>
<style lang="scss" scoped>
@import "~@/assets/scss/transitions/slide-fade.scss";

.ethereum-address {
	font-size: 14px;
	line-height: 19px;
	font-weight: bold;
}

.total-withdraw {
	padding: 10px 20px;
	border-radius: 12px;
	color: black;
}

.calc {
	max-width: 260px;
}

.ethereum {
	padding-top: 70px;
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

	&-waiting {
		color: #d6640d;

		&:before {
			background-color: #d6640d;
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
