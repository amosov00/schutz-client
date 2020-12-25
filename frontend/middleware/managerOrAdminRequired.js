export default async function ({redirect, app}) {
	if (!app.$userIsManager() && !app.$userIsSuperuser()) {
		return await redirect('/profile/')
	}
};
