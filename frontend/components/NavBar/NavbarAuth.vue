<template lang="pug">
  b-navbar(spaced).navbar
    template(slot="start")
      img.logo(src="~/assets/img/logo.svg")
    template(slot="end")
      LangSwitcher

</template>

<script>
import LangSwitcher from '~/components/NavBar/LangSwitcher'

export default {
	name: 'NavbarAuth',
	components: { LangSwitcher },
}
</script>

<style lang="sass" scoped>
.navbar
  background: none
</style>
