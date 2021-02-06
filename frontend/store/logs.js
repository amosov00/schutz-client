const MUTATION = {
	SET: 'SET',
	ADD: 'ADD',
	SET_TYPE: 'SET_TYPE',
};

export const state = () => ({
	result: [],
	total: 0,
	types: [],
})

export const getters = {
	logs: state => state.result,
	logsTotal: state => state.total,
	logTypes: state => state.types,
}

export const actions = {
	async fetchLogs({ commit }, params) {
		try {
			const { page } = params;
			const { data } = await this.$axios.get('/admin/logs/', { params })

			if (page === 1) {
				commit(MUTATION.SET, data)
			} else {
				commit(MUTATION.ADD, data.result);
			}
		} catch (e) {}
	},

	async fetchLogTypes({ commit }) {
		try {
			const { data } = await this.$axios.get('/admin/logs/types/')

			commit(MUTATION.SET_TYPE, data)
		} catch (e) {
			return [];
		}
	}
};

export const mutations = {
	[MUTATION.SET](state, { result, total }) {
		state.result = result;
		state.total = total;
	},

	[MUTATION.SET_TYPE](state, data) {
		state.types = data;
	},

	[MUTATION.ADD](state, result) {
		state.result = [ ...state.result, ...result ];
	}
};
