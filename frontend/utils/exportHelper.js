import { formatCurrency } from "~/mixins/formatCurrency";
import { timestampToDate, formatDate } from "~/mixins/formatDate";
import { getResult } from "~/consts";
import XLSX from "xlsx";

const typeAdapter = {
	investments: (data) =>
		data.map((dataItem) => ({
			Date: timestampToDate(dataItem.args.timestamp),
			Event: dataItem.event,
			Address: dataItem.args.customerAddress,
			TxHash: dataItem.transactionHash,
			Contract: dataItem.contract,
			"Amount ETH":
				formatCurrency(dataItem.args.ETH, "eth") ||
				formatCurrency(dataItem.args.incomingValue, "eth") ||
				formatCurrency(dataItem.args.incomingEthereum, "eth"),
			Rate: formatCurrency(dataItem.args.RATE, "rate"),
			"Amount USDT": formatCurrency(dataItem.args.USDT, "usdt"),
			Reinvested: dataItem.isReinvested ? "reinvested" : ""
		})),

	'dividend_withdraw': (data) =>
		data.map((dataItem) => ({
			Date: timestampToDate(dataItem.args.timestamp),
			Address: dataItem.args.customerAddress,
			TxHash: dataItem.transactionHash,
			Contract: dataItem.contract,
			"Amount ETH":
				formatCurrency(dataItem.args.ETH, "eth") ||
				formatCurrency(dataItem.args.incomingValue, "eth") ||
				formatCurrency(dataItem.args.incomingEthereum, "eth"),
			Rate: formatCurrency(dataItem.args.RATE, "rate"),
			"Amount USDT": formatCurrency(dataItem.args.USDT, "usdt")
		})),

	'deposit_accural': (data) =>
		data.map((dataItem) => ({
			Date: timestampToDate(dataItem.args.timestamp),
			Address: dataItem.args.customerAddress,
			TxHash: dataItem.transactionHash,
			Contract: dataItem.contract,
			"Amount ETH":
				formatCurrency(dataItem.args.ETH, "eth") ||
				formatCurrency(dataItem.args.incomingValue, "eth") ||
				formatCurrency(dataItem.args.incomingEthereum, "eth"),
			Rate: formatCurrency(dataItem.args.RATE, "rate"),
			"Amount USDT": formatCurrency(dataItem.args.USDT, "usdt")
		})),

	'dividend_accural': (data) =>
		data.map((dataItem) => ({
			Date: timestampToDate(dataItem.args.timestamp),
			Address: dataItem.args.customerAddress,
			TxHash: dataItem.transactionHash,
			Contract: dataItem.contract,
			"Amount ETH":
				formatCurrency(dataItem.args.ETH, "eth") ||
				formatCurrency(dataItem.args.incomingValue, "eth") ||
				formatCurrency(dataItem.args.incomingEthereum, "eth"),
			Rate: formatCurrency(dataItem.args.RATE, "rate"),
			"Amount USDT": formatCurrency(dataItem.args.USDT, "usdt")
		})),

	'deposit_withdraw': (data) =>
		data.map((dataItem) => ({
			Date: timestampToDate(dataItem.args.timestamp),
			Address: dataItem.args.customerAddress,
			TxHash: dataItem.transactionHash,
			Contract: dataItem.contract,
			"Amount ETH":
				formatCurrency(dataItem.args.ETH, "eth") ||
				formatCurrency(dataItem.args.incomingValue, "eth") ||
				formatCurrency(dataItem.args.incomingEthereum, "eth"),
			Rate: formatCurrency(dataItem.args.RATE, "rate"),
			"Amount USDT": formatCurrency(dataItem.args.USDT, "usdt")
		})),

	deposits: (data) =>
		data.map((dataItem) => ({
			"User ID": dataItem.user_id,
			Address: dataItem.ethereum_wallet,
			"Amount USDT": formatCurrency(dataItem.amount_usdt, "usdt"),
		})),

	agreements: (data) =>
		data.map((dataItem) => ({

			Id: dataItem._id,
			Address: dataItem.ethereum_wallet,
			Email: dataItem.email,
			Contract: dataItem.contract,
			'Amount USDT': formatCurrency(dataItem.amount, 'usdt'),
			'Close date': formatDate(dataItem.close_date),
			Mailing: formatDate(dataItem.created_at),
			Answers: getResult(dataItem.result)

		})),

	bills: (data) =>
		data.map((dataItem) => ({
			ID: dataItem._id,
			Address: dataItem.address,
			"TxHash": dataItem.payment_transaction_hash,
			"Invested USDT": formatCurrency(dataItem.deposit_usdt, "usdt"),
			"Total USDT": formatCurrency(dataItem.total_usdt, "usdt"),
		})),

	all: (data) =>
		data.map((dataItem) => ({
			Date: timestampToDate(dataItem.args.timestamp),
			Event: dataItem.event,
			Address: dataItem.args.customerAddress,
			TxHash: dataItem.transactionHash,
			Contract: dataItem.contract,
			"Amount USDT": formatCurrency(dataItem.args.USDT, "usdt"),
			Reinvested: dataItem.isReinvested ? "reinvested" : ""
		}))
}

export const reportTotalHelper = {
	all: (total) => {
		return [
			[
				total.deposit_accural
					? `Deposits accural: ${formatCurrency(
					total.deposit_accural,
					"usdt"
					)} USDT`
					: null
			],
			[
				total.deposit_withdraw
					? `Deposits withdraw: ${formatCurrency(
					total.deposit_withdraw,
					"usdt"
					)} USDT`
					: null
			],
			[
				total.dividend_accural
					? `Dividends accrual: ${formatCurrency(
					total.dividend_accural,
					"usdt"
					)} USDT`
					: null
			],
			[
				total.dividend_withdraw
					? `Dividends withdraw: ${formatCurrency(
					total.dividend_withdraw,
					"usdt"
					)} USDT`
					: null
			],
			[
				total.deposits
					? `Deposits: ${formatCurrency(
					total.deposits,
					"usdt"
					)} USDT`
					: null
			],
			[
				total.reinvestment
					? `Reinvestment: ${formatCurrency(
					total.reinvestment,
					"usdt"
					)} USDT`
					: null
			]
		];

	},

	deposits: (total) => [[`Total: ${formatCurrency(total, 'usdt')} USDT`]],

	agreements: (total) => [[`Total: ${formatCurrency(total, 'usdt')} USDT`]],

	default: (total) => {
		return [
			[
				total.dividends
					? `Deposits: ${formatCurrency(
					total.dividends,
					"usdt"
					)} USDT`
					: null
			],
			[
				total.reinvestment
					? `Total: ${formatCurrency(
					total.investments,
					"usdt"
					)} USDT`
					: null
			]
		];
	},
}

export const exportHelper = ({ data, type, totals = null }) => {
	const dataToExport = typeAdapter[type](data);
	const totalToExportHelper = reportTotalHelper[type] || reportTotalHelper.default;
	const dataTableWS = XLSX.utils.json_to_sheet(dataToExport);
	const wb = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(wb, dataTableWS, 'data'); // sheetAName is name of Worksheet

	if (totals) {
		XLSX.utils.sheet_add_aoa(dataTableWS, totalToExportHelper(totals), {
			origin: -1
		});
	}

	XLSX.writeFile(wb, `${type}.xlsx`);
}
