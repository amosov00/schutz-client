<template lang="pug">
	.custom__checkbox_block
		.custom__checkbox(@click="!disabled ? $refs.customCheckbox.click() : ''")
			.custom__checkbox_indicator
				.filled(v-if="checkboxValue")
			.custom__checkbox_label
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
		},
	},

	data() {
		return {
			checkboxValue: false,
		}
	},

	created() {
		this.checkboxValue = this.value
	},
}
</script>

<style lang="scss">
.custom__checkbox_block {
	input {
		display: none;
	}

	.custom__checkbox {
		display: flex;
		align-items: center;
		user-select: none;
		cursor: pointer;

		.custom__checkbox_indicator {
			height: 14px;
			width: 14px;
			border: 1px solid #164a75;
			padding: 2px;

			.filled {
				width: 100%;
				height: 100%;
				background: #164a75;
			}
		}

		.custom__checkbox_label {
			margin-left: 7px;
		}
	}
}
</style>
