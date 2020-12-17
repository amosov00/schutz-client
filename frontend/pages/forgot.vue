<template>
	<div>
		<custom-slider
			:activeDot="1"
			:dots="1"
			next-page="/signup"
			prev-page="/signup"
		>
			<template slot="content">
				<div class="columns is-fullheight">
					<div class="column is-half is-flex flex-column">
						<div class="is-size-5 mb-5">
							Восстановление пароля
						</div>
						<div class="email-input">
							<base-input
								type="text"
								size="6"
								label="E-mail:"
								v-model="email"
							/>
						</div>
					</div>
					<div
						class="column is-half is-flex is-flex-direction-column is-justify-content-space-between"
					>
						<div class="auth-image">
							<img src="/login_success.svg" />
						</div>
						<custom-button @click.native="recover">Отправить</custom-button>
					</div>
				</div>
			</template>
		</custom-slider>
	</div>
	<!--section.hero-->
	<!--div.hero-body-->
	<!--h1.is-1.has-text-centered Recover-->
	<!--div.card-->
	<!--div.card-content-->
	<!--b-field(:label="$t('email')")-->
	<!--b-input.input-text-center(type="email" placeholder="your e-mail" v-model="email")-->
	<!--b-button(type="is-info" :loading="loading" @click="recover") {{$t('send')}}-->
	<!--nuxt-link(to="/signup") {{$t('registration')}}-->
</template>

<script>
export default {
	name: "login",
	layout: "auth",
	component: {},
	data() {
		return {
			email: "",
			loading: false
		};
	},
	methods: {
		async recover() {
			this.loading = true;

			if (await this.$store.dispatch("startRecover", { email: this.email })) {
				this.$buefy.toast.open({
					message: this.$i18n.t("authRecoverSuccess"),
					type: "is-primary"
				});
				this.email = "";
				this.$nuxt.$router.replace({ path: "/" });
			} else {
				this.$buefy.toast.open({
					message: this.$i18n.t("authRecoverError"),
					type: "is-danger"
				});
			}

			this.loading = false;
		}
	}
};
</script>

<style lang="scss" scoped>
.email-input {
	margin-top: 120px;
}
</style>
