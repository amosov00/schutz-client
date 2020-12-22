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
							{{ $t("Восстановление пароля") }}
						</div>
						<div class="pass-input">
							<base-input
								type="text"
								size="6"
								:label="$t('password')"
								v-model="password"
							/>
						</div>

						<div class="mt-40">
							<base-input
								type="text"
								size="6"
								:label="$t('confirmPassword')"
								v-model="repeat_password"
							/>
						</div>
					</div>
					<div
						class="column is-half is-flex is-flex-direction-column is-justify-content-space-between"
					>
						<div class="auth-image">
							<img src="/login_success.svg" />
						</div>
						<custom-button @click.native="changePassword">{{
							$t("send")
						}}</custom-button>
					</div>
				</div>
			</template>
		</custom-slider>
	</div>
</template>

<script>
export default {
	name: "recover-index",
	layout: "auth",
	data: () => ({
		password: "",
		repeat_password: "",
		query: {
			recover_code: ""
		}
	}),
	methods: {
		async changePassword() {
			this.loading = true;

			let data = {
				password: this.password,
				repeat_password: this.repeat_password,
				recover_code: this.query.recover_code
			};

			if (await this.$store.dispatch("finishRecover", data)) {
				this.$buefy.toast.open({
					message: this.$i18n.t("passwordChangeSuccess"),
					type: "is-primary"
				});
				this.$nuxt.context.redirect("/");
			} else {
				this.$buefy.toast.open({
					message: this.$i18n.t("passwordChangeError"),
					type: "is-danger"
				});
			}

			this.loading = false;
		}
	},
	asyncData({ query }) {
		return { query };
	}
};
</script>

<style lang="scss" scoped>
.pass-input {
	margin-top: 120px;
}
.mt-40 {
	margin-top: 40px;
}
</style>
