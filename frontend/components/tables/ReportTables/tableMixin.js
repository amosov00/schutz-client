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
		},

		pagination: {
			type: Object,
			required: true,
		},

		count: {
			type: Number,
			required: true,
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

		showMoreButton() {
			return this.count > this.pagination.limit * this.pagination.page;
		}
	}
}
