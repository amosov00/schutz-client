import Web3 from 'web3'
import { recoverTypedSignatureLegacy } from 'eth-sig-util'

export async function makeEthSignature(store, metamaskProvider) {
	const ethAddress = store.getters['metamask/ethAddress']
	const msgPayload = await store.dispatch('meta/fetchTermsAndConditions')

	const result = await metamaskProvider.request({
		method: 'eth_signTypedData',
		params: [msgPayload, Web3.utils.toChecksumAddress(ethAddress)],
		from: Web3.utils.toChecksumAddress(ethAddress),
	})

	const recovered = recoverTypedSignatureLegacy({
		data: msgPayload,
		sig: result,
	})

	if (Web3.utils.toChecksumAddress(recovered) !== Web3.utils.toChecksumAddress(ethAddress)) {
		throw new Error('invalid signature')
	}

	return result
}
