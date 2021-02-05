export default function ({ $axios, app, $buefy }) {
	$axios.setToken(app.$cookies.get('token'), 'Bearer')

	$axios.onRequest((config) => {
		config.headers.Language = app.$cookies.get('lang')
	})

	$axios.onError((error) => {
		switch (error.response.status) {
			case 401:
				app.$authLogout()
				break
			default:
				break
		}
	})
}
