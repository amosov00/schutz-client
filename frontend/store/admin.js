import {ToastProgrammatic as Toast} from 'buefy'


export const state = () => ({});
export const getters = {}
export const mutations = {};
export const actions = {
	async transactionsDeactivateFetch({}, params) {
		return this.$axios.get("/admin/transactions/deactivate/", {
			params: params
		}).then(resp => {
			return resp.data
		}).catch(e => {
			Toast.open({message: 'Error', type: 'is-danger'})
			return []
		})
	},
	async transactionsDeactivateUpdate({}, params) {
		return this.$axios.post("/admin/transactions/deactivate/", params)
			.then(resp => {
				return resp.data
			}).catch(e => {
				Toast.open({message: 'Error', type: 'is-danger'})
				return []
			})
	}
};
