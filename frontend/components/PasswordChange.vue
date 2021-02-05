<template>
	<ValidationObserver v-slot="{ handleSubmit }">
		<form @submit.prevent="handleSubmit(onSubmit)">
			<div class="modal-card">
				<header class="modal-card-head">
					<p class="modal-card-title">{{ $t('changePassword') }}</p>
				</header>
				<section class="modal-card-body">
					<ValidationProvider rules="required" v-slot="{ errors, valid }" name="Current password">
						<base-input
							type="password"
							class="mb-20"
							v-model="form.old_password"
							label="Current password"
							:is-danger="!!errors[0]"
							:error="errors[0]"
							has-icon
						></base-input>
					</ValidationProvider>
					<ValidationProvider rules="required|min:8" v-slot="{ errors, valid }" vid="confirmation" name="New password">
						<base-input
							type="password"
							class="mb-20"
							v-model="form.password"
							label="New password"
							:is-danger="!!errors[0]"
							:is-success="!!valid"
							:error="errors[0]"
							has-icon
						/>
					</ValidationProvider>
					<ValidationProvider
						rules="required|confirmed:confirmation"
						v-slot="{ errors, valid }"
						name="Password confirmation"
					>
						<base-input
							type="password"
							class="mb-20"
							v-model="form.repeat_password"
							label="Password confirmation"
							:is-danger="!!errors[0]"
							:is-success="!!valid"
							:error="errors[0]"
							has-icon
						/>
					</ValidationProvider>
				</section>
				<footer class="modal-card-foot">
					<b-button type="is-primary" native-type="submit" :loading="isLoading">{{ $t('change') }}</b-button>
				</footer>
			</div>
		</form>
	</ValidationObserver>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'

export default {
	name: 'PasswordChange',
	components: { ValidationProvider, ValidationObserver },
	data: () => ({
		form: {
			old_password: '',
			password: '',
			repeat_password: '',
		},
		isLoading: false,
	}),

	methods: {
		async onSubmit() {
			this.isLoading = true
			const resp = await this.$store.dispatch('changePassword', this.form)

			if (resp) {
				this.$parent.close()
				this.$buefy.toast.open({
					message: 'Succesfully changed!',
					type: 'is-primary',
				})
			} else {
				this.$buefy.toast.open({
					message: 'Error changing password!',
					type: 'is-danger',
				})
			}
			this.isLoading = false
		},
	},
}
</script>

<style lang="sass" scoped></style>
