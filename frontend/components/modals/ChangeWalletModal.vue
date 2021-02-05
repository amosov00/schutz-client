<template>
	<div class="change-wallet-card">
		<p class="is-size-7">
			{{ $t('changeWalletText') }}
		</p>
		<p class="is-size-5 mt-5 mb-4">{{ $t('Укажите новый адрес кошелька') }}</p>
		<p class="is-size-7 mb-60">
			{{
				$t(
					'Он будет привязан к вашей учетной записи навсегда. На него будут начисляться дивиденды.'
				)
			}}
		</p>
		<div class="is-flex is-align-items-flex-start mb-60 mw-600">
			<base-input
				type="text"
				size="4"
				class="is-flex-grow-1 mt-3"
				v-model="wallet"
			/>
		</div>

		<div class="support">
			<p class="is-size-7 mb-2">
				{{ $t('Также, вы всегда можете обратиться за поддержкой:') }}
			</p>
			<div class="links">
				<a
					:href="telegramSupport"
					target="_blank"
					class="is-size-7 has-text-link has-text-weight-light telegram"
				>
					{{ $t('Чат telegram') }}
				</a>
			</div>
		</div>
		<div
			class="actions is-flex is-justify-content-space-between is-align-items-center"
		>
			<a
				@click="$parent.close()"
				class="cancel has-text-link is-size-7 is-cursor-pointer"
			>
				{{ $t('Отменить, я передумал') }}
			</a>
			<custom-button @click.native="changeWallet">
				{{ $t('send') }}
			</custom-button>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			telegramSupport: '',
			wallet: '0x',
		}
	},
	mounted() {
		this.telegramSupport = this.$config.TELEGRAM_SUPPORT_URL
	},
	methods: {
		async changeWallet() {
			if (this.wallet && this.wallet !== '0x') {
				const res = await this.$store.dispatch('changeWallet', this.wallet)
				if (res) {
					this.$buefy.toast.open({
						message: this.$t('Запрос отправлен'),
						type: 'is-success',
					})
					this.$parent.close()
				}
			}
		},
	},
}
</script>

<style lang="scss">
.actions {
	margin-top: auto;

	button {
		width: 400px;
	}
}

.links {
	a {
		&.telegram {
			position: relative;
			padding-left: 34px;

			&::before {
				content: '';
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

.mw-600 {
	max-width: 600px;
}

.change-wallet-card {
	width: 860px;
	height: 560px;
	position: relative;
	z-index: 1000;
	background: #f9f9f6;
	border-radius: 12px;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	padding: 50px;
	color: #666666;
}
</style>
