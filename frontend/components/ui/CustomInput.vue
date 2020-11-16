<template>
  <div class="custom-input">
    <input
      class="input"
      :class="[`is-size-${size}`]"
      :type="type"
      placeholder=""
      :value="value"
      @input="onInput"
      step="any"
      :maxLength="maxLength"
      :max="max"
      :pattern="onlyNumber ? '\d*': ''"
    />
    <span class="placeholder">{{ placeholder }}</span>
  </div>
</template>

<script>
export default {
  name: 'custom-input',
  props: {
    onlyNumber: {
      type: Boolean,
      default: () => false
    },
    maxLength: {
      type: Number,
      default: () => ''
    },
    max: {
      type: Number,
      default: () => 0
    },
    value: {
      type: String,
      default: () => ''
    },
    placeholder: {
      type: String,
      default: () => ''
    },
    type: {
      type: String,
      default: () => ''
    },
    size: {
      type: String,
      default: () => '7'
    }
  },
  methods: {
    onInput(e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>

<style scoped lang="scss">
.custom-input {
  position: relative;
  input {
    position: relative;
    z-index: 1;
    padding: 0;
  }
  span {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    transition: all .3s;
  }
  input:focus + span {
    top: 0;
    font-size: 0.75rem;
  }
}
</style>