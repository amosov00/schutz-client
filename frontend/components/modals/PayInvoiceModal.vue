<template lang="pug">
  div.invoice-modal
    div.title.is-5.main-title Confirm invoice payment {{invoice._id}}
    div.subtitle ({{readableDateWithoutDays(invoice.timestamp_from)}} - {{readableDateWithoutDays(invoice.timestamp_to)}})
    b-skeleton(v-if="loading" animated)
    section(v-else)
      p Total subinvoices to pay: {{ totalAddresses }}
      b-tabs(position="is-centered" class="block")
        b-tab-item(v-for="(invoiceData, index) in invoicePaymentData" :label="`${index * 100} - ${(index + 1) * 100}`" :key="index")
          div.subtitle.is-5 Subtotal USDT: {{ formatCurrency(invoiceTotals[index], "usdt") }}
          p.d-flex(v-if="Boolean(paymentHashFromIndex(index))")
            a.mr-auto(:href="'https://etherscan.io/tx/' + paymentHashFromIndex(index)[1]" target="_blank").text-clamp TX hash: {{paymentHashFromIndex(index)[1].slice(0, 50)}}...
            a.has-text-danger(@click="removePayment(paymentHashFromIndex(index)[0], invoiceData)") Удалить
          b-button.my-3(type="is-primary" @click="payInvoice(index, invoiceData)" :disabled="Boolean(paymentHashFromIndex(index)) || invoiceData.hasProblem" expanded)
            | Pay to {{invoiceData.values.length}} addresses
          b-table(:data="toTableData(invoiceData)" :columns="tableColumns" striped :paginated='true' per-page="20")

</template>

<script>
import formatCurrency from "~/mixins/formatCurrency";
import formatDate from '~/mixins/formatDate'

export default {
  name: "PayInvoiceModal",
  props: ["invoice"],
  mixins: [formatCurrency, formatDate],
  data() {
    return {
      loading: false,
      invoicePaymentData: [],
      invoiceTotals: [],
      tableColumns: [
        {field: 'address', label: 'Address'},
        {field: 'value', label: 'Value', width: 60},
        {field: 'comment', label: 'Comment'},
      ]
    }
  },
  computed: {
    totalAddresses() {
      return this.invoicePaymentData.reduce((acc, curr) => {
        acc += curr.values.length
        return acc
      }, 0)
    },
  },
  methods: {
    async payInvoice(index, data) {
      return await this.$store.dispatch("bills/payGlobalInvoice", {
        invoice: this.invoice,
        index: index,
        invoiceData: data,
      })
    },
    async removePayment(index, data) {
      return await this.$store.dispatch("bills/removePaymentTx", {
        invoice: this.invoice,
        index: index,
        customerAddresses: data.customerAddresses,
      })
    },
    paymentHashFromIndex(index) {
      return this.invoice.payment_transaction_hash.filter(i => i[0] === index)[0]
    },
    toTableData(data) {
      let formattedData = []
      for (let i = 0; i < data.values.length; i++) {
        formattedData.push({
          "address": data.customerAddresses[i],
          "value": this.formatCurrency(data.values[i], "usdt"),
          "comment": data.comments[i],
        })
      }
      return formattedData

    }
  },

  async created() {
    this.loading = true
    let response = await this.$store.dispatch("bills/fetchInvoicePaymentData", this.invoice._id);
    if (!response) {
      this.loading = false
      return
    }
    this.invoicePaymentData = response.invoices
    this.invoiceTotals = response.totals
    this.loading = false
    if (this.invoicePaymentData.length === 0) {
      console.error("error")
    }
  },
}
</script>

<style lang="sass" scoped>
.invoice-modal
  background: #ffffff
  padding: 40px 73px
  margin: auto

.my-3
  margin: 1rem 0

.mr-auto
  margin-right: auto

.d-flex
  display: flex
</style>
