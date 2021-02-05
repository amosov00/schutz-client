export default async function ({ redirect, app }) {
	if (!app.$userIsSuperuser()) {
		return await redirect('/profile/')
	}
}
