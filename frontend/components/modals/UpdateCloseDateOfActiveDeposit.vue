<template lang="pug">
	.modal-card.p-0.admin_deposit_send_mail__container
		header.modal-card-head
			.modal-card-title {{ title }}
		section.modal-card-body.is-flex.is-flex-direction-column.update_close_date__container
			base-datepicker(
				label="Date"
				v-model="form.close_date"
			)
		footer.modal-card-foot.is-flex.is-justify-content-flex-end
			b-button(type="is-danger" outlined @click="closeModal") Cancel
			b-button(type="is-primary" outlined @click="update") Update
</template>

<script>

export default {
	props: {
		title: {
			type: String,
			required: true,
		},

		closeDate: {
			type: Number,
			required: true,
		}
	},

	data() {
		return {
			form: {
				close_date: null,
			}
		}
	},

	methods: {
		closeModal() {
			this.$modal.close();
		},

		update() {
			this.$modal.resolve(this.$moment(this.closeDate).format('X'));
		}
	},

	created() {
		this.form.close_date = this.$moment(this.closeDate * 1000).toDate();
	}
}
</script>

<style lang="scss" scoped>
.update_close_date__container {
	min-height: 450px;
}
</style>
