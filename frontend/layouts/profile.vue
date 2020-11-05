<template lang="pug">
  div.wrapper
    div.container.is-flex
      LeftMenu
      div.main
        div.nav-container
          NavbarPersonalArea
          div.separator
        div.content-box
          nuxt
</template>

<script>
  import LeftMenu from "~/components/LeftMenu";
  import NavbarPersonalArea from "~/components/NavBar/NavbarPersonalArea";

  export default {
    components: {
      LeftMenu, NavbarPersonalArea
    },
    middleware: ['fetchUser'],
  }
</script>

<style lang="sass" scoped>
.wrapper
  margin: 0 auto
  background: #F9F9FB
.container
  max-width: 1440px
.main
  flex: 1 1 0
  background: #ffffff
  min-height: 100vh
  padding-bottom: 100px
.nav-container
  padding: 24px 40px 0 40px
.separator
  margin-top: 24px
  border-bottom: 1px solid rgba(176, 176, 176, 0.25)
.content-box
  padding: 24px 60px
  flex: 1 1 0
  background: #ffffff
</style>
