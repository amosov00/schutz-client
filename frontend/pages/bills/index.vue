<template lang="pug">
  div
    h1.title.is-2 {{$t('bills')}}
    div.box
      b-table(:data="tableData" striped :paginated='true' pagination-simple
      default-sort="args.timestamp" pagination-position="bottom").bill-table
        template(slot-scope="props")
          b-table-column(field="id" label="ID" width="70").overflow-reset
            b-tooltip(:label="props.row._id" type="is-black" position="is-bottom")
              nuxt-link(:to="`/bills/${props.row._id}`") {{props.row._id}}
          b-table-column(field="date" label="Date" width="120") {{ timestampFromUtc(props.row.created_at) }}
          b-table-column(field="totalUSDT" label="Total, USDT"  width="30") {{ formatCurrency(props.row.total_usdt, 'usdt') }}
          b-table-column(field="totalInvestedUSDT" label="Invested, USDT"  width="30") {{ formatCurrency(props.row.deposit_usdt, 'usdt') }}
          b-table-column(field="delete" label=""  width="90").has-text-right
            b-button(type="is-info is-small" @click="triggerPayInvoiceModal(props.row)" :loading="loading") {{$t('pay')}}
            b-button(type="is-info is-light is-small" @click="deleteInvoice(props.row._id)").ml-1.delete-btn
              b-icon(type="is-info" icon="close")
        template(slot="footer")
          .divider
        template(slot="bottom-left")
          div
            nuxt-link(class="is-primary button" to="/bills/create") {{$t('createBill')}}
</template>

<script>
import formatCurrency from "~/mixins/formatCurrency";
import formatDate from '~/mixins/formatDate'
import PayInvoiceModal from "~/components/modals/PayInvoiceModal";

export default {
  name: "bills",
  layout: "admin",
  mixins: [formatCurrency, formatDate],
  middleware: ["adminRequired"],
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async deleteInvoice(id) {
      this.$buefy.dialog.confirm({
        type: 'is-danger',
        confirmText: this.$t('delete'),
        cancelText: this.$t('cancel'),
        message: `<div class="mb-2">${this.$t('deleteBill')}</div><strong>${id}</strong>`,
        onConfirm: async () => {
          await this.$store.dispatch('bills/deleteInvoice', id)
        }
      })
    },
    triggerPayInvoiceModal(invoice) {
      this.$buefy.modal.open({
        parent: this,
        component: PayInvoiceModal,
        trapFocus: true,
        props: {
          invoice: invoice,
        }
      });
    },
  },
  computed: {
    tableData() {
      return this.$store.getters["bills/createdInvoices"];
    }
  },
  async asyncData({store}) {
    await store.dispatch("bills/fetchCreatedInvoices")
  }
};
</script>

<style lang="sass" scoped>
.delete-btn
  visibility: hidden
  border: 1px solid #E66696!important

.bill-table
  tr
    &:hover
      background-color: #f3f1f1 !important
      cursor: default
      .delete-btn
        visibility: visible
</style>
