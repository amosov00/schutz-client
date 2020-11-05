<template lang="pug">
  div.auth-page
    div.container
      NavbarAuth
    nuxt

</template>

<script>
  import NavbarAuth from "~/components/NavBar/NavbarAuth";

  export default {
    components: {
      NavbarAuth
    },
    middleware: ['fetchUser'],
  }
</script>

<style lang="sass" scoped>
  .container
    max-width: 720px

  .auth-page
    min-height: 100vh
    background-image: url("~assets/img/auth-bg.svg")
    background-size: contain
    background-repeat: no-repeat
</style>
