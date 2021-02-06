<template lang="pug">
	.custom-input
		.base-label {{ label }}
		b-select(
			expanded
			v-model="selectValue"
		)
			option(
				v-for="({ text, value }, index) in options"
				:value="value"
				:key="index"
			) {{ text }}
		.bottom-line
</template>

<script>
export default {
	props: {
		label: {
			type: String,
			default: () => '',
		},

		options: {
			type: Array,
			required: true,
		},

		value: {
			type: [String, Number],
			default: () => '',
		},
	},

	data() {
		return {
			selectValue: '',
		}
	},

	watch: {
		selectValue: {
			handler(value) {
				this.$emit('change', value)

				this.$emit('input', value)
			},
		},
	},

	created() {
		this.selectValue = this.value
	},
}
</script>

<style lang="scss" scoped>
.custom-input {
	position: relative;
	display: flex;
	align-items: center;
	height: 20px;

	.error {
		position: absolute;
		width: 100%;
		top: calc(100% + 5px);
		color: #d60d0d;
	}

	.control {
		width: 100%;
	}

	&.has-icon {
		&::after {
			font-family: 'Font Awesome 5 Free';
			font-weight: 600;
		}
		&.is-success::after {
			content: '\f00c';
			color: #00c236;
		}

		&.is-danger::after {
			content: '\f071';
			color: #d60d0d;
		}
	}
	.base-label {
		white-space: nowrap;
		margin-right: 18px;
		font-weight: 300;
		font-size: 14px;
		line-height: 19px;
		color: #666666;
		cursor: text;
	}
	input {
		position: relative;
		padding: 0;
		font-weight: 300;
		font-size: 14px;
		line-height: 19px;
		background: transparent;
		border: none;
	}
	input:active {
		box-shadow: none;
	}
	input:-webkit-autofill {
		box-shadow: 0 0 0 30px white inset !important;
	}
	.bottom-line {
		position: absolute;
		bottom: -5px;
		left: 0;
		width: 100%;
		height: 1px;
		background-color: #666666;
		transition: background-color 0.3s;
	}
}
</style>
