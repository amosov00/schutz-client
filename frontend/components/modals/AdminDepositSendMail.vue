<template lang="pug">
	.modal-card.p-0.admin_deposit_send_mail__container
		header.modal-card-head
			.modal-card-title Send mail
		section.modal-card-body.is-flex.is-flex-direction-column
			b-checkbox(
				v-for="({ id, email }) in users"
				:key="id"
				:native-value="id"
				v-model="selectedUserIds"
			).mb-2 {{ email }}
		footer.modal-card-foot.is-flex.is-justify-content-flex-end
			b-button(type="is-danger" outlined @click="closeModal") Cancel
			b-button(type="is-primary" outlined @click="send") Send
</template>

<script>
export default {
	props: {
		users: {
			type: Array,
			required: true,
		},
	},

	data() {
		return {
			selectedUserIds: [],
		}
	},

	methods: {
		closeModal() {
			this.$modal.close()
		},

		send() {
			this.$modal.resolve({
				user_ids: this.selectedUserIds,
			})
		},
	},
}
</script>

<style scoped></style>
