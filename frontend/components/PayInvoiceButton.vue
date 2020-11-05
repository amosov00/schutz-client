<template lang="pug">
  b-button(type="is-info" @click.once="payInvoice") {{$t('payInvoice')}}
</template>

<script>
export default {
  props: {
    invoiceData: {
      type: Object,
      required: true
    }
  },
  methods: {
    payInvoice() {
      this.$store.dispatch("bills/payInvoice", this.invoiceData);
    }
  }
};
</script>

<style></style>
