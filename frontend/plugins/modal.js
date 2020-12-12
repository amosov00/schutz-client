export default ({ store }, inject) => {
	inject('modal', {
		async open(payload) {
			return await store.dispatch('modal/open', payload);
		},

		async close() {
			await store.dispatch('modal/close');
		},

		async resolve(payload) {
			await store.dispatch('modal/resolve', payload);
		}
	});
}
