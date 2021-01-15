<template lang="pug">
	.modal-card.p-0.admin_create_bill__container
		header.modal-card-head
			.modal-card-title {{$t('bills')}}
		div.box.mb-0
			div.columns
				div.column
					b-field(:label="$t('from')")
						b-datepicker(:placeholder="$t('typeFromDate')"
							icon="calendar-today"
							type="month"
							editable
							v-model="timeInterval.fromDate"
							trap-focus
						)
				div.column
					b-field(:label="$t('to')")
						b-datepicker(:placeholder="$t('typeToDate')"
							icon="calendar-today"
							type="month"
							editable
							v-model="timeInterval.toDate"
							trap-focus
						)
		footer.modal-card-foot.is-flex.is-justify-content-flex-end
			b-button(type="is-info" @click="close" ) {{$t('cancel')}}
			b-button(type="is-info" @click="create" :loading="loading") {{$t('create')}}
</template>

<script>
import {mapActions} from "vuex";

export default {
	data() {
		return {
			timeInterval: {
				fromDate: null,
				toDate: null
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
				this.loading = true;
				const res = await this.createInvoice(this.timeInterval);

				if (res) {
					await this.fetchInvoices();
				} else {
					this.$buefy.toast.open({
						message: "Something went wrong!",
						type: "is-warning"
					});
				}

				this.loading = false;
				this.close();
			}
		},

		close() {
			this.$modal.close();
		}
	}
}
</script>

<style lang="scss">
.admin_create_bill__container {
	.box {
		height: 300px;
		border-radius: 0;
	}
}
</style>
