<template lang="pug">
	div
		CustomSlider(hide-dots)
			template(#content)
				.is-fullheight
					.content.is-fullheight.is-fullwidth
						.logs__container.is-fullheight
							.profile_block__title Журнал логов
							.columns
								.column
									base-input(
										label="Поиск по email:"
										v-model="queryParams.user_email"
										debounce="800"
									).mb-5
									base-select(
										:options="type"
										label="Тип:"
										v-model="queryParams.type"
									).mb-5
									base-datepicker(
										label="Дата от:"
										v-model="queryParams.timestamp_from"
									).mb-5
									base-datepicker(
										label="Дата до:"
										v-model="queryParams.timestamp_to"
									).mb-5
								.column
		LogTable(
			:data='logs'
			:show-more='showMoreButton'
			@more='pagination.page += 1'
		)
</template>

<script>
import { CustomSlider } from "~/components";
import { mapActions, mapGetters } from 'vuex'
import LogTable from '~/components/tables/LogTable'

export default {
	layout: 'profile',

	components: {
		LogTable,
		CustomSlider,
	},

	data() {
		return {
			queryParams: {
				type: null,
				user_email: '',
				timestamp_from: null,
				timestamp_to: null,
			},
			pagination: {
				page: 1,
				page_size: 10,
			},
		}
	},

	computed: {
		...mapGetters({
			types: 'logs/logTypes',
			logs: 'logs/logs',
			logsCount: 'logs/logsTotal',
		}),

		type() {
			return [...this.types.map(type => ({
				text: type,
				value: type,
			})), { text: 'All', value: null }]
		},

		showMoreButton() {
			return this.logsCount > this.pagination.page_size * this.pagination.page
		}
	},

	methods: {
		...mapActions({
			fetchLogs: 'logs/fetchLogs',
		}),
	},

	watch: {
		queryParams: {
			handler(newValue) {
				this.pagination.page = 1;
				this.fetchLogs({...newValue, ...this.pagination});
			},
			deep: true,
		},

		pagination: {
			handler(newValue) {
				this.fetchLogs({...newValue, ...this.queryParams});
			},
			deep: true,
		}
	},

	async asyncData({ store }) {
		await Promise.all([
			store.dispatch('logs/fetchLogs', { page: 1, page_size: 10 }),
			store.dispatch('logs/fetchLogTypes'),
		])
	},
}
</script>

<style scoped>

</style>
