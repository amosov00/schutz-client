<template>
	<ValidationObserver ref="observer" v-slot="{ invalid }">
		<div class="add-funds-card">
			<p class="is-size-5">Укажите сумму вывода</p>
			<p class="is-size-7 mb-60">
				Вы можете <a class="is-link">вывести всю сумму</a> или часть
				начисленных дивидендов, остальное реинвестировать.
			</p>
			<div class="is-flex is-align-items-flex-start mb-60 mw-600">
				<ValidationProvider
					rules="required|min_value:1"
					slim
					v-slot="{ errors, valid }"
				>
					<base-input
						type="number"
						v-model="value"
						placeholder="2,500.00"
						required
						:is-danger="!!errors[0]"
						:is-success="!!valid"
						:error="errors[0]"
						size="4"
						class="is-flex-grow-1"
						setFocus
					/>
				</ValidationProvider>
				<div class="is-flex ml-5 is-align-items-center">
					<b-checkbox
						v-model="isTermsAcceped"
						required
						@keydown.native="
							e => {
								e.stopPropagation();
							}
						"
					/>
					<span class="is-size-7">
						<span @click="$parent.close()"> Я принимаю</span>
						<a
							href="#"
							class="terms-link "
							@click="$store.commit('toggleTermsModal', true)"
						>
							условия соглашения
						</a>
					</span>
				</div>
			</div>

			<div
				class="actions is-flex is-justify-content-space-between is-align-items-center "
			>
				<a
					@click="$parent.close()"
					class="cancel has-text-link is-size-7 is-cursor-pointer"
				>
					Отменить, я передумал
				</a>
				<custom-button
					:disabled="invalid || !isTermsAcceped"
					@click.native="withdraw"
				>
					Вывести
				</custom-button>
			</div>
			<b-modal :active.sync="terms" has-modal-card>
				<terms-and-conditions-modal
					@accepted="isTermsAcceped = $event"
				></terms-and-conditions-modal>
			</b-modal>
		</div>
	</ValidationObserver>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import TermsAndConditionsModal from "@/components/modals/TermsAndConditionsModal";
export default {
	name: "withdraw-modal",
	data() {
		return {
			value: ""
		};
	},
	components: {
		ValidationObserver,
		ValidationProvider,
		TermsAndConditionsModal
	},
	methods: {
		async withdraw() {
			const isValid = await this.$refs.observer.validate();
			if (isValid && this.isTermsAcceped) {
				this.$buefy.toast.open({
					message: "Запрос в Metamask отправлен (ВЫВОД)",
					type: "is-success"
				});
				await this.$store.dispatch("userContractIntegration/withdraw", this.value);
				this.$parent.close();
			}
		},
		logKey(e) {
			if (e.code === "Enter") {
				this.withdraw();
			}
		}
	},
	computed: {
		isTermsAcceped: {
			get() {
				return this.$store.getters.isTermsAcceped;
			},
			set(newValue) {
				this.$store.commit("setIsTermsAcceped", newValue);
			}
		},
		terms: {
			get() {
				return this.$store.state.terms_modal;
			},
			set(newValue) {
				this.$store.commit("toggleTermsModal", newValue);
			}
		}
	},
	mounted() {
		document.addEventListener("keydown", this.logKey);
	},
	beforeDestroy() {
		this.$store.commit("setIsTermsAcceped", false);
		document.removeEventListener("keydown", this.logKey);
	}
};
</script>

<style lang="scss">
.actions {
	margin-top: auto;
	button {
		width: 400px;
	}
}
.mw-600 {
	max-width: 600px;
}
.links {
	a {
		&.telegram {
			position: relative;
			padding-left: 34px;

			&::before {
				content: "";
				display: block;
				width: 24px;
				height: 24px;
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z' fill='%23179CDE'/%3E%3Cpath d='M8.12109 12.8735L9.54482 16.8141C9.54482 16.8141 9.72279 17.1823 9.91296 17.1823C10.1031 17.1823 12.9384 14.2331 12.9384 14.2331L16.0909 8.14465L8.17194 11.8565L8.12109 12.8735Z' fill='%2330A1FF'/%3E%3Cpath d='M10.0107 13.8867L9.73715 16.7881C9.73715 16.7881 9.62326 17.6779 10.5131 16.7881C11.4029 15.8982 12.2541 15.2118 12.2541 15.2118' fill='%2330A1FF'/%3E%3Cpath d='M8.14486 13.0204L5.21706 12.0665C5.21706 12.0665 4.86723 11.9242 4.9791 11.6028C5.00249 11.5357 5.04927 11.4798 5.18961 11.3821C5.83842 10.9296 17.1998 6.84553 17.1998 6.84553C17.1998 6.84553 17.5201 6.73773 17.7083 6.80993C17.8027 6.83912 17.8746 6.91682 17.8964 7.01332C17.9168 7.09783 17.9254 7.18478 17.9218 7.27163C17.9218 7.34688 17.9116 7.41705 17.9055 7.52587C17.8354 8.64451 15.7699 16.9754 15.7699 16.9754C15.7699 16.9754 15.6459 17.4625 15.2015 17.4838C14.9811 17.4911 14.7669 17.4085 14.6086 17.255C13.7371 16.5055 10.7269 14.4818 10.0618 14.0374C10.0315 14.0168 10.0115 13.9842 10.0069 13.9479C9.99774 13.9011 10.0486 13.8462 10.0486 13.8462C10.0486 13.8462 15.291 9.18654 15.4303 8.69739C15.4415 8.65976 15.4008 8.64044 15.3459 8.65671C14.9971 8.78485 8.96147 12.5974 8.29537 13.0174C8.24625 13.0307 8.19449 13.0317 8.14486 13.0204Z' fill='white'/%3E%3C/svg%3E%0A");
				background-repeat: no-repeat;
				background-position: left center;
				background-size: contain;
			}
		}
	}
}
.mm-copy {
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	cursor: pointer;
	a {
		font-weight: 300;
		font-size: 14px;
		line-height: 19px;
		transition: all 0.3s;
	}

	&::before {
		content: "";
		display: block;
		width: 14px;
		height: 13px;
		background-image: url("data:image/svg+xml,%3Csvg width='16' height='15' viewBox='0 0 16 15' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14.303 1L8.84021 5.06388L9.85041 2.66624L14.303 1Z' fill='%23E2761B' stroke='%23E2761B' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M1.69153 1L7.11035 5.10237L6.14957 2.66624L1.69153 1Z' fill='%23E4761B' stroke='%23E4761B' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M12.3369 10.4199L10.882 12.6526L13.9949 13.5104L14.8898 10.4694L12.3369 10.4199Z' fill='%23E4761B' stroke='%23E4761B' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M1.11523 10.4694L2.00465 13.5104L5.11759 12.6526L3.66269 10.4199L1.11523 10.4694Z' fill='%23E4761B' stroke='%23E4761B' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M4.94179 6.64767L4.07434 7.96197L7.16532 8.09945L7.05552 4.77246L4.94179 6.64767Z' fill='%23E4761B' stroke='%23E4761B' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M11.0528 6.64808L8.91158 4.73438L8.84021 8.09986L11.9257 7.96238L11.0528 6.64808Z' fill='%23E4761B' stroke='%23E4761B' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M5.11719 12.6524L6.97287 11.745L5.36974 10.4912L5.11719 12.6524Z' fill='%23E4761B' stroke='%23E4761B' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M9.02075 11.745L10.8819 12.6524L10.6239 10.4912L9.02075 11.745Z' fill='%23E4761B' stroke='%23E4761B' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M10.8827 12.6525L9.02148 11.7451L9.16972 12.9604L9.15325 13.4719L10.8827 12.6525Z' fill='%23D7C1B3' stroke='%23D7C1B3' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M5.11792 12.6525L6.84733 13.4719L6.83635 12.9604L6.97361 11.7451L5.11792 12.6525Z' fill='%23D7C1B3' stroke='%23D7C1B3' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M6.87477 9.6883L5.32654 9.23187L6.41909 8.73145L6.87477 9.6883Z' fill='%23233447' stroke='%23233447' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M9.12012 9.6883L9.5758 8.73145L10.6738 9.23187L9.12012 9.6883Z' fill='%23233447' stroke='%23233447' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M5.11726 12.6526L5.38078 10.4199L3.66235 10.4694L5.11726 12.6526Z' fill='%23CD6116' stroke='%23CD6116' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M10.6187 10.4199L10.8822 12.6526L12.3371 10.4694L10.6187 10.4199Z' fill='%23CD6116' stroke='%23CD6116' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M11.9248 7.96191L8.83936 8.09939L9.12485 9.68865L9.58053 8.7318L10.6786 9.23222L11.9248 7.96191Z' fill='%23CD6116' stroke='%23CD6116' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M5.32586 9.23222L6.4239 8.7318L6.87409 9.68865L7.16508 8.09939L4.0741 7.96191L5.32586 9.23222Z' fill='%23CD6116' stroke='%23CD6116' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M4.07434 7.96191L5.37003 10.4915L5.3261 9.23222L4.07434 7.96191Z' fill='%23E4751F' stroke='%23E4751F' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M10.6794 9.23222L10.6245 10.4915L11.9257 7.96191L10.6794 9.23222Z' fill='%23E4751F' stroke='%23E4751F' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M7.16537 8.09961L6.87439 9.68887L7.23674 11.5641L7.3191 9.09496L7.16537 8.09961Z' fill='%23E4751F' stroke='%23E4751F' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M8.83976 8.09961L8.69153 9.08946L8.75741 11.5641L9.12525 9.68887L8.83976 8.09961Z' fill='%23E4751F' stroke='%23E4751F' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M9.12541 9.68885L8.75757 11.5641L9.0211 11.7455L10.6242 10.4917L10.6791 9.23242L9.12541 9.68885Z' fill='%23F6851B' stroke='%23F6851B' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M5.32654 9.23242L5.37046 10.4917L6.9736 11.7455L7.23713 11.5641L6.87477 9.68885L5.32654 9.23242Z' fill='%23F6851B' stroke='%23F6851B' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M9.15321 13.4717L9.16968 12.9603L9.03243 12.8393H6.96263L6.83635 12.9603L6.84733 13.4717L5.11792 12.6523L5.72184 13.1473L6.94616 13.9996H9.0489L10.2787 13.1473L10.8826 12.6523L9.15321 13.4717Z' fill='%23C0AD9E' stroke='%23C0AD9E' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M9.02128 11.7449L8.75775 11.5635H7.23697L6.97344 11.7449L6.83618 12.9603L6.96246 12.8393H9.03226L9.16952 12.9603L9.02128 11.7449Z' fill='%23161616' stroke='%23161616' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M14.5332 5.32784L14.9998 3.08418L14.3026 1L9.021 4.9264L11.0524 6.64763L13.9237 7.489L14.5606 6.74662L14.2861 6.54865L14.7253 6.14721L14.3849 5.88325L14.8241 5.5478L14.5332 5.32784Z' fill='%23763D16' stroke='%23763D16' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M1 3.08418L1.46667 5.32784L1.1702 5.5478L1.60941 5.88325L1.27451 6.14721L1.71373 6.54865L1.43922 6.74662L2.07059 7.489L4.94196 6.64763L6.97333 4.9264L1.69176 1L1 3.08418Z' fill='%23763D16' stroke='%23763D16' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M13.9239 7.48883L11.0525 6.64746L11.9254 7.96176L10.6243 10.4914L12.3372 10.4694H14.8901L13.9239 7.48883Z' fill='%23F6851B' stroke='%23F6851B' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M4.9419 6.64746L2.07053 7.48883L1.11523 10.4694H3.66269L5.37014 10.4914L4.07445 7.96176L4.9419 6.64746Z' fill='%23F6851B' stroke='%23F6851B' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M8.8401 8.09918L9.02128 4.92617L9.85579 2.66602H6.1499L6.97343 4.92617L7.16559 8.09918L7.23147 9.10003L7.23696 11.5637H8.75775L8.76873 9.10003L8.8401 8.09918Z' fill='%23F6851B' stroke='%23F6851B' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
		background-repeat: no-repeat;
		background-position: center;
		background-size: contain;
	}
}
.add-funds-card {
	width: 860px;
	height: 560px;
	position: relative;
	z-index: 1000;
	background: #f9f9f6;
	border-radius: 12px;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	padding: 115px 50px 50px;
	color: #666666;
}
</style>
