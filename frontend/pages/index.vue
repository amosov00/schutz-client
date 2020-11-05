<template lang="pug">
  section.hero
    div.hero-body
      h1.is-1.has-text-centered {{$t('authorization')}}
      div.card
        div.card-content
          b-field(:label="$t('email')")
            b-input.input-text-center(type="email" placeholder="your e-mail" v-model="email")
          b-field(:label="$t('password')")
            b-input.input-text-center(type="password" placeholder="password" v-model="password" v-on:keypress.enter.native="login")
          b-button(type="is-info" :loading="loading" @click="login") {{$t('login')}}
          nuxt-link(to="/forgot") {{$t('rememberPassword')}}
          nuxt-link(to="/signup") {{$t('registration')}}

</template>

<script>
export default {
  name: "login",
  layout: "auth",
  component: {},
  middleware: ["userRedirect"],
  data() {
    return {
      email: "",
      password: "",
      loading: false
    };
  },
  methods: {
    async login() {
      this.loading = true;
      let resp = await this.$authLogin(this.email, this.password);
      if (resp === false) {
        this.$buefy.toast.open({ message: "Check your email/password and make sure you activated your account", type: "is-danger", duration: 6000 });
      }
      this.password = "";
      this.loading = false;
    }
  },
};
</script>

<style lang="sass" scoped>
.hero-body
  margin: 0 auto

  h1
    margin-bottom: 30px

.card
  width: 340px
  padding: 30px
  border: 0.5px solid #d7d7d7
  box-shadow: 0px 20px 50px rgba(0, 0, 0, 0.1)
  border-radius: 6px

  .card-content
    padding: 0
    display: flex
    flex-direction: column


.button
  width: 150px
  height: 50px

a
  margin-top: 10px

  &:nth-child(even)
    margin-top: 30px
</style>
