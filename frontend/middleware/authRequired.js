export default async function ({app}) {
	if (!app.$userIsLoggedIn()) {
		return await redirect('/login/')
	}
};
