<template lang="pug">
	.base__datepicker
		.base-label.is-flex
			.base-label__icon
				b-icon(icon="calendar")
			|{{ label }}

		b-datepicker(
			:locale="currentLocaleIso"
			v-model="selectValue"
			:type="type"
		)
		.bottom-line
</template>

<script>
export default {
	props: {
		label: {
			type: String,
			default: () => '',
		},

		value: {
			type: [Number, String, Date],
			default: () => '',
		},

		type: {
			type: String,
			default: () => '',
		}
	},

	data() {
		return {
			currentLocaleIso: undefined,
			selectValue: '',
		}
	},

	watch: {
		selectValue: {
			handler(value) {
				this.$emit('input',
					value
						? this.$moment(value).format('X')
						: null
				)
			}
		},
	},

	created() {
		const locales = this.$i18n.locales;
		const currentLocaleCode = this.$i18n.locale;
		const { iso: currentLocaleIso } = locales.find(({ code }) => code === currentLocaleCode) || undefined;

		this.currentLocaleIso = currentLocaleIso;

		this.selectValue = this.value;
	}
}
</script>

<style lang="scss">
.base__datepicker {
	position: relative;
	display: flex;
	align-items: center;
	height: 20px;

	.datepicker {
		input.input {
			&:focus {
				box-shadow: none !important;
			}
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

		.base-label__icon {
			.icon {
				margin-right: 6px;

				i {
					color: #666666;
				}
			}
		}
	}

	.bottom-line {
		position: absolute;
		bottom: -5px;
		left: 0;
		width: 100%;
		height: 1px;
		background-color: #666666;
	}
}
</style>
