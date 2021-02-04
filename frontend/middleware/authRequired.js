export default async function ({app, redirect}) {
	if (!app.$userIsLoggedIn()) {
		return await redirect('/')
	}
};
