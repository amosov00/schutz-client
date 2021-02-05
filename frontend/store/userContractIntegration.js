import Web3 from 'web3'

/*
	allowance - количество разрешенные токенов для изменений в USDT
	tokenBalance - количество токенов на контракт = депозит пользователя
	interestBalance - токены - дивиденды пользователя
	depositBalance - токены закрытия депозита
 */
export const state = () => ({
	allowance: 0,
	tokenBalance: 0,
	interestBalance: 0,
	depositBalance: 0,
})

export const getters = {
	allowance: (s) => s.allowance,
	tokenBalance: (s) => s.tokenBalance,
	interestBalance: (s) => s.interestBalance,
	depositBalance: (s) => s.depositBalance,
}

export const mutations = {
	setAllowance: (state, value) => (state.allowance = value),
	setTokenBalance: (state, value) => (state.tokenBalance = value),
	setInterestBalance: (state, value) => (state.interestBalance = value),
	setDepositBalance: (state, value) => (state.depositBalance = value),
}

export const actions = {
	/* Открытие депозита */
	async deposit({ commit, dispatch, rootGetters }, value) {
		const gasPrice = rootGetters['metamask/gasPrice']
		const referralAddresses = await dispatch(
			'fetchReferralAddresses',
			{},
			{ root: true }
		)
		const ethAddress = rootGetters['metamask/ethAddress']
		const { contracts, metamask } = await this.$web3()

		return metamask.provider
			.request({
				method: 'eth_sendTransaction',
				params: [
					{
						from: ethAddress,
						to: contracts.Schutz._address,
						value: '0x00',
						gasPrice: Web3.utils.toHex(Web3.utils.toWei(`${gasPrice}`, 'gwei')),
						gas: Web3.utils.toHex('250000'),
						data: contracts.Schutz.methods
							.deposit(
								value * 1e6,
								referralAddresses.referral_1 ||
									'0x0000000000000000000000000000000000000000',
								referralAddresses.referral_2 ||
									'0x0000000000000000000000000000000000000000',
								referralAddresses.referral_3 ||
									'0x0000000000000000000000000000000000000000'
							)
							.encodeABI(),
					},
				],
			})
			.then(async (tx) => {
				commit('setIsTermsAcceped', false, { root: true })
				return true
			})
			.catch((err) => {
				return false
			})
	},
	/* Вывод InterestBalance */
	async withdraw({ rootGetters }, value) {
		const gasPrice = rootGetters['metamask/gasPrice']
		const ethAddress = rootGetters['metamask/ethAddress']
		const { contracts, metamask } = await this.$web3()

		return metamask.provider
			.request({
				method: 'eth_sendTransaction',
				params: [
					{
						from: ethAddress,
						to: contracts.Schutz._address,
						value: '0x00',
						gasPrice: Web3.utils.toHex(Web3.utils.toWei(`${gasPrice}`, 'gwei')),
						gas: Web3.utils.toHex('250000'),
						data: contracts.Schutz.methods.withdraw(value * 1e6).encodeABI(),
					},
				],
			})
			.then(async (tx) => {
				return true
			})
			.catch((err) => {
				return false
			})
	},
	/* Вывод средств с закрытия депозита DepositBalance */
	async closeDeposit({ rootGetters }, value) {
		const gasPrice = rootGetters['metamask/gasPrice']
		const ethAddress = rootGetters['metamask/ethAddress']
		const { contracts, metamask } = await this.$web3()

		return metamask.provider
			.request({
				method: 'eth_sendTransaction',
				params: [
					{
						from: ethAddress,
						to: contracts.Schutz._address,
						value: '0x00',
						gasPrice: Web3.utils.toHex(Web3.utils.toWei(`${gasPrice}`, 'gwei')),
						gas: Web3.utils.toHex('250000'),
						data: contracts.Schutz.methods
							.closeDeposit(value * 1e6)
							.encodeABI(),
					},
				],
			})
			.then(async (tx) => {
				return true
			})
			.catch((err) => {
				return false
			})
	},
	/* Реинвест средств InterestBalance */
	async reinvest({ rootGetters }, value) {
		const gasPrice = rootGetters['metamask/gasPrice']
		const ethAddress = rootGetters['metamask/ethAddress']
		const { contracts, metamask } = await this.$web3()

		return metamask.provider
			.request({
				method: 'eth_sendTransaction',
				params: [
					{
						from: ethAddress,
						to: contracts.Schutz._address,
						value: '0x00',
						gasPrice: Web3.utils.toHex(Web3.utils.toWei(`${gasPrice}`, 'gwei')),
						gas: Web3.utils.toHex('250000'),
						data: contracts.Schutz.methods.reinvest(value * 1e6).encodeABI(),
					},
				],
			})
			.then(async (tx) => {
				return true
			})
			.catch((err) => {
				return false
			})
	},
	/* allowence */
	async allowUSDT({ rootGetters, commit, dispatch }) {
		const gasPrice = rootGetters['metamask/gasPrice']
		const ethAddress = rootGetters['metamask/ethAddress']
		const { contracts, metamask } = await this.$web3()

		return metamask.provider
			.request({
				method: 'eth_sendTransaction',
				params: [
					{
						from: ethAddress,
						to: contracts.USDT._address,
						value: '0x00',
						gasPrice: Web3.utils.toHex(Web3.utils.toWei(`${gasPrice}`, 'gwei')),
						gas: Web3.utils.toHex('250000'),
						data: contracts.USDT.methods
							.approve(contracts.Schutz._address, 1000000e6)
							.encodeABI(),
					},
				],
			})
			.then(async (tx) => {
				await dispatch('depositToggle', true, { root: true })
				commit('deposit/setAllowance', 1000000, { root: true })
			})
			.catch((_) => {})
	},

	/* main function to fetch all required balances */
	async fetchBalances({ dispatch, getters, rootGetters }) {
		const address = rootGetters['user'].ethereum_wallet

		if (!address) {
			return
		}

		if (!getters['tokenBalance']) {
			await dispatch('fetchTokenBalance', address)
		}
		if (!getters['interestBalance']) {
			await dispatch('fetchInterestBalance', address)
		}
		if (!getters['depositBalance']) {
			await dispatch('fetchDepositBalance', address)
		}
		if (!getters['allowance']) {
			await dispatch('fetchAllowance', address)
		}
	},
	async fetchAllowance({ commit, dispatch }, address) {
		const { contracts } = await this.$web3()

		return contracts.USDT.methods
			.allowance(address, contracts.Schutz._address)
			.call()
			.then((allowance) => {
				commit('setAllowance', Math.round(allowance / 1e6))
				return true
			})
			.catch((_) => {
				return false
			})
	},
	async fetchTokenBalance({ commit }, address) {
		const { contracts } = await this.$web3()

		return contracts.Schutz.methods
			.balanceOf(address)
			.call()
			.then((balance) => {
				commit('setTokenBalance', balance / 1e6)
				return true
			})
			.catch((_) => {
				return false
			})
	},
	async fetchInterestBalance({ commit }, address) {
		const { contracts } = await this.$web3()

		return contracts.Schutz.methods
			.interestBalance_(address)
			.call()
			.then((balance) => {
				commit('setInterestBalance', balance / 1e6)
				return true
			})
			.catch((_) => {
				return false
			})
	},
	async fetchDepositBalance({ commit, dispatch, rootGetters }, address) {
		const { contracts } = await this.$web3()

		return contracts.Schutz.methods
			.depositBalance_(address)
			.call()
			.then((balance) => {
				commit('setDepositBalance', balance / 1e6)
				return true
			})
			.catch((_) => {
				return false
			})
	},
}
