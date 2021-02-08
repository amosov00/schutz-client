export const state = () => ({})

export const getters = {}

export const mutations = {}

export const actions = {
	async fetchTermsAndConditions({}) {
		return await this.$axios
			.get('/meta/legal-docs/terms-and-conditions/')
			.then((resp) => {
				return resp.data
			})
			.catch((_) => {
				return null
			})
	},
}
