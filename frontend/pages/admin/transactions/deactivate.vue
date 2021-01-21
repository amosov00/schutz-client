<template lang="pug">
	div
		CustomSlider(hide-dots)
			template(slot="content")
				.is-fullheight
					.content.search_block.is-fullheight.is-fullwidth
						.reports__container
							.profile_block__title Деактивация транзакций
							.reports__body
								.reports__body_form_block
									base-input(
										label="ETH адрес юзера"
										v-model="params.user_address"
									).mb-5
									base-select(
										:options="contractOptions"
										label="Контракт:"
										v-model="params.contract"
									).mb-5
									base-datepicker(
										label="Дата закрытия:"
										v-model="params.close_timestamp"
									).mb-5
									b-checkbox(
										v-model="params.deactivate"
									).mb-5 Деактивировать?
								.transactions_deactivate__action_block
									CustomButton(style="width: 100%" @click.native="search").mt-4
										span(style="color: #846756") Предзагрузить транзакции
									CustomButton(style="width: 100%" @click.native="update").mt-2
										span(style="color: #846756") Изменить статус активации
		.container
			TransactionDeactivateTable(
				v-if="transactions.length > 0"
				:data="transactions"
			)

</template>

<script>
import {mapActions} from "vuex";
import {CustomSlider, CustomInput, CustomButton, CustomCheckbox} from "~/components"
import {TransactionDeactivateTable} from "~/components/tables";

import {NTS_CONTRACTS} from "~/consts";

export default {
	name: "deactivate",

	layout: "profile",
	middleware: ["adminRequired", "contracts"],

	components: {
		CustomSlider,
		CustomInput,
		CustomButton,
		CustomCheckbox,
		TransactionDeactivateTable
	},

	data() {
		return {
			params: {
				user_address: '',
				contract: '',
				close_timestamp: null,
				deactivate: true,
			},
			transactions: []
		}
	},

	computed: {
		contractOptions() {
			let options = []
			for (let [key, value] of Object.entries(NTS_CONTRACTS)) {
				options.push({
					text: key,
					value: value
				})
			}
			return options
		}
	},

	methods: {
		...mapActions({
			transactionsDeactivateFetch: "admin/transactionsDeactivateFetch",
			transactionsDeactivateUpdate: "admin/transactionsDeactivateUpdate"
		}),
		async search() {
			this.transactions = await this.transactionsDeactivateFetch(this.params)
		},
		async update() {
			this.transactions = await this.transactionsDeactivateUpdate(this.params)
		}
	}
}
</script>

<style lang="scss" scoped>

.transactions_deactivate__action_block {
	grid-column-start: 3;
	display: flex;
	justify-content: flex-end;
	height: 100%;
	flex-direction: column;
}

</style>
