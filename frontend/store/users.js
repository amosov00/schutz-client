const MUTATION = {
	SET_USER_DETAILS: 'SET_USER_DETAILS',
	SET_USERS: 'SET_USERS',
	ADD_USERS: 'ADD_USERS',
}

export const state = () => ({
	users: [],
	userDetails: {},
	total: 0,
})

export const getters = {
	detailsById: (state) => (id) => state.userDetails[id],
	users: (state) => state.users,
	total: (state) => state.total,
}

export const actions = {
	async getById({ commit }, id) {
		try {
			const { data: user } = await this.$axios.get(`/admin/users/${id}/`)

			commit(MUTATION.SET_USER_DETAILS, user)
			return user
		} catch (e) {
			return null
		}
	},

	async updateUser({ commit }, user) {
		try {
			const { data } = await this.$axios.put(`/admin/users/${user._id}/`, user)

			commit(MUTATION.SET_USER_DETAILS, data)
		} catch (e) {
			return null
		}
	},

	async fetchUsers({ commit }, { page, limit, query = '' }) {
		const {
			data: { result: users, total },
		} = await this.$axios.get(`/admin/users/`, {
			params: {
				page,
				page_size: limit,
				q: query,
			},
		})

		if (page === 1) {
			commit(MUTATION.SET_USERS, { users, total })
		} else {
			commit(MUTATION.ADD_USERS, users)
		}
	},
	async fetchUsersV1({ commit }) {
		const { data } = await this.$axios.get('/admin/users/v1/')
		commit(MUTATION.SET_USERS, { users: data })
	},
	async fetchUser({ commit }, _id) {
		return await this.$axios
			.get(`/admin/users/${_id}/`)
			.then((resp) => {
				return resp.data
			})
			.catch((_) => {
				return false
			})
	},
}

export const mutations = {
	[MUTATION.SET_USER_DETAILS](state, user) {
		const selectedUser = state.userDetails[user._id]

		selectedUser ? Object.assign(selectedUser, user) : (state.userDetails[user._id] = user)
	},

	[MUTATION.ADD_USERS](state, users) {
		state.users = [...state.users, ...users]
	},

	[MUTATION.SET_USERS](state, { users, total = 0 }) {
		state.users = users
		state.total = total
	},
}
