import Web3 from "web3";
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
		const ethAddress = rootGetters['metamask/ethAddress']
		const {contracts, metamask} = await this.$web3()

		return metamask.provider
			.request({
				method: 'eth_sendTransaction',
				params: [{
					from: ethAddress,
					to: contracts.Schutz._address,
					value: "0x00",
					gasPrice: Web3.utils.toHex(Web3.utils.toWei(`${gasPrice}`, "gwei")),
					gas: Web3.utils.toHex("7500000"),
					data: contracts.Schutz.methods.accrualInterest(
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
		const ethAddress = rootGetters['metamask/ethAddress']
		const {contracts, metamask} = await this.$web3()

		return metamask.provider
			.request({
				method: "eth_sendTransaction",
				params: [
					{
						from: ethAddress,
						to: contracts.Schutz._address,
						value: "0x00",
						gasPrice: Web3.utils.toHex(Web3.utils.toWei(`${gasPrice}`, "gwei")),
						gas: Web3.utils.toHex("7500000"),
						data: contracts.Schutz.methods.accrualDeposit(
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
