import uniqid from 'uniqid';
import createDeferred from 'deferred';

const MUTATIONS = {
	OPEN: 'OPEN',
	CLOSE: 'CLOSE',
	CLOSE_ALL: 'CLOSE_ALL',
	SET_PROMISE: 'SET_PROMISE',
	RESOLVE: 'RESOLVE',
	REJECT: 'REJECT',
}

export const state = () => ({
	stack: [],
	deferred: null,
});

export const getters = {
	stack: state => state.stack,
};

export const actions = {
	open({ commit }, modal) {
		commit(MUTATIONS.OPEN, modal);

		if (modal.options && modal.options.prompt) {
			const deferred = createDeferred();
			commit(MUTATIONS.SET_PROMISE, deferred)

			return deferred.promise;
		}

	},

	close({ commit, state }) {
		commit(MUTATIONS.CLOSE);

		const { deferred } = state;

		if (deferred) {
			commit(MUTATIONS.REJECT);
		}
	},

	resolve({ commit, state }, payload) {
		const deferred = state.deferred;

		commit(MUTATIONS.CLOSE);

		if (payload) {
			return deferred.resolve(payload);
		}

		return deferred.resolve();
	},

	reject({ commit, state }) {
		const deferred = state.deferred;

		commit(MUTATIONS.CLOSE);

		return deferred.reject();
	},
};

export const mutations = {
	[MUTATIONS.OPEN](state, modal) {
		state.stack.push({
			id: uniqid(),
			modal,
		});
	},

	[MUTATIONS.CLOSE](state) {
		state.stack.pop();
	},

	[MUTATIONS.CLOSE_ALL](state) {
		state.stack = [];
	},

	[MUTATIONS.SET_PROMISE](state, deferred) {
		state.deferred = deferred;
	},

	[MUTATIONS.REJECT](state) {
		const deferred = state.deferred;

		if (deferred) {
			deferred.reject();
		}
	},
};

