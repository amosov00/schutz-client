<template lang="pug">
	.admin_update_status__container.modal-card.p-0
		header.modal-card-head
			.modal-card-title Update status
		section.modal-card-body
			base-select(
				:options="statuses"
				label="Status"
				v-model="form.result"
			)
		footer.modal-card-foot.is-flex.is-justify-content-flex-end
			b-button(type="is-danger" @click="closeModal") Cancel
			b-button(type="is-info" @click="update") Submit
</template>

<script>
export default {
	props: {
		agreement: {
			type: Object,
			required: true,
		},
	},

	data() {
		return {
			statuses: [
				{
					text: 'Не ответил',
					value: 1,
				},
				{
					text: 'Закрыть',
					value: 2,
				},
				{
					text: 'Продлить',
					value: 3,
				},
			],

			form: {
				result: '',
			},
		}
	},

	methods: {
		closeModal() {
			this.$modal.close()
		},

		update() {
			this.$modal.resolve({
				_id: this.agreement._id,
				result: this.form.result,
			})

			this.closeModal()
		},
	},

	created() {
		this.form.result = this.agreement.result ? this.agreement.result : ''
	},
}
</script>

<style scoped></style>
