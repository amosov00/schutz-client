import moment from 'moment'
import _ from 'lodash'

import { ToastProgrammatic as Toast } from 'buefy'

export const state = () => ({
	addressInvoiceData: null,
	createdInvoices: [],
	invoiceDataByID: {},
	addressTransactions: [],
})
export const getters = {
	addressInvoiceData: (s) => s.addressInvoiceData,
	createdInvoices: (s) => s.createdInvoices,
	invoiceDataByID: (s) => s.invoiceDataByID,
	addressTransactions: (s) => s.addressTransactions,
}
export const mutations = {
	setAddressInvoiceData: (state, payload) => {
		state.addressInvoiceData = payload
	},
	setInvoiceDataByID: (state, payload) => (state.invoiceDataByID = payload),
	addPaymentTxToInvoiceDataByID: (state, payload) =>
		(state.invoiceDataByID.payment_transaction_hash = _.union(state.invoiceDataByID.payment_transaction_hash, [
			payload,
		])),
	removePaymentTxToInvoiceDataByID: (state, index) =>
		(state.invoiceDataByID.payment_transaction_hash = state.invoiceDataByID.payment_transaction_hash.filter(
			(i) => i[0] !== index
		)),
	setCreatedInvoices: (state, payload) => (state.createdInvoices = payload),
	setTxHashInLocal: (state, data) => {
		state.invoiceDataByID.invoice_addresses.find((el) => {
			if (el._id === data.id) {
				el.payment_transaction_hash = data.txHash
				el.is_paid = true
			}
		})
	},
	setTotalInLocal: (state, data) => {
		if (!_.isEmpty(state.invoiceDataByID.invoice_addresses)) {
			state.invoiceDataByID.invoice_addresses.find((el) => {
				if (el._id === data.id) {
					el.total_usdt = data.total_usdt
				}
			})
		} else if (!_.isEmpty(state.addressInvoiceData)) {
			state.addressInvoiceData.total_usdt = data.total_usdt
		}
	},
	setAddressTransactions: (state, payload) => {
		payload.forEach((el) => {
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
		state.addressTransactions = payload
	},
	deleteInvoiceFromStore(state, id) {
		state.createdInvoices.splice(
			state.createdInvoices.findIndex((el) => {
				return el._id === id
			}),
			1
		)
	},
}
export const actions = {
	async fetchInvoiceById({ commit }, id) {
		const { data } = await this.$axios.get(`/admin/invoices/${id}/`)
		commit('setInvoiceDataByID', data)
	},
	async createInvoice({ commit }, invoiceData) {
		const fromDate = moment.utc(invoiceData.fromDate).add(1, 'days').startOf('day').add(3, 'hours').unix()
		const toDate = moment.utc(invoiceData.toDate).add(1, 'days').endOf('month').subtract(3, 'hours').unix()
		return await this.$axios
			.post('/admin/invoices/', {
				timestamp_from: fromDate,
				timestamp_to: toDate,
			})
			.then(() => {
				return true
			})
			.catch(() => {
				return false
			})
	},
	async fetchCreatedInvoices({ commit }) {
		const { data } = await this.$axios.get('/admin/invoices/')
		commit('setCreatedInvoices', data)
	},
	async markInvoiceAsApproved({}, id) {
		return await this.$axios.put(`/admin/invoices/${id}/addresses/`, {
			is_approved: true,
		})
	},
	async updateInvoiceAddessTxHash({ commit }, data) {
		return await this.$axios
			.put(`/admin/invoices/address/${data.id}/`, {
				payment_transaction_hash: data.txHash,
			})
			.then(() => {
				commit('setTxHashInLocal', data)
			})
	},
	async updateTotal({ commit }, data) {
		return await this.$axios
			.put(`/admin/invoices/address/${data.id}/`, {
				total_usdt: data.total_usdt,
			})
			.then(() => {
				commit('setTotalInLocal', data)
			})
	},
	async fetchDetailedAddressData({ commit, dispatch }, id) {
		dispatch('fetchAddressTransactions', id)
		const { data } = await this.$axios.get(`/admin/invoices/address/${id}/`)
		commit('setAddressInvoiceData', data)
	},
	async fetchAddressTransactions({ commit }, id) {
		const { data } = await this.$axios.get(`/admin/invoices/address/${id}/transactions/`)
		commit('setAddressTransactions', data)
	},
	async fetchInvoicePaymentData({}, _id) {
		return await this.$axios
			.get(`/admin/invoices/${_id}/payment/`)
			.then((resp) => resp.data)
			.catch((err) => {
				Toast.open({
					type: 'is-danger',
					message: 'Failed to validate invoice data',
					duration: 2000,
				})
				return null
			})
	},
	async fetchInvoiceAddressPaymentData({}, { invoiceId, invoicePaymentId }) {
		return await this.$axios
			.get(`/admin/invoices/${invoiceId}/payment/${invoicePaymentId}/`)
			.then((resp) => {
				return resp.data
			})
			.catch((_) => {
				Toast.open({
					type: 'is-danger',
					message: 'Failed to validate invoice data',
					duration: 2000,
				})
				return null
			})
	},
	async deleteInvoice({ state, commit }, id) {
		return await this.$axios.delete(`/admin/invoices/${id}/`).then(() => {
			commit('deleteInvoiceFromStore', id)
		})
	},
	async addPaymentTx({ commit }, { invoice, index, txHash, customerAddresses }) {
		this.$axios
			.post(`/admin/invoices/${invoice._id}/payment/add/`, {
				index: index,
				txHash: txHash,
				customerAddresses: customerAddresses,
			})
			.then(() => {
				commit('addPaymentTxToInvoiceDataByID', [index, txHash])
			})
			.catch(() => {})
	},
	async removePaymentTx({ commit }, { invoice, index, customerAddresses }) {
		this.$axios
			.post(`/admin/invoices/${invoice._id}/payment/remove/`, {
				index: index,
				customerAddresses: customerAddresses,
			})
			.then(() => {
				Toast.open({ type: 'is-success', message: 'Success', duration: 1000 })
				commit('removePaymentTxToInvoiceDataByID', index)
			})
			.catch(() => {
				Toast.open({ type: 'is-danger', message: 'Error', duration: 1000 })
			})
	},
	async getBillExtendedData({}, id) {
		try {
			const { data } = await this.$axios.get(`/admin/invoices/${id}/extended/`, {
				params: {
					as_excel: true,
				},
				responseType: 'blob',
			})

			return data
		} catch (e) {
			console.error(e)
		}
	},
}
