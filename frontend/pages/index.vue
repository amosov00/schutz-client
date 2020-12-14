<template>
	<div>
		<custom-slider
			:activeDot="2"
			:dots="2"
			:next-page="localePath('/signup')"
			:prev-page="localePath('/signup')"
		>
			<template slot="content">
				<div class="columns is-fullheight">
					<div
						class="column is-half is-flex flex-column is-justify-content-space-between"
					>
						<div class="is-size-5 mb-5">
							{{ $t('authTitle') }}
						</div>
						<div class="mb-5">
							<base-input
								type="text"
								size="6"
								label="E-mail:"
								class="mb-5"
								v-model="email"
								@input="handleBlur()"
							/>
							<base-input
								type="password"
								size="6"
								:label="`${$t('password')}:`"
								v-model="password"
								v-on:keypress.enter.native="login"
								:is-danger="passwordError"
								has-icon
							/>
						</div>
						<div class="left-link">
							{{ $t('forgotPass') }}
							<nuxt-link to="/forgot"> {{ $t('Напомнить.') }} </nuxt-link>
						</div>
					</div>
					<div
						class="column is-half is-flex is-flex-direction-column is-justify-content-space-between"
					>
						<div class="auth-image">
							<img :src="status_image" :class="animate_class" />
						</div>
						<custom-button @click.native="login"> {{ $t('login') }} </custom-button>
					</div>
				</div>
			</template>
		</custom-slider>
	</div>
</template>

<script>
import { authSliderController } from "@/utils/slider";

export default {
	name: "login",
	layout: "auth",
	middleware: ["fetchUser", "userRedirect"],
	transition: authSliderController,
	data() {
		return {
			email: "",
			password: "",
			loading: false,
			passwordError: false,
			status_image: "/login.svg",
			animate_class: ""
		};
	},
	watch: {
		password() {
			this.passwordError = false;
			this.handleBlur();
		}
	},
	methods: {
		failAnimate() {
			this.animate_class = "shake";
			this.status_image = "/login_failure.svg";
			setTimeout(() => {
				this.animate_class = "";
			}, 1000);
		},

		handleBlur() {
			if (this.email && this.password) {
				if (this.password.length >= 8) {
					if (this.status_image != "/login_success.svg") {
						this.animate_class = "flipInX";
					}
					this.status_image = "/login_success.svg";
				} else {
					if (this.status_image != "/login.svg") {
						this.animate_class = "flipInX";
					}
					this.status_image = "/login.svg";
				}
			}
			setTimeout(() => {
				this.animate_class = "";
			}, 1000);
		},

		async login() {
			this.loading = true;
			let resp = await this.$authLogin(this.email, this.password);
			if (resp === false) {
				this.failAnimate();
				this.$buefy.toast.open({
					message: "Неверный логин или пароль.",
					type: "is-warning",
					duration: 6000
				});
			} else {
				this.status_image = "/login.svg";
			}
			this.passwordError = true;
			this.loading = false;
		}
	}
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/transitions/slide-fade.scss";

.left-link {
	line-height: 80px;
}
</style>
