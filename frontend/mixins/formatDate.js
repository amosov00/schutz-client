import moment from 'moment'

export const timestampToDate = (timstamp) => {
	return moment.unix(timstamp).utc().add(3, 'hours').format('DD/MM/YYYY')
}

export const formatDate = (time) => {
	const offset = moment().utcOffset()
	return moment(time).add(offset, 'minutes').format('DD/MM/YYYY')
}

export default {
	methods: {
		timestampToDate,
		formatDate,

		timestampToDateTime(timstamp) {
			// Конвертация timestamp в обычный формат даты
			return moment
				.unix(timstamp)
				.utc()
				.add(3, 'hours')
				.format('DD/MM/YYYY HH:mm:ss')
		},
		timestampFromUtc(timestamp) {
			return moment(timestamp)
				.utc()
				.add(3, 'hours')
				.format('DD MMMM YYYY HH:mm:ss')
		},
		readableDate(timestamp) {
			return moment.unix(timestamp).utc().add(3, 'hours').format('DD MMMM YYYY')
		},
		readableDateWithoutDays(timestamp) {
			return moment.unix(timestamp).utc().add(3, 'hours').format('MMMM YYYY')
		},
		createdTime(timestamp) {
			return moment(timestamp).utc().format('DD MMMM YYYY')
		},
	},
}
