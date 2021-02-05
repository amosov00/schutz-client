<template>
	<div class="container">
		<div class="level">
			<div class="level-left page-title">
				{{ $t('История транзакций') }}
			</div>
		</div>
		<b-table
			:data="filteredData"
			pagination-position="bottom"
			class="custom-table mb-4"
			:default-sort="['args.timestamp', 'asc']"
		>
			<template slot-scope="props">
				<b-table-column
					field="args.timestamp"
					:label="$t('Дата и время')"
					width="20%"
					sortable
					:custom-sort="sortByDate"
				>
					{{ timestampToDateTime(props.row.args.timestamp) }}
				</b-table-column>
				<b-table-column sortable :custom-sort="sortByEvent" field="event" :label="$t('Событие')" width="25%">
					{{ $t(props.row.event) }}
					<span class="tag is-link" v-if="props.row.isReinvested"> Reinvested </span>
				</b-table-column>
				<b-table-column class="has-text-primary overflow-reset" field="txHash" :label="$t('Хэш')" width="20%">
					<b-tooltip class="w-100" :label="props.row.transactionHash" type="is-black" position="is-bottom">
						<a :href="'https://etherscan.io/tx/' + props.row.transactionHash" target="_blank">
							{{ hashSlice(props.row.transactionHash) }}
						</a>
					</b-tooltip>
				</b-table-column>
				<b-table-column
					field="contract"
					:label="$t('Контракт')"
					width="15%"
					header-class="right-align"
					cell-class="text-right"
					sortable
					:custom-sort="sortByContract"
				>
					{{ props.row.contract }}
				</b-table-column>
				<b-table-column
					field="amountUSDT"
					:label="$t('Сумма, USDT')"
					width="10%"
					header-class="right-align"
					cell-class="text-right"
					align="right"
					sortable
					:custom-sort="sortByAmount"
				>
					{{ formatCurrency(props.row.args.USDT, 'usdt') }}
				</b-table-column>
			</template>
		</b-table>

		<div class="center mb-6">
			<button v-if="!hide_button" type="button" @click="showMore()" class="default-button">
				{{ $t('показать еще') }}
			</button>
		</div>

		<div class="is-size-5 has-background-info total-withdraw mb-6">
			{{ $t('Всего выведено:') }}
			{{ `${formatCurrency(withdrawTotal, 'usdt')}` }} USDT <br />
			{{ $t('Всего начислено дивидендов:') }}
			{{ `${formatCurrency(accrualTotal, 'usdt')}` }} USDT
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import formatDate from '~/mixins/formatDate'
import formatCurrency from '~/mixins/formatCurrency'
import formatText from '~/mixins/formatText'

export default {
	name: 'DividendsTable',
	mixins: [formatDate, formatCurrency, formatText],
	computed: {
		...mapGetters(['user']),
		tableData() {
			return this.$store.getters.transactions
		},
		filteredData() {
			let d = this.$store.getters.dividendsWithFilter(this.currentProduct)
			d.sort((a, b) => {
				if (this.sort_date) {
					if (this.sort_date == 'asc') {
						return b.args.timestamp - a.args.timestamp
					} else {
						return a.args.timestamp - b.args.timestamp
					}
				}

				if (this.sort_amount) {
					if (this.sort_amount == 'asc') {
						return b.args.USDT - a.args.USDT
					} else {
						return a.args.USDT - b.args.USDT
					}
				}

				if (this.sort_contract) {
					if (this.sort_contract == 'asc') {
						return b.contract.localeCompare(a.contract)
					} else {
						return a.contract.localeCompare(b.contract)
					}
				}

				if (this.sort_event) {
					if (this.sort_event == 'asc') {
						return b.event.localeCompare(a.event)
					} else {
						return a.event.localeCompare(b.event)
					}
				}
			})
			return d.slice(0, this.limit)
		},
		withdrawTotal() {
			let d = this.$store.getters.dividendsWithFilter(this.currentProduct)
			let result = 0
			d.forEach((el) => {
				switch (el.event) {
					case 'Dividend Withdraw':
						result += el.args.USDT
						break
				}
			})
			if (this.limit > this.filteredData.length) {
				this.hide_button = true
			}
			return result
		},
		accrualTotal() {
			let d = this.$store.getters.dividendsWithFilter(this.currentProduct)
			let result = 0
			d.forEach((el) => {
				switch (el.event) {
					case 'Dividend Accrual':
						result += el.args.USDT
						break
				}
			})
			return result
		},
		getStatusClass() {
			if (this.status === 'online') {
				return 'status-online'
			}
			return 'status-offline'
		},
		txTotals() {
			return this.$store.getters.txTotals
		},
	},

	methods: {
		showMore() {
			this.limit += 5
			if (this.limit > this.filteredData.length) {
				this.hide_button = true
			}
		},
		sortByDate(a, b, isAsc) {
			this.sort_date = isAsc ? 'asc' : 'desc'
			this.sort_event = false
			this.sort_contract = false
			this.sort_amount = false
		},
		sortByAmount(a, b, isAsc) {
			this.sort_date = false
			this.sort_event = false
			this.sort_contract = false
			this.sort_amount = isAsc ? 'asc' : 'desc'
		},
		sortByContract(a, b, isAsc) {
			this.sort_date = false
			this.sort_event = false
			this.sort_contract = isAsc ? 'asc' : 'desc'
			this.sort_amount = false
		},
		sortByEvent(a, b, isAsc) {
			this.sort_date = false
			this.sort_event = isAsc ? 'asc' : 'desc'
			this.sort_contract = false
			this.sort_amount = false
		},
	},

	data: () => ({
		limit: 5,
		hide_button: false,
		isEmpty: false,
		currentProduct: 'All',
		products: ['All', 'NTSCD', 'NTS80', 'NTS81', 'NTS165'],
		sort_date: 'asc',
		sort_event: false,
		sort_contract: false,
		sort_amount: false,
	}),
}
</script>

<style lang="scss">
.total-withdraw {
	padding: 10px 20px;
	border-radius: 12px;
	color: black;
}
.center {
	display: flex;
	align-items: center;
	justify-content: center;
}
.th-wrap {
	.is-invisible {
		display: none;
	}
}
</style>
