<template>
	<div
		class="custom-input"
		:class="{
			'has-icon': hasIcon,
			'is-danger': isDanger,
			'is-success': isSuccess,
			'hide-number-adders': !numberArrows,
		}"
	>
		<label v-if="label" :for="label" class="base-label">
			{{ label }}
		</label>
		<input
			:id="label"
			class="input"
			:class="[`is-size-${size}`]"
			:type="type"
			:placeholder="placeholder"
			:value="value"
			@input="onInput"
			step="any"
			@keypress="filterNumber"
			:maxLength="maxLength"
			:max="max"
			:min="min"
			ref="input"
		/>
		<div class="bottom-line" :class="{ 'is-danger': isDanger, 'is-success': isSuccess }"></div>
		<div class="error is-size-7" v-if="error">
			{{ error }}
		</div>
	</div>
</template>

<script>
export default {
	name: 'base-input',
	props: {
		isDanger: {
			type: Boolean,
			default: () => false,
		},
		isSuccess: {
			type: Boolean,
			default: () => false,
		},
		onlyNumber: {
			type: Boolean,
			default: () => false,
		},
		maxLength: {
			type: Number,
			default: () => null,
		},
		min: {
			type: Number,
			default: () => 0,
		},
		max: {
			type: Number,
			default: () => 99999999,
		},
		value: {
			type: [String, Number],
			default: () => '',
		},
		label: {
			type: String,
			default: () => '',
		},
		placeholder: {
			type: String,
			default: () => '',
		},
		type: {
			type: String,
			default: () => '',
		},
		size: {
			type: String,
			default: () => '7',
		},
		error: {
			type: String,
			default: () => '',
		},
		hasIcon: {
			type: Boolean,
			default: () => false,
		},
		setFocus: {
			type: Boolean,
			default: () => false,
		},
		numberArrows: {
			type: Boolean,
			default: () => false,
		},
		debounce: {
			type: [Number, String],
			default: 0,
		},
	},

	data() {
		return {
			debouncer: null,
		}
	},

	methods: {
		onInput(e) {
			if (this.debounce) {
				clearTimeout(this.debouncer)

				this.debouncer = setTimeout(() => {
					this.$emit('input', e.target.value)
				}, Number(this.debounce))
			} else {
				this.$emit('input', e.target.value)
			}
		},

		filterNumber($event) {
			if (this.type !== 'number') {
				return true
			}

			const keyCode = $event.keyCode ? $event.keyCode : $event.which

			if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
				$event.preventDefault()
			}
		},
	},

	mounted() {
		if (this.setFocus) {
			setTimeout(() => {
				this.$refs.input.focus()
			}, 10)
		}
	},

	beforeDestroy() {
		clearTimeout(this.debouncer)
	},
}
</script>

<style scoped lang="scss">
.custom-input {
	position: relative;
	display: flex;
	align-items: center;
	height: 20px;

	&.hide-number-adders {
		input::-webkit-outer-spin-button,
		input::-webkit-inner-spin-button {
			-webkit-appearance: none;
			margin: 0;
		}

		/* Firefox */
		input[type='number'] {
			-moz-appearance: textfield;
		}
	}

	.error {
		position: absolute;
		width: 100%;
		top: calc(100% + 5px);
		color: #d60d0d;
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
		&.is-success {
			background-color: #00c236;
		}
		&.is-danger {
			background-color: #d60d0d;
		}
	}
	input:focus + .bottom-line {
		background-color: #30a1ff;
		&.is-success {
			background-color: #00c236;
		}
		&.is-danger {
			background-color: #d60d0d;
		}
	}
}
</style>
