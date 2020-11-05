<template lang="pug">
  section.hero
    div.hero-body
      h1.is-1.has-text-centered Recover
      div.card
        div.card-content
          b-field(:label="$t('password')")
            b-input(type="password" v-model="password")
          b-field(:label="$t('confirmPassword')")
            b-input(type="password" v-model="repeat_password")
          b-button.w-100(type="is-info" @click="changePassword")  {{$t('send')}}

</template>

<script>
export default {
  name: "recover-index",
  layout: "auth",
  data: () => ({
    password: "",
    repeat_password: "",
    query: {
      recover_code: ""
    }
  }),
  methods: {
    async changePassword() {
      this.loading = true;

      let data = {
        password: this.password,
        repeat_password: this.repeat_password,
        recover_code: this.query.recover_code
      };

      if (await this.$store.dispatch("finishRecover", data)) {
        this.$buefy.toast.open({
          message: this.$i18n.t("passwordChangeSuccess"),
          type: "is-primary"
        });
        this.$nuxt.context.redirect("/");
      } else {
        this.$buefy.toast.open({
          message: this.$i18n.t("passwordChangeError"),
          type: "is-danger"
        });
      }

      this.loading = false;
    }
  },
  asyncData({ query }) {
    return { query };
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
