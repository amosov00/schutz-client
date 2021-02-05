<template>
	<div class="custom-input">
		<label>
			<input
				class="input"
				:class="[`is-size-${size}`, align]"
				:style="{ fontSize: fontSize }"
				:type="type"
				:placeholder="defaultPlaceholder ? placeholder : ''"
				:value="value"
				v-model="selectValue"
				step="any"
				:maxLength="maxLength"
				:max="max"
				:pattern="onlyNumber ? '\d*' : ''"
			/>
		</label>
		<span v-if="!defaultPlaceholder" class="placeholder">{{
			placeholder
		}}</span>
	</div>
</template>

<script>
export default {
	name: 'custom-input',
	props: {
		onlyNumber: {
			type: Boolean,
			default: () => false,
		},
		maxLength: {
			type: [String, Number],
			default: () => '',
		},
		max: {
			type: Number,
			default: () => 0,
		},
		value: {
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
		defaultPlaceholder: {
			type: Boolean,
			default: () => false,
		},
		align: {
			type: String,
			default: () => 'left',
		},
		fontSize: {
			type: String,
			default: () => 'inherit',
		},

		debounce: {
			type: [String, Number],
			default: () => 0,
		},
	},

	data() {
		return {
			selectValue: '',
			debouncer: null,
		}
	},

	watch: {
		selectValue: {
			handler(value) {
				if (this.debounce) {
					clearTimeout(this.debouncer)

					this.debouncer = setTimeout(() => {
						this.$emit('input', value)
					}, Number(this.debounce))
				} else {
					this.$emit('input', value)
				}
			},
		},
	},

	created() {
		this.selectValue = this.value
	},

	beforeDestroy() {
		clearTimeout(this.debouncer)
	},
}
</script>

<style scoped lang="scss">
.custom-input {
	position: relative;
	input {
		position: relative;
		z-index: 1;
		padding: 0;

		&.center {
			text-align: center;
		}

		&.left {
			text-align: left;
		}

		&.right {
			text-align: right;
		}
	}
	span {
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		transition: all 0.3s;
	}
	input:focus + span {
		top: 0;
		font-size: 0.75rem;
	}
}
</style>
