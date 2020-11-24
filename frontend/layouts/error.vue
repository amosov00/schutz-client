<template>
  <div class="container">
    <div class="columns">
      <div class="column is-8 is-offset-2 is-offset-2">
        <div class="section">
          <h1 class="title">{{ $t("pageNotFound") }}</h1>
          <div class="section">
            <nuxt-link to="/profile" class="button is-info">
              Go to my.nts.fund
            </nuxt-link>
            <a href="https://nts.fund/" class="button is-primary">
              Go to nts.fund
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "auth",
  mounted() {
    console.error(this.error)
  }
};
</script>

<style lang="scss" scoped>

</style>
