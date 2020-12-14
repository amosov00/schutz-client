<template lang="pug">
	.custom__switcher__container(@click="!disabled ? $refs.customCheckbox.click() : ''")
		.custom__switcher(
			:class="{ 'active': checkboxValue }"
			)
			.custom__switcher_toggle
		.custom__switcher_label
			slot
		input(
			type="checkbox"
			:value="value"
			ref="customCheckbox"
			v-model="checkboxValue"
			@change="$emit('input', $event.target.checked)"
		)

</template>

<script>
export default {
	props: {
		value: {
			type: Boolean,
			required: true,
		},

		disabled: {
			type: Boolean,
			default: () => false,
		}
	},

	data() {
		return {
			checkboxValue: false,
		}
	},

	created() {
		this.checkboxValue = this.value;
	},
}
</script>

<style scoped lang="scss">
.custom__switcher__container {
	display: flex;
	user-select: none;
	cursor: pointer;

	input {
		display: none;
	}

	.custom__switcher {
		border-radius: 10px;
		width: 40px;
		height: 20px;
		background: #164D78;
		padding: 3px;
		display: flex;

		&.active {
			justify-content: flex-end;
		}

		.custom__switcher_toggle {
			border-radius: 50%;
			background: #FFFFFF;
			width: 14px;
			height: 14px;
		}
	}

	.custom__switcher_label {
		margin-left: 12px;
	}
}
</style>
