<template lang="pug">
	div
		b-table(:data="tableData" v-if="colsType === 'all'" striped hoverable :loading="loading" :paginated='true' pagination-simple
			default-sort="args.timestamp" pagination-position="bottom")
				template(slot-scope="props")
					b-table-column(field="args.timestamp" label="Date" sortable width="50") {{ timestampToDate(props.row.args.timestamp) }}
					b-table-column(field="event" label="Event" width="50") {{ props.row.event }}
						span(class="tag is-link" v-if="props.row.isReinvested") Reinvested
					b-table-column(field="address" label="Address" width="150").has-text-primary.overflow-reset
						b-tooltip(:label="props.row.args.customerAddress" type="is-black" position="is-bottom").w-100
							a(:href="'https://etherscan.io/address/' + props.row.args.customerAddress" target="_blank").text-clamp
								text-highlight(:queries="queryParams.query") {{ props.row.args.customerAddress }}
					b-table-column(field="txHash" label="txHash" width="150").has-text-primary.overflow-reset
						b-tooltip(:label="props.row.transactionHash" type="is-black" position="is-bottom").w-100
							a(:href="'https://etherscan.io/tx/' + props.row.transactionHash" target="_blank").text-clamp
								text-highlight(:queries="queryParams.query") {{ props.row.transactionHash }}
					b-table-column(field="contract" label="Contract" width="20" header-class="right-align" cell-class="text-right") {{ showContract(props.row) }}
					b-table-column(field="amountUSDT" label="Amount, USDT" width="50" sortable header-class="right-align" cell-class="text-right") {{ formatCurrency(props.row.args.USDT, 'usdt')}}
				template(slot="footer")
					.divider
				template(slot="bottom-left")
					div
						p Deposits accural: {{`${formatCurrency(totals.deposit_accural, 'usdt')} USDT`}}
						p Deposits withdraw: {{`${formatCurrency(totals.deposit_withdraw, 'usdt')} USDT`}}
						p Dividends accural: {{`${formatCurrency(totals.dividend_accural, 'usdt')} USDT`}}
						p Dividends withdraw: {{`${formatCurrency(totals.dividend_withdraw, 'usdt')} USDT`}}
						p Deposits: {{`${formatCurrency(totals.deposits, 'usdt')} USDT`}}
						p Reinvestment: {{`${formatCurrency(totals.reinvestment, 'usdt')} USDT`}}
						.divider
						p {{$t('export')}}
							a(@click="saveAsExcel") .xls
		//- investments
		b-table(:data="tableData" v-if="colsType === 'investments'" hoverable striped :loading="loading" :paginated='true' pagination-simple
			default-sort="args.timestamp" pagination-position="bottom")
				template(slot-scope="props")
					b-table-column(field="args.timestamp" label="Date" sortable width="50") {{ timestampToDate(props.row.args.timestamp) }}
					b-table-column(field="event" label="Event" width="50") {{ props.row.event }}
						span(class="tag is-link" v-if="props.row.isReinvested") Reinvested
					b-table-column(field="address" label="Address" width="150").has-text-primary.overflow-reset
						b-tooltip(:label="props.row.args.customerAddress" type="is-black" position="is-bottom").w-100
							a(:href="'https://etherscan.io/address/' + props.row.args.customerAddress" target="_blank").text-clamp
								text-highlight(:queries="queryParams.query") {{ props.row.args.customerAddress }}
					b-table-column(field="txHash" label="txHash" width="150").has-text-primary.overflow-reset
						b-tooltip(:label="props.row.transactionHash" type="is-black" position="is-bottom").w-100
							a(:href="'https://etherscan.io/tx/' + props.row.transactionHash" target="_blank").text-clamp
								text-highlight(:queries="queryParams.query") {{ props.row.transactionHash }}
					b-table-column(field="contract" label="Contract" width="20" header-class="right-align" cell-class="text-right") {{ showContract(props.row) }}
					b-table-column(field="rate" label="Rate" width="50" header-class="right-align" cell-class="text-right") {{ formatCurrency(props.row.args.RATE, 'rate') }}
					b-table-column(field="amountETH" label="Amount, USDT" width="50" sortable header-class="right-align" cell-class="text-right") {{ formatCurrency(props.row.args.USDT, 'usdt')}}
				template(slot="footer")
					.divider
				template(slot="bottom-left")
					div
						p.title.is-size-4 Total: {{`${formatCurrency(totals.investments, 'usdt')} USDT`}}
						p Reinvests: {{`${formatCurrency(totals.reinvestment, 'usdt')} USDT`}}
						p Deposits: {{`${formatCurrency(totals.deposits, 'usdt')} USDT`}}
						.divider
						p {{$t('export')}}
							a(@click="saveAsExcel") .xls

		//- dividend_withdraw
		b-table(:data="tableData" v-if="colsType === 'dividend_withdraw'" striped :loading="loading" :paginated='true' pagination-simple
			default-sort="args.timestamp" pagination-position="bottom")
				template(slot-scope="props")
					b-table-column(field="args.timestamp" label="Date" sortable width="50") {{ timestampToDate(props.row.args.timestamp) }}
					b-table-column(field="address" label="Address" width="150").has-text-primary.overflow-reset
						b-tooltip(:label="props.row.args.customerAddress" type="is-black" position="is-bottom").w-100
							a(:href="'https://etherscan.io/address/' + props.row.args.customerAddress" target="_blank").text-clamp
								text-highlight(:queries="queryParams.query") {{ props.row.args.customerAddress }}
					b-table-column(field="txHash" label="txHash" width="150").has-text-primary.overflow-reset
						b-tooltip(:label="props.row.transactionHash" type="is-black" position="is-bottom").w-100
							a(:href="'https://etherscan.io/tx/' + props.row.transactionHash" target="_blank").text-clamp
								text-highlight(:queries="queryParams.query") {{ props.row.transactionHash }}
					b-table-column(field="contract" label="Contract" width="20" header-class="right-align" cell-class="text-right") {{ props.row.contract }}
					b-table-column(field="rate" label="Rate" width="50" header-class="right-align" cell-class="text-right").text-right {{ formatCurrency(props.row.args.RATE, 'rate') }}
					b-table-column(field="amountETH" label="Amount, USDT" width="50" sortable header-class="right-align" cell-class="text-right").text-right {{ formatCurrency(props.row.args.USDT, 'usdt')}}
				template(slot="footer")
					.divider
				template(slot="bottom-left")
					div
						p Dividends withdraw: {{`${formatCurrency(totals.dividend_withdraw, 'usdt')} USDT`}}
						.divider
						p {{$t('export')}}
							a(@click="saveAsExcel") .xls
		//- deposit_accural
		b-table(:data="tableData" v-if="colsType === 'deposit_accural'" striped :loading="loading" :paginated='true' pagination-simple
			default-sort="args.timestamp" pagination-position="bottom")
				template(slot-scope="props")
					b-table-column(field="args.timestamp" label="Date" sortable width="50") {{ timestampToDate(props.row.args.timestamp) }}
					b-table-column(field="address" label="Address" width="150").has-text-primary.overflow-reset
						b-tooltip(:label="props.row.args.customerAddress" type="is-black" position="is-bottom").w-100
							a(:href="'https://etherscan.io/address/' + props.row.args.customerAddress" target="_blank").text-clamp
								text-highlight(:queries="queryParams.query") {{ props.row.args.customerAddress }}
					b-table-column(field="txHash" label="txHash" width="150").has-text-primary.overflow-reset
						b-tooltip(:label="props.row.transactionHash" type="is-black" position="is-bottom").w-100
							a(:href="'https://etherscan.io/tx/' + props.row.transactionHash" target="_blank").text-clamp
								text-highlight(:queries="queryParams.query") {{ props.row.transactionHash }}
					b-table-column(field="contract" label="Contract" width="20" header-class="right-align" cell-class="text-right") {{ props.row.contract }}
					b-table-column(field="rate" label="Rate" width="50" header-class="right-align" cell-class="text-right").text-right {{ formatCurrency(props.row.args.RATE, 'rate') }}
					b-table-column(field="amountETH" label="Amount, USDT" width="50" sortable header-class="right-align" cell-class="text-right").text-right {{ formatCurrency(props.row.args.USDT, 'usdt')}}
				template(slot="footer")
					.divider
				template(slot="bottom-left")
					div
						p Deposits accural: {{`${formatCurrency(totals.deposit_accural, 'usdt')} USDT`}}
						.divider
						p {{$t('export')}}
							a(@click="saveAsExcel") .xls
		//- dividens_accural
		b-table(:data="tableData" v-if="colsType === 'dividend_accural'" hoverable striped :loading="loading" :paginated='true' pagination-simple
			default-sort="args.timestamp" pagination-position="bottom")
				template(slot-scope="props")
					b-table-column(field="args.timestamp" label="Date" sortable width="50") {{ timestampToDate(props.row.args.timestamp) }}
					b-table-column(field="address" label="Address" width="150").has-text-primary.overflow-reset
						b-tooltip(:label="props.row.args.customerAddress" type="is-black" position="is-bottom").w-100
							a(:href="'https://etherscan.io/address/' + props.row.args.customerAddress" target="_blank").text-clamp
								text-highlight(:queries="queryParams.query") {{ props.row.args.customerAddress }}
					b-table-column(field="transactionHash" label="TxHash" width="150").has-text-primary.overflow-reset
						b-tooltip(:label="props.row.transactionHash" type="is-black" position="is-bottom").w-100
							a(:href="'https://etherscan.io/tx/' + props.row.transactionHash" target="_blank").text-clamp
								text-highlight(:queries="queryParams.query") {{ props.row.transactionHash }}
					b-table-column(field="contract" label="Contract" width="20" header-class="right-align" cell-class="text-right") {{ props.row.contract }}
					b-table-column(field="rate" label="Rate" width="50" header-class="right-align" cell-class="text-right").text-right {{ formatCurrency(props.row.args.RATE, 'rate') }}
					b-table-column(field="amountETH" label="Amount, USDT" width="50" sortable header-class="right-align" cell-class="text-right").text-right {{ formatCurrency(props.row.args.USDT, 'usdt')}}
				template(slot="footer")
					.divider
				template(slot="bottom-left")
					div
						p Dividends accural: {{`${formatCurrency(totals.dividend_accural, 'usdt')} USDT`}}
						.divider
						p {{$t('export')}}
							a(@click="saveAsExcel") .xls
		b-table(:data="tableData" v-if="colsType === 'deposit_withdraw'" striped :loading="loading" :paginated='true' pagination-simple
			default-sort="args.timestamp" pagination-position="bottom")
				template(slot-scope="props")
					b-table-column(field="args.timestamp" label="Date" sortable width="50") {{ timestampToDate(props.row.args.timestamp) }}
					b-table-column(field="address" label="Address" width="150").has-text-primary.overflow-reset
						b-tooltip(:label="props.row.args.customerAddress" type="is-black" position="is-bottom").w-100
							a(:href="'https://etherscan.io/address/' + props.row.args.customerAddress" target="_blank").text-clamp
								text-highlight(:queries="queryParams.query") {{ props.row.args.customerAddress }}
					b-table-column(field="transactionHash" label="TxHash" width="150").has-text-primary.overflow-reset
						b-tooltip(:label="props.row.transactionHash" type="is-black" position="is-bottom").w-100
							a(:href="'https://etherscan.io/tx/' + props.row.transactionHash" target="_blank").text-clamp
								text-highlight(:queries="queryParams.query") {{ props.row.transactionHash }}
					b-table-column(field="contract" label="Contract" width="20" header-class="right-align" cell-class="text-right") {{ props.row.contract }}
					b-table-column(field="amountETH" label="Amount, USDT" width="50" header-class="right-align" cell-class="text-right").text-right {{ formatCurrency(props.row.args.USDT, 'usdt')}}
				template(slot="footer")
					.divider
				template(slot="bottom-left")
					div
						p Deposits withdraw: {{`${formatCurrency(totals.deposit_withdraw, 'usdt')} USDT`}}
						.divider
						p {{$t('export')}}
							a(@click="saveAsExcel") .xls
		b-table(:data.sync="activeDepositsByID.contracts" v-if="colsType === 'active_deposits_detail'" striped :loading="loading" :paginated='true' pagination-simple
			 pagination-position="bottom")
				template(slot-scope="props")
					b-table-column(field="contract" label="Contract" width="30") {{showContract(props.row)}}
					b-table-column(field="open_date" label="Open date" width="30") {{timestampToDate(props.row.open_date)}}
					b-table-column(field="close_date" label="Close date" width="30")
						a(@click="showCloseDateModal(props.row)") {{ timestampToDate(props.row.close_date) }}
					b-table-column(field="is_active" label="Active" width="30").has-text-primary.overflow-reset
						span(v-if="props.row.is_active").green Active
						span(v-else).red Not active
					b-table-column(field="amount_usdt" label="Amount, USDT" width="30" header-class="right" cell-class="text-right") {{ formatCurrency(props.row.amount_usdt, 'usdt')}}
					b-table-column(field="button" width="70" cell-class="text-right").overflow-reset
						nuxt-link(:to="`/reports/${$route.params.id}/${props.row.contract}`")
							b-button(type="is-info" size="is-small") История вкладов
				template(slot="footer")
					.divider
				template(slot="bottom-left")
					div
						p.title.is-size-4 Total: {{`${formatCurrency(activeDepositsByID.total, 'usdt')} USDT`}}
						p.title.is-size-4 Total active: {{`${formatCurrency(activeDepositsByID.total_active, 'usdt')} USDT`}}
		b-table(:data="activeDepositTransactions.transactions" v-if="colsType === 'active_deposits_transactions'" striped :loading="loading" :paginated='true' pagination-simple
			 pagination-position="bottom")
				template(slot-scope="props")
					b-table-column(field="args.timestamp" label="Date" width="50") {{timestampToDate(props.row.args.timestamp)}}
					b-table-column(field="event" label="Event" width="50") {{props.row.event}}
						span(class="tag is-link" v-if="props.row.isReinvested") Reinvested
					b-table-column(field="txHash" label="TxHash" width="150") {{props.row.transactionHash}}
					b-table-column.text-right(field="amount_usdt" label="Amount, USDT" width="50" header-class="right" cell-class="text-right") {{ formatCurrency(props.row.args.USDT, 'usdt')}}
				template(slot="footer")
				template(slot="bottom-left")
					div
						p.title.is-size-4 Total: {{`${formatCurrency(activeDepositTransactions.total_usdt, 'usdt')} USDT`}}
						p Deposits: {{`${formatCurrency(activeDepositTransactions.total_deposits, 'usdt')} USDT`}}
						p Reinvests: {{`${formatCurrency(activeDepositTransactions.total_reinvests, 'usdt')} USDT`}}
</template>

<script>
import UpdateCloseDateModal from "~/components/modals/UpdateCloseDateModal";
import formatDate from "~/mixins/formatDate";
import formatCurrency from "~/mixins/formatCurrency";
import XLSX from "xlsx";
import moment from "moment";

export default {
  components: {UpdateCloseDateModal},
  props: [
    "colsType",
    "loading",
    "contractName",
    "queryParams",
    "activeDepositTransactions"
  ],
  mixins: [formatDate, formatCurrency],
  methods: {
    showContract(data) {
      return data.prolongedContract ? `${data.contract} (${data.prolongedContract})` : data.contract
    },
    showCloseDateModal(data) {
      let modal = this.$buefy.modal.open({
          parent: this,
          component: UpdateCloseDateModal,
          trapFocus: true,
          props: {
            activeDeposit: this.activeDepositsByID,
            contract: data
          }
        });
      modal.$on('close', async () => (await this.reloadActiveDeposits()))
    },
    async reloadActiveDeposits() {
      await this.$store.dispatch("reports/fetchActiveDepositByID", this.activeDepositsByID._id)
    },
    saveAsExcel() {
      const dataTableWS = XLSX.utils.json_to_sheet(this.exportedFileData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, dataTableWS, "data"); // sheetAName is name of Worksheet
      XLSX.utils.sheet_add_aoa(dataTableWS, this.exportedTotalsData, {
        origin: -1
      });
      // export Excel file
      XLSX.writeFile(wb, `${this.colsType}_${this.exportedFileDate}.xlsx`);
    }
  },
  computed: {
    activeDepositsByID() {
      return this.$store.getters["reports/activeDepositsByID"]
    },
    tableData() {
      return this.$store.getters["reports/transactions"] !== null
        ? this.$store.getters["reports/transactions"]
        : [];
    },
    activeDeposits() {
      return this.$store.getters["reports/activeDeposits"] !== null
        ? this.$store.getters["reports/activeDeposits"]
        : [];
    },
    totals() {
      return this.$store.getters["reports/totals"]
        ? this.$store.getters["reports/totals"]
        : "";
    },
    exportedFileDate() {
      if (!this.queryParams.fromDate && !this.queryParams.toDate) {
        return "all";
      } else if (this.queryParams.fromDate && this.queryParams.toDate) {
        return `${moment
          .utc(this.queryParams.fromDate)
          .utcOffset(240)
          .format("DD-MM-YYYY")}_${moment
          .utc(this.queryParams.toDate)
          .utcOffset(240)
          .format("DD-MM-YYYY")}`;
      } else if (this.queryParams.fromDate && !this.queryParams.toDate) {
        return `${moment
          .utc(this.queryParams.fromDate)
          .utcOffset(240)
          .format("DD-MM-YYYY")}_${moment()
          .utc()
          .format("DD-MM-YYYY")}`;
      }
    },
    exportedFileData() {
      const data = this.tableData.map(el => {
        if (this.colsType === "investments") {
          return {
            Date: this.timestampToDate(el.args.timestamp),
            Event: el.event,
            Address: el.args.customerAddress,
            TxHash: el.transactionHash,
            Contract: el.contract,
            "Amount ETH":
              this.formatCurrency(el.args.ETH, "eth") ||
              this.formatCurrency(el.args.incomingValue, "eth") ||
              this.formatCurrency(el.args.incomingEthereum, "eth"),
            Rate: this.formatCurrency(el.args.RATE, "rate"),
            "Amount USDT": this.formatCurrency(el.args.USDT, "usdt"),
            Reinvested: el.isReinvested ? "reinvested" : ""
          };
        } else if (this.colsType === "dividend_withdraw") {
          return {
            Date: this.timestampToDate(el.args.timestamp),
            Address: el.args.customerAddress,
            TxHash: el.transactionHash,
            Contract: el.contract,
            "Amount ETH":
              this.formatCurrency(el.args.ETH, "eth") ||
              this.formatCurrency(el.args.incomingValue, "eth") ||
              this.formatCurrency(el.args.incomingEthereum, "eth"),
            Rate: this.formatCurrency(el.args.RATE, "rate"),
            "Amount USDT": this.formatCurrency(el.args.USDT, "usdt")
          };
        } else if (this.colsType === "deposit_accural") {
          return {
            Date: this.timestampToDate(el.args.timestamp),
            Address: el.args.customerAddress,
            TxHash: el.transactionHash,
            Contract: el.contract,
            "Amount ETH":
              this.formatCurrency(el.args.ETH, "eth") ||
              this.formatCurrency(el.args.incomingValue, "eth") ||
              this.formatCurrency(el.args.incomingEthereum, "eth"),
            Rate: this.formatCurrency(el.args.RATE, "rate"),
            "Amount USDT": this.formatCurrency(el.args.USDT, "usdt")
          };
        } else if (this.colsType === "dividend_accural") {
          return {
            Date: this.timestampToDate(el.args.timestamp),
            Address: el.args.customerAddress,
            TxHash: el.transactionHash,
            Contract: el.contract,
            "Amount ETH":
              this.formatCurrency(el.args.ETH, "eth") ||
              this.formatCurrency(el.args.incomingValue, "eth") ||
              this.formatCurrency(el.args.incomingEthereum, "eth"),
            Rate: this.formatCurrency(el.args.RATE, "rate"),
            "Amount USDT": this.formatCurrency(el.args.USDT, "usdt")
          };
        } else if (this.colsType === "deposit_withdraw") {
          return {
            Date: this.timestampToDate(el.args.timestamp),
            Address: el.args.customerAddress,
            TxHash: el.transactionHash,
            Contract: el.contract,
            "Amount ETH":
              this.formatCurrency(el.args.ETH, "eth") ||
              this.formatCurrency(el.args.incomingValue, "eth") ||
              this.formatCurrency(el.args.incomingEthereum, "eth"),
            Rate: this.formatCurrency(el.args.RATE, "rate"),
            "Amount USDT": this.formatCurrency(el.args.USDT, "usdt")
          };
        } else if (this.colsType === "all") {
          return {
            Date: this.timestampToDate(el.args.timestamp),
            Event: el.event,
            Address: el.args.customerAddress,
            TxHash: el.transactionHash,
            Contract: el.contract,
            "Amount USDT": this.formatCurrency(el.args.USDT, "usdt"),
            Reinvested: el.isReinvested ? "reinvested" : ""
          };
        }
      });
      return data;
    },
    exportedTotalsData() {
      if (this.colsType === "all") {
        return [
          [
            this.totals.deposit_accural
              ? `Deposits accural: ${this.formatCurrency(
                  this.totals.deposit_accural,
                  "usdt"
                )} USDT`
              : null
          ],
          [
            this.totals.deposit_withdraw
              ? `Deposits withdraw: ${this.formatCurrency(
                  this.totals.deposit_withdraw,
                  "usdt"
                )} USDT`
              : null
          ],
          [
            this.totals.dividend_accural
              ? `Dividends accural: ${this.formatCurrency(
                  this.totals.dividend_accural,
                  "usdt"
                )} USDT`
              : null
          ],
          [
            this.totals.dividend_withdraw
              ? `Dividends withdraw: ${this.formatCurrency(
                  this.totals.dividend_withdraw,
                  "usdt"
                )} USDT`
              : null
          ],
          [
            this.totals.deposits
              ? `Deposits: ${this.formatCurrency(
                  this.totals.deposits,
                  "usdt"
                )} USDT`
              : null
          ],
          [
            this.totals.reinvestment
              ? `Reinvestment: ${this.formatCurrency(
                  this.totals.reinvestment,
                  "usdt"
                )} USDT`
              : null
          ]
        ];
      } else {
        return [
          [
            this.totals.dividends
              ? `Deposits: ${this.formatCurrency(
                  this.totals.dividends,
                  "usdt"
                )} USDT`
              : null
          ],
          [
            this.totals.reinvestment
              ? `Total: ${this.formatCurrency(
                  this.totals.investments,
                  "usdt"
                )} USDT`
              : null
          ]
        ];
      }
    }
  }
};
</script>

<style lang="scss">
.w-20 {
  width: 20px;
}
.green {
  color: green;
}
.red {
  color: red;
}
.b-table {
  & > .level {
    flex-direction: row-reverse;
  }
  td.text-right {
    text-align: right !important;
  }
  th.text-right {
    text-align: right !important;
  }
  th {
    text-align: right !important;
  }

  th.right {
    & > * {
    float: right;
    }
  }
}
</style>
