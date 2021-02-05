export default async function ({ redirect, app }) {
	if (app.$userIsLoggedIn()) {
		return await redirect('/profile/')
	}
}
