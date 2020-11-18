<template>
  <div
    class="custom-input"
    :class="{'has-icon': hasIcon, 'is-danger': isDanger, 'is-success': isSuccess}">
    <label v-if="label" :for="label" class="base-label">{{ label }}</label>
    <input
      :id="label"
      class="input"
      :class="[`is-size-${size}`]"
      :type="type"
      :placeholder="placeholder"
      :value="value"
      @input="onInput"
      step="any"
      :maxLength="maxLength"
      :max="max"
      :pattern="onlyNumber ? '\d*': ''"
    />
    <div class="bottom-line" :class="{'is-danger': isDanger, 'is-success': isSuccess}"></div>
    <div class="error is-size-7" v-if="error">
      {{ error }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'base-input',
  props: {
    isDanger: {
      type: Boolean,
      default: () => false
    },
    isSuccess: {
      type: Boolean,
      default: () => false
    },
    onlyNumber: {
      type: Boolean,
      default: () => false
    },
    maxLength: {
      type: Number,
      default: () => null
    },
    max: {
      type: Number,
      default: () => 0
    },
    value: {
      type: String,
      default: () => ''
    },
    label: {
      type: String,
      default: () => ''
    },
    placeholder: {
      type: String,
      default: () => ''
    },
    type: {
      type: String,
      default: () => ('')
    },
    size: {
      type: String,
      default: () => '7'
    },
    error: {
      type: String,
      default: () => ''
    },
    hasIcon: {
      type: Boolean,
      default: () => false
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
  display: flex;
  align-items: center;
  height: 20px;

  .error {
    position: absolute;
    width: 100%;
    top: calc(100% + 5px);
    color: #D60D0D;
  }

  &.has-icon {
    &::after {
      font-family: "Font Awesome 5 Free";
      font-weight: 600;
    }
    &.is-success::after {
      content: "\f00c";
      color: #00C236;
    }

    &.is-danger::after {
      content: "\f071";
      color: #D60D0D;
    }

  }
  .base-label {
    white-space: nowrap;
    margin-right: 18px;
    font-weight: 300;
    font-size: 14px;
    line-height: 19px;
    color: #666666;
    cursor: text;
  }
  input[type="text"],
  input[type="password"] {
    position: relative;
    padding: 0;
    font-weight: 300;
    font-size: 14px;
    line-height: 19px;
    background: transparent;
    border: none;
  }
  input:active {
    box-shadow: none;
  }
  input:-webkit-autofill {
    box-shadow: 0 0 0 30px white inset !important;
  }
  .bottom-line {
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: #666666;
    transition: background-color .3s;
    &.is-success {
      background-color: #00C236;
    }
    &.is-danger {
      background-color: #D60D0D;
    }
  }
  input:focus + .bottom-line {
    background-color: #30A1FF;
    &.is-success {
      background-color: #00C236;
    }
    &.is-danger {
      background-color: #D60D0D;
    }
  }
}
</style>