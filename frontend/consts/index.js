export const NTS_CONTRACTS = {
	NTSCD: "NTSCD",
	NTS80: "NTS80",
	NTS81: "NTS81",
	NTS165: "NTS165",
	SCHUTZ: "Schutz",
	SCHUTZV1: "SchutzV1"
}

export const METAMASK_STATE = {
	OFFLINE: "offline",
	WAITING: "waiting",
	ONLINE: "online"
}

export const LEGAL_DOC_TYPE = {
	TERMS: "terms-and-conditions",
	LIMITATIONS: "limitation-of-liability",
	PRIVACY: "privacy-policy"
}

export const getResult = (res) => {
	// UNMARKED =  1CLOSE = 2 PROLONG = 3 NOT_SENT = 4 PROLONG_ADMIN = 5 PAID = 6
	let result = ''
	switch (res) {
		case 1:
			result = 'Не ответил'
			break
		case 2:
			result = 'Закрыть'
			break
		case 3:
			result = 'Продлить'
			break
		case 5:
			result = 'Продлить'
			break
	}
	return result
}
