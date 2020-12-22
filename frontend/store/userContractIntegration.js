import web3 from "~/utils/web3";
import {ToastProgrammatic as Toast} from 'buefy'
import _ from "lodash";

export const state = () => ({
	allowance: 0,
	totalDeposit: 0,
	totalDividends: 0,
	depositBalance: 0,
});

export const getters = {
	allowance: s => s.allowance,
	totalDeposit: s => s.totalDeposit,
	totalDividends: s => s.totalDividends,
	depositBalance: s => s.depositBalance,
};

export const mutations = {};

export const actions = {
	async deposit({commit, dispatch, rootGetters}, value) {
		const gasPrice = rootGetters['metamask/gasPrice']
		const user = rootGetters["user"]
		return window.ethereum
			.request({
				method: "eth_sendTransaction",
				params: [
					{
						from: window.ethereum.selectedAddress,
						to: this.$contracts().Schutz._address,
						value: "0x00",
						gasPrice: web3.utils.toHex(web3.utils.toWei(`${gasPrice}`, "gwei")),
						gas: web3.utils.toHex("250000"),
						data: this.$contracts().Schutz.methods.deposit(
							value * 1e6,
							user.referral_1 || "0x0000000000000000000000000000000000000000",
							user.referral_2 || "0x0000000000000000000000000000000000000000",
							user.referral_3 || "0x0000000000000000000000000000000000000000",
						).encodeABI()
					}]
			})
			.then(async tx => {
				commit("setIsTermsAcceped", false, {root: true});
				return true
			})
			.catch(err => {
				return false
			})
	},
	async withdraw({rootGetters}, value) {
		const gasPrice = rootGetters['metamask/gasPrice']
		console.log(value * 1e6)
		return window.ethereum
			.request({
				method: "eth_sendTransaction",
				params: [
					{
						from: window.ethereum.selectedAddress,
						to: this.$contracts().Schutz._address,
						value: "0x00",
						gasPrice: web3.utils.toHex(web3.utils.toWei(`${gasPrice}`, "gwei")),
						gas: web3.utils.toHex("250000"),
						data: this.$contracts().Schutz.methods.withdraw(
							value * 1e6
						).encodeABI()
					}]
			})
			.then(async tx => {
				return true
			})
			.catch(err => {
				return false
			})
	},
	async closeDeposit({rootGetters}, value) {
		const gasPrice = rootGetters['metamask/gasPrice']
		return window.ethereum
			.request({
				method: "eth_sendTransaction",
				params: [
					{
						from: window.ethereum.selectedAddress,
						to: this.$contracts().Schutz._address,
						value: "0x00",
						gasPrice: web3.utils.toHex(web3.utils.toWei(`${gasPrice}`, "gwei")),
						gas: web3.utils.toHex("250000"),
						data: this.$contracts().Schutz.methods.closeDeposit(
							value * 1e6
						).encodeABI()
					}]
			})
			.then(async tx => {
				return true
			})
			.catch(err => {
				return false
			})
	},
	async reinvest({rootGetters}, value) {
		const gasPrice = rootGetters['metamask/gasPrice']
		return window.ethereum
			.request({
				method: "eth_sendTransaction",
				params: [
					{
						from: window.ethereum.selectedAddress,
						to: this.$contracts().Schutz._address,
						value: "0x00",
						gasPrice: web3.utils.toHex(web3.utils.toWei(`${gasPrice}`, "gwei")),
						gas: web3.utils.toHex("250000"),
						data: this.$contracts().Schutz.methods.reinvest(
							value * 1e6
						).encodeABI()
					}]
			})
			.then(async tx => {
				return true
			})
			.catch(err => {
				return false
			})
	},
	async allowUSDT({rootGetters, commit, dispatch}) {
		const gasPrice = rootGetters['metamask/gasPrice']

		return window.ethereum.request({
			method: "eth_sendTransaction",
			params: [
				{
					from: window.ethereum.selectedAddress,
					to: this.$contracts().USDT._address,
					value: "0x00",
					gasPrice: web3.utils.toHex(web3.utils.toWei(`${gasPrice}`, "gwei")),
					gas: web3.utils.toHex("250000"),
					data: this.$contracts().USDT.methods.approve(
						this.$contracts().Schutz._address, 1000000e6
					).encodeABI()
				}]
		}).then(tx => {
			dispatch("depositToggle", true, {root: true});
			commit("deposit/setAllowance", 1000000, {root: true})
		}).catch(_ => {
		})
	},
}
