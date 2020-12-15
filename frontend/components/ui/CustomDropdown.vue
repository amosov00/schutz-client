<template lang="pug">
	b-dropdown.custom__dropdown(:disabled="disabled")
		p.custom_dropdown__label(slot="trigger")
			slot(name="label")
		b-dropdown-item(
			v-for="(button, index) in items"
			aria-role="listitem"
			:class="{ 'active': button.active }"
			@click="button.action"
			:key="index" ) {{ $t(button.text) }}

</template>

<script>
export default {
	props: {
		items: {
			type: Array,
			required: true,
		},

		disabled: {
			type: Boolean,
			default: () => false,
		}
	},
}
</script>

<style scoped>

</style>
