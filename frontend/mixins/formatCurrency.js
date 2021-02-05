export function formatCurrency(num, type) {
	if (type === 'eth' && num) {
		let num_parts = (num / 1e18).toFixed(4).toString().split('.')
		num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
		return num_parts.join('.')
	} else if (num && type === 'usdt') {
		let num_parts = (num / 1e6).toFixed(2).toString().split('.')
		num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
		return num_parts.join('.')
	} else if (num && type === 'rate') {
		let num_parts = num.toFixed(2).toString().split('.')
		num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
		return num_parts.join('.')
	} else if (num) {
		let num_parts = num.toFixed(2).toString().split('.')
		num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
		return num_parts.join('.')
	}
	return num
}

export function formatCurrencyReversed(num, type) {
	if (type === 'eth' && num) {
		return (num * 1e18).toString()
	} else if (num && type === 'usdt') {
		return (num * 1e6).toString()
	}
	return num
}

export function formatRepayBalnce(value) {
	return (value / 1e6)
		.toFixed(2)
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export default {
	methods: {
		formatCurrency,
		formatCurrencyReversed,
		formatRepayBalnce,
	},
}
