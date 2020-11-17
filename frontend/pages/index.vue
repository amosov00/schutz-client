<template>
  <div>
    <custom-slider :activeDot="2" :dots="2" next-page="/signup" prev-page="/signup">
      <template slot="content">
        <div class="columns is-fullheight">
          <div class="column is-half is-flex flex-column is-justify-content-space-between">
            <div class="is-size-5 mb-5">
              Вход в систему
            </div>
            <div class="mb-5">
              <base-input
                type="text"
                size="6"
                label="E-mail:"
                class="mb-5"
                v-model="email" />
              <base-input
                type="password"
                size="6"
                label="Пароль:"
                v-model="password"
                v-on:keypress.enter.native="login"
              />
            </div>
            <div class="left-link">
              Я забыл пароль.
              <nuxt-link to="/forgot">Напомнить.</nuxt-link>
            </div>
          </div>
          <div class="column is-half is-flex is-flex-direction-column is-justify-content-space-between">
            <img src="../static/login-page.png">
            <custom-button @click.native="login">Войти</custom-button>
          </div>
        </div>
      </template>
    </custom-slider>
  </div>
</template>


<script>

export default {
  name: 'login',
  layout: 'auth',
  middleware: ['userRedirect'],
  data() {
    return {
      email: '',
      password: '',
      loading: false
    }
  },
  methods: {
    async login() {
      this.loading = true
      let resp = await this.$authLogin(this.email, this.password)
      if (resp === false) {
        this.$buefy.toast.open({
          message: 'Check your email/password and make sure you activated your account',
          type: 'is-danger',
          duration: 6000
        })
      }
      this.password = ''
      this.loading = false
    }
  },
}
</script>

<style lang="scss" scoped>
.left-link {
  line-height: 80px;
}
</style>
