const MUTATION = {
	SET_USER_DETAILS: 'SET_USER_DETAILS',
	SET_USERS: 'SET_USERS',
}

export const state = () => ({
	users: [],
	userDetails: {},
})

export const getters = {
	detailsById: state => id => state.userDetails[id],
};

export const actions = {
	async getById({ commit }, id) {
		try {
			const { data: user } = await this.$axios.get(`/admin/users/${id}/`)

			commit(MUTATION.SET_USER_DETAILS, user)
			return user;
		} catch (e) {
			return null;
		}
	}
};

export const mutations = {
	[MUTATION.SET_USER_DETAILS](state, user) {
		const selectedUser = state.userDetails[user._id]

		selectedUser
			? Object.assign(selectedUser, user)
			: state.userDetails[user._id] = user;
	},

	[MUTATION.SET_USERS](state, users) {
		state.users = users;
	}
};
