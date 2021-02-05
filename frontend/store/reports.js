import moment from 'moment'
import { formatCurrencyReversed } from '@/mixins/formatCurrency'
import { itemPagination } from '~/utils/pagination'

const MUTATION = {
	SET_AGREEMENTS: 'SET_AGREEMENTS',
}

export const state = () => ({
	reportData: [],
	activeDeposits: [],
	activeDepositsByID: [],
	activeDepositTransactions: [],

	agreements: [],
	total: 0,
	totalUsers: 0,
	totalProlong: 0,
	totalProcessing: 0,
	totalPayout: 0,
})
export const mutations = {
	setReportData: (state, payload) => {
		payload.transactions.forEach((el) => {
			switch (el.event.toLowerCase()) {
				case 'ontokenpurchase':
					el.event = 'Deposit'
					break
				case 'onreinvestment':
					el.event = 'Reinvest'
					break
				case 'onwithdraw':
					el.event = 'Dividend Withdraw'
					break
				case 'oninterestpassed':
					el.event = 'Dividend Accrual'
					break
				case 'ongotrepay':
					el.event = 'Deposit Withdraw'
					break
				case 'onrepaypassed':
					el.event = 'Deposit Accrual'
					break
			}
		})
		state.reportData = payload
	},
	setActiveDepositTransactions: (state, payload) => {
		payload.transactions.forEach((el) => {
			switch (el.event.toLowerCase()) {
				case 'ontokenpurchase':
					el.event = 'Deposit'
					break
				case 'onreinvestment':
					el.event = 'Reinvest'
					break
				case 'onwithdraw':
					el.event = 'Dividend Withdraw'
					break
				case 'oninterestpassed':
					el.event = 'Dividend Accrual'
					break
				case 'ongotrepay':
					el.event = 'Deposit Withdraw'
					break
				case 'onrepaypassed':
					el.event = 'Deposit Accrual'
					break
			}
		})
		state.activeDepositTransactions = payload
	},
	setActiveDeposits: (state, payload) => (state.activeDeposits = payload),
	setActiveDepositsByID: (state, payload) =>
		(state.activeDepositsByID = payload),
	setActiveDepositsByIDContracts: (state, payload) =>
		(state.activeDepositsByID.contracts = payload),

	[MUTATION.SET_AGREEMENTS](
		state,
		{ agreements, total, total_prolong, total_processing, total_payout }
	) {
		state.agreements = agreements

		state.total = total
		state.totalProcessing = total_processing
		state.totalProlong = total_prolong
		state.totalPayout = total_payout
	},
}
export const actions = {
	async fetchTransactionsByQuery({ commit }, queryParams) {
		const fromUSDT = queryParams.fromUSDT
			? formatCurrencyReversed(queryParams.fromUSDT, 'usdt')
			: null
		const toUSDT = queryParams.toUSDT
			? formatCurrencyReversed(queryParams.toUSDT, 'usdt')
			: null
		const contract = queryParams.contract === 'all' ? '' : queryParams.contract

		if (queryParams.transaction === 'deposits') {
			return this.$axios
				.get('/admin/active-deposits/', {
					params: {
						q: queryParams.query,
						usdt_from: fromUSDT,
						usdt_to: toUSDT,
					},
				})
				.then((res) => {
					commit('setActiveDeposits', res.data)
					return true
				})
				.catch((err) => {
					return false
				})
		} else {
			return this.$axios
				.get('/admin/transactions/', {
					params: {
						q: queryParams.query,
						contract: contract,
						transaction_type: queryParams.transaction,
						timestamp_from: queryParams.fromDate,
						timestamp_to: queryParams.toDate,
						usdt_from: fromUSDT,
						usdt_to: toUSDT,
					},
				})
				.then((res) => {
					commit('setReportData', res.data)
					return true
				})
				.catch((err) => {
					return false
				})
		}
	},
	async fetchTransactionsByQueryV1({ commit }, queryParams) {
		const fromUSDT = queryParams.fromUSDT
			? formatCurrencyReversed(queryParams.fromUSDT, 'usdt')
			: null
		const toUSDT = queryParams.toUSDT
			? formatCurrencyReversed(queryParams.toUSDT, 'usdt')
			: null
		const contract = queryParams.contract === 'all' ? '' : queryParams.contract
		const fromDate = queryParams.fromDate
			? moment
					.utc(queryParams.fromDate)
					.add(1, 'days')
					.startOf('day')
					.subtract(3, 'hours')
					.unix()
			: 0
		const toDate = queryParams.toDate
			? moment
					.utc(queryParams.toDate)
					.endOf('day')
					.add(1, 'days')
					.subtract(3, 'hours')
					.unix()
			: 0

		if (queryParams.transaction === 'deposits') {
			return this.$axios
				.get('/admin/active-deposits/', {
					params: {
						q: queryParams.query,
						usdt_from: fromUSDT,
						usdt_to: toUSDT,
					},
				})
				.then((res) => {
					commit('setActiveDeposits', res.data)
					return true
				})
				.catch((err) => {
					return false
				})
		} else {
			return this.$axios
				.get('/admin/transactions/', {
					params: {
						q: queryParams.query,
						contract: contract,
						transaction_type: queryParams.transaction,
						timestamp_from: fromDate,
						timestamp_to: toDate,
						usdt_from: fromUSDT,
						usdt_to: toUSDT,
					},
				})
				.then((res) => {
					commit('setReportData', res.data)
					return true
				})
				.catch((err) => {
					return false
				})
		}
	},
	async fetchActiveDepositByID({ commit }, id) {
		await this.$axios.get(`/admin/active-deposits/${id}/`).then((resp) => {
			commit('setActiveDepositsByID', resp.data)
		})
	},
	async fetchActiveDepositTransactions({ commit }, params) {
		const { data } = await this.$axios.get(
			`/admin/active-deposits/${params.id}/${params.contract}/`
		)
		commit('setActiveDepositTransactions', data)
	},
	async updateCloseDate({ commit }, activeDeposit) {
		await this.$axios
			.put(`/admin/active-deposits/${activeDeposit._id}/`, {
				deposits: activeDeposit.contracts,
			})
			.then(() => {})
			.catch((err) => {
				console.error(err)
			})
		commit('setActiveDepositsByIDContracts', activeDeposit.contracts)
	},
	async updateAgreement({ commit }, agreement) {
		try {
			await this.$axios.put(
				`/admin/mailing/agreements/${agreement._id}/`,
				agreement
			)

			return true
		} catch (e) {
			return false
		}
	},
	async fetchAgreementPayment({}, timestamp) {
		return await this.$axios
			.get(`/admin/mailing/agreements/get_payload/`, {
				params: {
					target_close_date_timestamp: timestamp,
				},
			})
			.then((resp) => {
				return resp.data
			})
			.catch(() => {
				return false
			})
	},
	//
	async updateAgreementPayment({}, { ids, txHash }) {
		return await this.$axios
			.post(`/admin/mailing/agreements/mark_paid/`, {
				agreements_ids: ids,
				tx_hash: txHash,
			})
			.then(() => {
				return true
			})
			.catch(() => {
				return false
			})
	},
	async mailingSend({ commit }, body) {
		try {
			await this.$axios.post(`/admin/mailing/send/`, body)

			return Promise.resolve()
		} catch (e) {
			await Promise.reject(e)
		}
	},
	async fetchAgreements({ commit }, targetDate = 0) {
		const { data } = await this.$axios.get('/admin/mailing/agreements/', {
			params: {
				target_close_date_timestamp: targetDate,
			},
		})

		commit(MUTATION.SET_AGREEMENTS, data)
		return data
	},
}
export const getters = {
	transactions: (s) => s.reportData.transactions,
	totals: (s) => s.reportData.totals,
	activeDeposits: (s) => s.activeDeposits,
	activeDepositsByID: (s) => s.activeDepositsByID,
	activeDepositTransactions: (s) => s.activeDepositTransactions,

	total: (state) => ({
		total: state.total,
		totalProcessing: state.totalProcessing,
		totalProlong: state.totalProlong,
		totalPayout: state.totalPayout,
	}),

	itemsPagination: (state) => (itemType) => (page, limit, sort = null) => {
		const items = {
			activeDepositContracts:
				state.activeDepositsByID &&
				state.activeDepositsByID.contracts &&
				state.activeDepositsByID.contracts.length
					? [...state.activeDepositsByID.contracts]
					: null,
			transactions:
				state.reportData &&
				state.reportData.transactions &&
				state.reportData.transactions.length
					? [...state.reportData.transactions]
					: null,
			activeDeposits:
				state.activeDeposits.active_deposits &&
				state.activeDeposits.active_deposits.length
					? [...state.activeDeposits.active_deposits]
					: null,
		}

		if (!items[itemType]) return []

		return itemPagination(items[itemType])({ page, limit, sort })
	},

	agreements: (state) => state.agreements,

	agreementsWithFilter: (state) => ({ searchQuery, limit = 20, page = 1 }) => {
		const elements = searchQuery
			? state.agreements.filter(
					({ ethereum_wallet, email, _id }) =>
						(ethereum_wallet && ethereum_wallet.indexOf(searchQuery) >= 0) ||
						(email && email.indexOf(searchQuery) >= 0) ||
						(_id && _id.indexOf(searchQuery) >= 0)
			  )
			: state.agreements

		if (limit === -1) return elements

		const endOn =
			elements.length < page * limit ? elements.length : page * limit

		const elementsToShow = []

		for (let i = 0; i < endOn; i++) {
			elementsToShow.push(elements[i])
		}

		return elementsToShow
	},
}
