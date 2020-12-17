import {mapGetters} from "vuex";

export default {
	props: {
		data: {
			type: Array,
			required: true,
		},

		loading: {
			type: Boolean,
			default: () => false,
		}
	},

	computed: {
		...mapGetters({
			totals: 'reports/totals',
		}),
	},

	methods: {
		showContract(data) {
			return data.prolongedContract
				? `${data.contract} (${data.prolongedContract})`
				: data.contract;
		},
	}
}
