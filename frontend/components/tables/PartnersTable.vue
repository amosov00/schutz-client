<template>
	<div class="container">
		<div class="level">
			<div class="level-left is-size-5 has-text-primary mb-4">
				{{ $t("История транзакций") }}
			</div>
		</div>
		<b-table
			:data="partners"
			pagination-simple="pagination-simple"
			default-sort="referral_level"
			class="custom-table mb-4"
		>
			<template slot-scope="props">
				<b-table-column
					class="text-clamp"
					field="created_at"
					:label="$t('registrationDate')"
					width="200"
					sortable="sortable"
					>{{
						props.row.created_at
							? new Date(props.row.created_at).toLocaleString()
							: ""
					}}
				</b-table-column>
				<b-table-column
					class="text-clamp"
					field="fullname"
					:label="$t('fullName')"
					>{{ props.row.first_name }} {{ props.row.last_name }}
				</b-table-column>
				<b-table-column class="text-clamp" field="email" label="E-mail"
					>{{ props.row.email }}
				</b-table-column>
				<b-table-column
					class="text-clamp"
					field="deposited"
					:label="$t('Вклад, USDT')"
					>{{ sliceNumber(props.row.deposited) }}
				</b-table-column>
				<b-table-column
					class="text-clamp"
					field="referral_level"
					:label="$t('level')"
					align="left"
					width="10%"
				>
					{{ props.row.referral_level }}
					({{ getPercent(props.row.referral_level) }}%)
				</b-table-column>
				<b-table-column
					class="text-clamp"
					field="bonus"
					:label="$t('Бонус, USDT')"
					header-class="text-right"
					align="right"
					>{{ sliceNumber(props.row.bonus) }}
				</b-table-column>
			</template>
		</b-table>

		<div class="center mb-6">
			<button
				v-if="!hideButton"
				type="button"
				@click="showMore()"
				class="show-more"
			>
				{{ $t("показать еще") }}
			</button>
		</div>

		<div class="is-size-5 has-background-info total-withdraw mb-6">
			{{ $t("Всего начислено:") }}
			{{ formatCurrency(total, "usdt") }} USDT
		</div>
	</div>
</template>

<script>
import formatCurrency from "~/mixins/formatCurrency";

export default {
	name: "PartnersTable",
	mixins: [formatCurrency],
	computed: {
		partners() {
			let d = [...this.$store.getters.partners];
			d.sort((a, b) => {
				return new Date(b.created_at) - new Date(a.created_at);
			});
			if (this.limit > d.length) {
				this.hideButton = true;
			}
			return d.slice(0, this.limit);
		},
		total() {
			return this.$store.state.partners_total;
		}
	},
	data() {
		return {
			limit: 5,
			hideButton: false
		};
	},
	methods: {
		sliceNumber(number) {
			let n = Math.round(number / 10000) / 100;
			return new Intl.NumberFormat("en-US").format(n);
		},
		showMore() {
			this.limit += 5;
			if (this.limit > this.partners.length) {
				this.hideButton = true;
			}
		},

		getPercent(level) {
			if (level == 1) {
				return 9;
			} else if (level == 2) {
				return 3;
			} else {
				return 2;
			}
		}
	}
};
</script>

<style lang="scss">
.text-right {
	text-align: right;

	.th-wrap {
		justify-content: flex-end;
	}
}
</style>
