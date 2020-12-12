<template lang="pug">
	.modal-card.user_profile__container(style="width: 860px" v-if="!loading")
		section.modal-card-body
			.user_profile__title Изменить данные пользователя
</template>

<script>
export default {
	props: {
		userId: {
			type: String,
			required: true,
		}
	},

	data() {
		return {
			loading: false,
			user: null,
		}
	},

	async created() {
		this.loading = true;

		this.user = await this.$store.dispatch('fetchUser', this.userId);

		this.loading = false;
	},

	mounted() {
	},

	methods: {}
}
</script>

<style scoped lang="scss">
.user_profile__title {
	font-size: 24px;
	line-height: 120%;
}
</style>
