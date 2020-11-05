<template lang="pug">
  b-navbar(spaced)
    template(slot="start")
      img.logo(src="~/assets/img/logo.svg")
    template(slot="end")
      p lang

</template>

<script>
  export default {
    name: "NavbarAuth"
  }
</script>

<style lang="sass" scoped>
  .navbar-menu
    justify-content: space-around
    .navbar-start
      margin: 0
    .navbar-end
      margin: 0


</style>
