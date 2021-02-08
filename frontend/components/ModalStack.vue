<template lang="pug">
	div
		Modal(
			v-for="item in stack"
			:key="item.id"
			:modal="item.modal"
		)

</template>

<script>
import Modal from '@/components/Modal'

export default {
	components: {
		Modal,
	},
	props: {
		stack: {
			type: Array,
			required: true,
		},
	},
}
</script>

<style scoped></style>
