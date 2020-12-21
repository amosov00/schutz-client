import web3 from "~/utils/web3";
import {ToastProgrammatic as Toast} from 'buefy'

export const state = () => ({});
export const getters = {};
export const mutations = {};
export const actions = {
	async accrualInterest({rootGetters}, invoiceData) {
		/* Начисление дивидендов пользователям

		формат данных
		invoiceData: {
			values: [Intereger, ],
			customerAddresses: [String, ],
			comment: String
		}
	 */
		if (!window.ethereum) {
			console.error("Metamask is not found")
			return
		}

		const gasPrice = rootGetters["metamask/gasPrice"];
		let contract = this.$contracts().Schutz

		return await window.ethereum
			.request({
				method: 'eth_sendTransaction',
				params: [{
					from: ethereum.selectedAddress,
					to: contract._address,
					value: "0x00",
					gasPrice: web3.utils.toHex(web3.utils.toWei(`${gasPrice}`, "gwei")),
					gas: web3.utils.toHex("7500000"),
					data: contract.methods.accrualInterest(
						invoiceData.startIndex,
						invoiceData.values,
						invoiceData.customerAddresses,
						invoiceData.comment,
					).encodeABI()
				}],
			})
			.then(async (txHash) => {
				Toast.open({type: "is-success", message: txHash, duration: 3000})
				return txHash
			})
			.catch((error) => {
				Toast.open({type: "is-danger", message: "error", duration: 3000})
				return false
			});
	},
	async accrualDeposit({rootGetters}, data) {
		/* Закрытие депозитов пользователей

		формат данных
		data: {
			values: [Intereger, ],
			customerAddresses: [String, ],
			comment: String
		}
	 */
		if (!window.ethereum) {
			console.error("Metamask is not found")
			return
		}
		const gasPrice = rootGetters["metamask/gasPrice"];

		return window.ethereum
			.request({
				method: "eth_sendTransaction",
				params: [
					{
						from: window.ethereum.selectedAddress,
						to: this.$contracts().Schutz._address,
						value: "0x00",
						gasPrice: web3.utils.toHex(web3.utils.toWei(`${gasPrice}`, "gwei")),
						gas: web3.utils.toHex("7500000"),
						data: this.$contracts().Schutz.methods.accrualDeposit(
							0,
							data.values,
							data.customerAddresses,
							data.comment,
						).encodeABI()
					}
				]
			})
			.then(txHash => {
				Toast.open({type: "is-success", message: "Success", duration: 1000})
				return txHash
			})
			.catch(err => {
				Toast.open({type: "is-danger", message: "Error", duration: 1000})
				return false
			})
	}
};
