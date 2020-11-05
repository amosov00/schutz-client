<template lang="pug">

b-navbar(fixed-top, type='is-white')

	template(slot='brand')
		b-navbar-item(tag="nuxt-link", to='/') Neutrino

	template(slot='start')
		b-navbar-item(tag="nuxt-link", to='/', :class="{'is-active': $route.path == '/'}") Главная

		b-navbar-dropdown(label='Пользователи', hoverable, v-if="$store.state.user && $store.state.user.is_superuser")
			b-navbar-item(tag="nuxt-link", to='/admin/users', :class="{'is-active': $route.path == '/admin/users'}") Пользователи
			b-navbar-item(tag="nuxt-link", to='/admin/roles', :class="{'is-active': $route.path == '/admin/roles'}") Роли

	template(slot='end', v-if='$store.state.user')
		b-navbar-dropdown(:label='$store.state.user.email', hoverable)
			b-navbar-item(@click='$authLogout') Выход

	template(slot='end', v-if='!$store.state.user')
		b-navbar-item(tag="nuxt-link", to='/login') Вход

</template>

<script>
export default {
	name: 'NavbarMain',
	props: {},
	methods: {},
}
</script>

<style scoped>
.compare-label {
	margin-right: 10px
}
</style>
