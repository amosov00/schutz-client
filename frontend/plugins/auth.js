export default ({ app, route, redirect }, inject) => {
	inject('domainForCookie', () => {
		let host = window.location.host
		if (host.includes('localhost')) {
			return 'localhost'
		} else if (host.includes('elastoo.com')) {
			return 'schutz.elastoo.com'
		} else {
			return 'schutz.capital'
		}
	})

	inject('authLogin', async (email, password) => {
		return await app.$axios
			.post('/account/login/', {
				email: email,
				password: password,
			})
			.then((resp) => {
				app.store.commit('setUser', resp.data.user)
				app.$axios.setToken(resp.data.token, 'Bearer')
				app.$cookies.set('token', resp.data.token, {
					path: '/',
					maxAge: 60 * 60 * 24 * 7,
					domain: app.$domainForCookie(),
				})
				redirect(app.localePath('/profile/'))
				return true
			})
			.catch((resp) => {
				return false
			})
	})
	inject('authLogout', () => {
		if (route.path !== app.localePath('/')) {
			redirect(app.localePath('/'))
		}
		app.$cookies.remove('token', {
			path: '/',
			domain: app.$domainForCookie(),
		})
		app.$axios.setToken(null)
		app.store.commit('deleteUser')
	})
	inject('authFetchUser', async () => {
		let { data, status } = await app.$axios.get('/account/user/')
		if (status === 200) {
			app.store.commit('setUser', data)
		} else {
			redirect(app.localePath('/'))
		}
	})
	inject('userIsLoggedIn', () => {
		return app.store.state.user
	})
	inject('userIsManager', () => {
		return (
			app.store.state.user &&
			(app.store.state.user.is_manager || app.store.state.user.is_superuser)
		)
	})
	inject('userIsSuperuser', () => {
		return app.store.state.user && app.store.state.user.is_superuser
	})
}
