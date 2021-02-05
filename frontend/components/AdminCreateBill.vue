<template lang="pug">
	.admin_create_bill__container.is-fullheight
		div.mb-0
			div.subtitle(style="color: black") Создать счёт
			div.columns
				div.column
					b-field(:label="$t('from')")
						b-datepicker(:placeholder="$t('typeFromDate')"
							icon="calendar-today"
							type="month"
							editable
							v-model="timeInterval.fromDate"
							inline
						)
				div.column
					b-field(:label="$t('to')")
						b-datepicker(:placeholder="$t('typeToDate')"
							icon="calendar-today"
							type="month"
							editable
							v-model="timeInterval.toDate"
							inline
						)
		.is-flex.is-justify-content-flex-end.mt-5
			b-button(type="is-info" @click="create" :loading="loading") {{$t('create')}}
</template>

<script>
import { mapActions } from 'vuex'

export default {
	data() {
		return {
			timeInterval: {
				fromDate: null,
				toDate: null,
			},

			loading: false,
		}
	},

	methods: {
		...mapActions({
			createInvoice: 'bills/createInvoice',
			fetchInvoices: 'bills/fetchCreatedInvoices',
		}),

		async create() {
			if (this.timeInterval.fromDate && this.timeInterval.toDate) {
				this.loading = true
				const res = await this.createInvoice(this.timeInterval)

				if (res) {
					await this.fetchInvoices()
				} else {
					this.$buefy.toast.open({
						message: 'Something went wrong!',
						type: 'is-warning',
					})
				}

				this.loading = false
			}
		},
	},
}
</script>

<style lang="scss">
.admin_create_bill__container {
	min-height: 100%;
}
</style>
