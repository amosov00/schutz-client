import { ToastProgrammatic as Toast } from 'buefy'

export const state = () => ({
	list: [],
})

export const getters = {
	list: (s) => s.list,
	getState: (s) => (index, key) => s.list[index].state[key],
	getTempModel: (s) => (index, key) => {
		if (key) {
			return s.list[index].tempModel[key]
		}

		return s.list[index].tempModel
	},
}

export const mutations = {
	setList: (state, data) => {
		state.list = data
	},

	setState: (state, payload) => {
		state.list[payload.index].state[payload.key] = payload.data
	},

	SET_TEMP_MODEL: (state, payload) => {
		state.list[payload.index]['tempModel'] = payload.data
	},

	SET_TEMP_MODEL_BY_KEY: (state, p) => {
		state.list[p.index]['tempModel'][p.key] = p.data
	},
}

export const actions = {
	async fetchList({ commit }) {
		const isAdmin = this.$userIsSuperuser()
		const endpoint = isAdmin ? '/admin/faq/' : '/faq/'

		await this.$axios
			.get(endpoint)
			.then((res) => {
				res.data.forEach((el) => {
					el.state = {
						isOpen: false,
						isEdit: false,
					}

					el.tempModel = {}
				})

				commit('setList', res.data)
			})
			.catch((e) => {
				console.error(e)
			})
	},

	async add({ dispatch }, payload) {
		return await this.$axios
			.post('/admin/faq/', { ...payload })
			.then((res) => {
				dispatch('fetchList')
				Toast.open({ message: 'Successfully added!', type: 'is-primary' })
				return true
			})
			.catch((e) => {
				Toast.open({ message: 'Error adding question!', type: 'is-danger' })
				return false
			})
	},

	async remove({ dispatch }, id) {
		return await this.$axios
			.delete(`/admin/faq/${id}/`)
			.then((res) => {
				dispatch('fetchList')
				Toast.open({ message: 'Successfully deleted!', type: 'is-primary' })
				return true
			})
			.catch((e) => {
				Toast.open({ message: 'Error deleting question!', type: 'is-danger' })
				return false
			})
	},

	async setOrder({ dispatch }, payload) {
		const { id, data } = payload

		return await this.$axios
			.put(`/admin/faq/${id}/`, data)
			.then((res) => {
				dispatch('fetchList')
				Toast.open({
					message: 'Order successfully saved!',
					type: 'is-primary',
				})
				return true
			})
			.catch((e) => {
				Toast.open({ message: 'Error saving order!', type: 'is-danger' })
				return false
			})
	},

	async save({ dispatch }, payload) {
		try {
			const { _id, ...restPayload } = payload
			await this.$axios.put(`/admin/faq/${_id}/`, restPayload)
			Toast.open({ message: 'Successfully saved!', type: 'is-primary' })
			return true
		} catch (e) {
			Toast.open({ message: 'Error saving question!', type: 'is-danger' })
			return false
		}
	},
}
