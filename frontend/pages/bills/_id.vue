<template lang="pug">
  div
    h1.title.is-2 Invoice info
    div.box
      h1.subtitle.is-4 Invoice created at: {{timestampFromUtc(tableData.created_at)}}
      div.columns
        div.column
          h1.subtitle.is-4 From: {{readableDateWithoutDays(tableData.timestamp_from)}}
        div.column
          h1.subtitle.is-4 To: {{readableDateWithoutDays(tableData.timestamp_to)}}
      div.columns
        div.column
          h1.subtitle.is-4 Total ETH: {{formatCurrency(tableData.total_eth, 'eth')}}
        div.column
          h1.subtitle.is-4 Total USDT: {{formatCurrency(tableData.total_usdt, 'usdt')}}
      div.subtitle.is-4(v-if="tableData.invoice_addresses")
        h1.subtitle.is-4 Total Subinvoices: {{tableData.invoice_addresses.length}}
      div.subtitle.is-4(v-if="tableData.payment_transaction_hash && tableData.payment_transaction_hash.length") Payment transactions:
        p.is-5(v-for="(tx, index) in tableData.payment_transaction_hash") {{tx[0] + 1}}:
          a(:href="'https://etherscan.io/tx/' + tx[1]" target="_blank").text-clamp {{"\t" + tx[1].slice(0, 50)}}...
      div.columns
        div.column
          b-button(type="is-info" @click="triggerPayInvoiceModal") {{$t('pay')}}
        div.column
          b-button(type="is-info" @click="saveAsExcel") {{$t('export')}} .xls
        div.column
          b-button(type="is-info" @click="saveAsExcelAll") {{$t('exportAll')}} .xls
      div.box
        b-field(label="Search Address")
          b-input(placeholder="Type query here..." @input="changeInput($event)" v-model="searchQuery")
      .divider.ma-1
      h1.subtitle.is-3 Addresses
      b-table(:data="searchQuery.length >= 3 ? filteredTable : tableData.invoice_addresses" striped :paginated='true' pagination-simple
      default-sort="args.timestamp" pagination-position="bottom")
        template(slot-scope="props")
          b-table-column(field="id" label="ID" width="100")
            nuxt-link(:to="`/bills/address/${props.row._id}`").text-clamp {{props.row._id}}
          b-table-column(field="address" label="Address" width="150").has-text-primary.overflow-reset
            b-tooltip(:label="props.row.address" type="is-black" position="is-bottom").w-100
              a(:href="'https://etherscan.io/address/' + props.row.address" target="_blank").text-clamp {{ props.row.address }}
          b-table-column(field="totalInvestedUSDT" label="Invested, USDT" width="40") {{ formatCurrency(props.row.deposit_usdt, 'usdt') }}
          b-table-column(field="totalUSDT" label="Total, USDT" width="40")
            a(class="terms-link" @click="updateTotalModal({value: props.row.total_usdt, id: props.row._id})") {{ formatCurrency(props.row.total_usdt, 'usdt') }}
          b-table-column(field="delete" label="" width="20")
            PayInvoiceButton(:invoiceData="props.row")
</template>

<script>
import formatCurrency from '~/mixins/formatCurrency'
import formatDate from '~/mixins/formatDate'
import PayInvoiceButton from '~/components/PayInvoiceButton'
import PayInvoiceModal from '~/components/modals/PayInvoiceModal'
import moment from 'moment'
import XLSX from 'xlsx'
import _ from 'lodash'
import { saveAs } from 'file-saver'

export default {
	name: 'bills_id',
	layout: 'admin',
	mixins: [formatCurrency, formatDate],
	components: { PayInvoiceButton },
	middleware: ['authRequired', 'adminRequired'],
	data() {
		return {
			searchQuery: '',
			filteredTable: [],
		}
	},
	created() {
		this.$store.dispatch('bills/fetchInvoiceById', this.$route.params.id)
	},
	methods: {
		updateTotalModal(data) {
			this.$buefy.dialog.prompt({
				message: `Total USDT`,
				inputAttrs: {
					type: 'number',
					placeholder: 'Type total here',
					value: (data.value / 1e6).toFixed(2),
					min: 0,
					step: 'any',
				},
				trapFocus: true,
				onConfirm: (value) => this.updateTotalAction({ total_usdt: value * 1e6, id: data.id }),
			})
		},
		updateTotalAction(data) {
			this.$store
				.dispatch('bills/updateTotal', data)
				.then(() =>
					this.$buefy.toast.open({
						message: 'Total updated!',
						type: 'is-success',
					})
				)
				.catch(() =>
					this.$buefy.toast.open({
						message: 'Something went wrong!',
						type: 'is-danger',
					})
				)
		},
		changeInput(e) {
			this.filter()
		},
		filter() {
			if (this.searchQuery.length >= 3) {
				this.filteredTable = _.filter(this.tableData.invoice_addresses, (el) => {
					if (el.address !== null && el.address.toLowerCase().startsWith(this.searchQuery.toLowerCase())) {
						return el
					} else {
						return false
					}
				})
			} else {
				this.filteredTable = []
			}
		},
		saveAsExcel() {
			const dataTableWS = XLSX.utils.json_to_sheet(this.exportedFileData)
			const wb = XLSX.utils.book_new()
			XLSX.utils.book_append_sheet(wb, dataTableWS, 'data') // sheetAName is name of Worksheet
			XLSX.writeFile(wb, `bills.xlsx`)
		},
		async saveAsExcelAll() {
			this.$axios
				.get(`/admin/invoices/${this.tableData._id}/extended/`, {
					params: { as_excel: true },
					responseType: 'blob',
				})
				.then((resp) => {
					saveAs(resp.data, `invoice_${this.tableData._id}_all.xlsx`)
				})
				.catch((e) => {
					console.log(e)
				})
		},
		triggerPayInvoiceModal() {
			this.$buefy.modal.open({
				parent: this,
				component: PayInvoiceModal,
				trapFocus: true,
				props: {
					invoice: this.tableData,
				},
			})
		},
	},
	computed: {
		tableData() {
			return this.$store.getters['bills/invoiceDataByID']
		},
		createdAt() {
			return moment(this.tableData.created_at).utc().format('Do MMMM YYYY, h:mm:ss a')
		},
		exportedFileData() {
			const data = this.tableData.invoice_addresses.map((el) => {
				return {
					ID: el._id,
					Address: el.address,
					TxHash: el.payment_transaction_hash,
					'Invested USDT': this.formatCurrency(el.deposit_usdt, 'usdt'),
					'Total USDT': this.formatCurrency(el.total_usdt, 'usdt'),
				}
			})
			return data
		},
	},
}
</script>

<style lang="sass">
.ma-1
  margin-top: 10px
  margin-bottom: 10px

.is-5
  font-size: 1.15rem
</style>
