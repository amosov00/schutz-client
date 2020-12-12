<template >
<b-table
	:data="activeDeposits.active_deposits"
	striped
	:loading="loading"
	:paginated='true'
	pagination-simple
	pagination-position="bottom"
	default-sort="amount_usdt"
	default-sort-direction="desc"
>
  <template slot-scope="props">
      <b-table-column class="overflow-reset" field="user_id" label="User ID" width="150">
        <nuxt-link :to="`/users/${props.row.user_id}`">
          {{props.row.user_id}}
        </nuxt-link>
      </b-table-column>
      <b-table-column class="has-text-primary overflow-reset" label="ETH Address" width="150" type="is-black" position="is-bottom">
        <b-tooltip class="" :label="props.row.ethereum_wallet" type="is-black" position="is-bottom">
          <a :href="'https://etherscan.io/address/' + props.row.ethereum_wallet" target="_blank">
          {{props.row.ethereum_wallet}}
          </a>
        </b-tooltip>
      </b-table-column>
      <b-table-column field="amount_usdt" label="Amount, USDT" width="50" sortable header-class="right" cell-class="text-right">
        {{ formatCurrency(props.row.amount_usdt, 'usdt')}}
      </b-table-column>
      <b-table-column field="button" width="50" header-class="right-align" cell-class="text-right">
        <nuxt-link :to="`/reports/${props.row._id}`">
        <b-button type="is-info">
          Просмотр
        </b-button>
        </nuxt-link>
      </b-table-column>
  </template>
  <template slot="footer">
      <div class="divider"></div>
  </template>
      <template slot="bottom-left">
          <div>
            <p class="title is-size-4">
              Total: {{`${formatCurrency(activeDeposits.total, 'usdt')} USDT`}}
            </p>
            <p>{{$t('export')}}
              <a @click="saveAsExcel">.xls</a>
            </p>
            <p>{{$t('exportAll')}}
              <a @click="saveAsExcelAll">.xls</a>
            </p>
          </div>
      </template>
</b-table>
</template>

<script>
import formatCurrency from '~/mixins/formatCurrency'
import XLSX from "xlsx";
import {saveAs} from 'file-saver';


export default {
  props: {
    loading: Boolean
  },
  mixins: [formatCurrency],
  computed: {
    activeDeposits() {
      return this.$store.getters["reports/activeDeposits"] !== null
        ? this.$store.getters["reports/activeDeposits"]
        : [];
    },
    exportedFileData() {
			return this.activeDeposits.active_deposits.map(el => {
				return {
					"User ID": el.user_id,
					Address: el.ethereum_wallet,
					"Amount USDT": this.formatCurrency(el.amount_usdt, "usdt"),
				};
			})
    },
    exportedTotalsData() {
      return `Total:${this.formatCurrency(this.activeDeposits.total, 'usdt')} USDT`
    }
  },
  methods: {
    saveAsExcel() {
      const dataTableWS = XLSX.utils.json_to_sheet(this.exportedFileData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, dataTableWS, "data"); // sheetAName is name of Worksheet
      XLSX.writeFile(wb, `active_deposits.xlsx`);
    },
    async saveAsExcelAll() {
      this.$axios.get("/admin/active-deposits/extended/",{
        params: {as_excel: true},
        responseType: "blob"
      }).then(resp => {
        saveAs(resp.data, `active_deposits_all.xlsx`)
      }).catch(e => {
        console.log(e)
      })
    },
  },
};
</script>

<style></style>
