<template>
  <button class="button custom-button is-primary is-size-5 has-text-weight-bold">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'CustomButton'
}
</script>

<style scoped lang="scss">
.custom-button {
  height: 80px;
  border-radius: 12px;
  border: 2px solid #FFC543;
  background: linear-gradient(#f9e9a0, #f9d481);

  &:hover:not([disabled]) {
    border: 2px solid #FFC543;
    opacity: .85;
  }
}
</style>