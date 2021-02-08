<template lang="pug">
  b-tooltip(:label="$t('dividendsWithdraw')" position="is-bottom" type="is-light" v-if="allowPayment" animated)
    button.btn-cashout
      InlineSvg(:src="require(`~/assets/icons/drag.svg`)")
  b-tooltip(:label="customTooltipLabel" position="is-bottom" type="is-light" v-else animated multilined size="is-small")
    InlineSvg(:src="require('~/assets/icons/lock.svg')" )
</template>

<script>
import InlineSvg from 'vue-inline-svg'

export default {
	name: 'PayoutButton',
	components: { InlineSvg },
	props: {
		customTooltipLabel: String,
		allowPayment: Boolean,
	},
}
</script>

<style lang="sass" scoped>
.btn-cashout
  border: 0
  background: transparent
  &:hover
    cursor: pointer
.b-tooltip:after
  box-shadow: 0px 5px 8px 1px rgba(0, 1, 0, 0.1)
</style>
