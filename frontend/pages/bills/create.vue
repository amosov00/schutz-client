<template lang="pug">
  div
    h1.title.is-2 {{$t('bills')}}
    div.box
      div.columns
        div.column
          b-field(:label="$t('from')")
            b-datepicker(:placeholder="$t('typeFromDate')"
            icon="calendar-today"
            type="month"
            editable v-model="timeInterval.fromDate")
        div.column
          b-field(:label="$t('to')")
            b-datepicker(:placeholder="$t('typeToDate')"
            icon="calendar-today"
            type="month"
            editable v-model="timeInterval.toDate")
      b-button(type="is-info" @click="create" :loading="loading") {{$t('create')}}
</template>

<script>
import BillsTable from '~/components/tables/BillsTable'
export default {
	name: 'bills',
	layout: 'admin',
	middleware: ['authRequired', 'adminRequired'],
	components: { BillsTable },
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
		async create() {
			if (this.timeInterval.fromDate && this.timeInterval.toDate) {
				this.loading = true
				const res = await this.$store.dispatch('bills/createInvoice', this.timeInterval)
				if (res) {
					this.loading = false
					this.$router.go(-1)
				} else {
					this.loading = false
					this.$buefy.toast.open({
						message: 'Something went wrong!',
						type: 'is-warning',
					})
				}
			}
		},
	},
}
</script>

<style></style>
