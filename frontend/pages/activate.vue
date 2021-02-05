<template lang="pug">
  section.hero
    h1.title.is-1 {{$t('activation')}}
    b-message(type="is-danger" v-if="success === false") {{ error_message }}
</template>

<script>
export default {
	name: 'activate',
	layout: 'auth',
	data: () => ({
		query: {
			verification_code: '',
			email: '',
		},
		error_message: '',
	}),
	methods: {},
	async mounted() {
		if (this.success) {
			this.$axios.setToken(this.res.token, 'Bearer')
			this.$cookies.set('token', this.res.token, {
				path: '/',
				maxAge: 60 * 60 * 24 * 7,
				domain: this.$domainForCookie(),
			})
			await this.$authFetchUser()
			this.$nuxt.context.redirect('/profile/')
			this.$buefy.toast.open({
				message: this.$i18n.t('activationSuccess'),
				type: 'is-primary',
			})
		} else {
			this.error_message = this.$i18n.t('activationError')
		}
	},
	async asyncData({ query, store }) {
		let res = await store.dispatch('activateAccount', query)

		if (res) {
			return { success: true, res }
		} else {
			return { success: false }
		}
	},
}
</script>

<style lang="sass" scoped>
.hero-body
  margin: 0 auto

  h1
    margin-bottom: 30px

.card
  width: 340px
  padding: 30px
  border: 0.5px solid #d7d7d7
  box-shadow: 0px 20px 50px rgba(0, 0, 0, 0.1)
  border-radius: 6px

  .card-content
    padding: 0
    display: flex
    flex-direction: column


.button
  width: 150px
  height: 50px

a
  margin-top: 10px

  &:nth-child(even)
    margin-top: 30px
</style>
