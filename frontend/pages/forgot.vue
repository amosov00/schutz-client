<template lang="pug">
  section.hero
    div.hero-body
      h1.is-1.has-text-centered Recover
      div.card
        div.card-content
          b-field(:label="$t('email')")
            b-input.input-text-center(type="email" placeholder="your e-mail" v-model="email")
          b-button(type="is-info" :loading="loading" @click="recover") {{$t('send')}}
          nuxt-link(to="/signup") {{$t('registration')}}
</template>

<script>
export default {
  name: "login",
  layout: "auth",
  component: {},
  data() {
    return {
      email: "",
      loading: false
    };
  },
  methods: {
    async recover() {
      this.loading = true;

      if (await this.$store.dispatch("startRecover", { email: this.email })) {
        this.$buefy.toast.open({ message: this.$i18n.t('authRecoverSuccess'), type: "is-primary" });
        this.email = "";
        this.$nuxt.$router.replace({ path: "/" });
      } else {
        this.$buefy.toast.open({ message: this.$i18n.t('authRecoverError'), type: "is-danger" });
      }

      this.loading = false;
    }
  }
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
