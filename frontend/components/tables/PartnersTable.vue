<template>
	<div class="container">
		<div class="level">
			<div class="level-left page-title">
				{{ $t("История транзакций") }}
			</div>
		</div>
		<b-table
			v-if="partners.length"
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
					sortable
					:custom-sort="sortByDate"
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
					sortable
					:custom-sort="sortByName"
					>{{ props.row.first_name }} {{ props.row.last_name }}
				</b-table-column>
				<b-table-column
					sortable
					:custom-sort="sortByEmail"
					class="text-clamp"
					field="email"
					label="E-mail"
					>{{ props.row.email }}
				</b-table-column>
				<b-table-column
					class="text-clamp"
					field="deposited"
					sortable
					:custom-sort="sortByDeposit"
					:label="$t('Вклад, USDT')"
					>{{ sliceNumber(props.row.deposited) }}
				</b-table-column>
				<b-table-column
					class="text-clamp"
					field="referral_level"
					:label="$t('level')"
					align="left"
					width="10%"
					sortable
					:custom-sort="sortByLev"
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
					sortable
					:custom-sort="sortByBonus"
					>{{ sliceNumber(props.row.bonus) }}
				</b-table-column>
			</template>
		</b-table>

		<div class="center mb-6" v-if="partners.length">
			<button
				v-if="!hideButton"
				type="button"
				@click="showMore()"
				class="default-button"
			>
				{{ $t("показать еще") }}
			</button>
		</div>
		<div v-if="partners.length" class="active-users">
			Количество активных пользователей: {{ active_users }}
		</div>
		<div
			v-if="partners.length"
			class="is-size-5 has-background-info total-withdraw mb-6"
		>
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
			this.active_users = 0;
			let d = [...this.$store.getters.partners];
			d.map(el => {
				if (el.deposited > 0) {
					this.active_users++;
				}
			});

			d.sort((a, b) => {
				console.log(a);
				if (this.sort_date) {
					if (this.sort_date == "asc") {
						return new Date(b.created_at) - new Date(a.created_at);
					} else {
						return new Date(a.created_at) - new Date(b.created_at);
					}
				} else if (this.sort_bonus) {
					if (this.sort_bonus == "asc") {
						return b.bonus - a.bonus;
					} else {
						return a.bonus - b.bonus;
					}
				} else if (this.sort_deposit) {
					if (this.sort_deposit == "asc") {
						return b.deposited - a.deposited;
					} else {
						return a.deposited - b.deposited;
					}
				} else if (this.sort_lev) {
					if (this.sort_lev == "asc") {
						return b.referral_level - a.referral_level;
					} else {
						return a.referral_level - b.referral_level;
					}
				} else if (this.sort_email) {
					if (this.sort_email == "asc") {
						return b.email.localeCompare(a.email);
					} else {
						return a.email.localeCompare(b.email);
					}
				} else if (this.sort_name) {
					if (this.sort_name == "asc") {
						return b.first_name.localeCompare(a.first_name);
					} else {
						return a.first_name.localeCompare(b.first_name);
					}
				}
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
			hideButton: false,
			active_users: 0,
			sort_date: "asc",
			sort_name: false,
			sort_email: false,
			sort_deposit: false,
			sort_lev: false,
			sort_bonus: false
		};
	},
	methods: {
		sortByDate(a, b, isAsc) {
			this.sort_date = isAsc ? "asc" : "desc";
			this.sort_name = false;
			this.sort_email = false;
			this.sort_deposit = false;
			this.sort_lev = false;
			this.sort_bonus = false;
		},
		sortByName(a, b, isAsc) {
			this.sort_name = isAsc ? "asc" : "desc";
			this.sort_date = false;
			this.sort_email = false;
			this.sort_deposit = false;
			this.sort_lev = false;
			this.sort_bonus = false;
		},
		sortByEmail(a, b, isAsc) {
			this.sort_email = isAsc ? "asc" : "desc";
			this.sort_name = false;
			this.sort_date = false;
			this.sort_deposit = false;
			this.sort_lev = false;
			this.sort_bonus = false;
		},
		sortByDeposit(a, b, isAsc) {
			this.sort_deposit = isAsc ? "asc" : "desc";
			this.sort_name = false;
			this.sort_date = false;
			this.sort_date = false;
			this.sort_lev = false;
			this.sort_bonus = false;
		},
		sortByLev(a, b, isAsc) {
			this.sort_lev = isAsc ? "asc" : "desc";
			this.sort_name = false;
			this.sort_date = false;
			this.sort_deposit = false;
			this.sort_email = false;
			this.sort_bonus = false;
		},
		sortByBonus(a, b, isAsc) {
			this.sort_bonus = isAsc ? "asc" : "desc";
			this.sort_name = false;
			this.sort_date = false;
			this.sort_deposit = false;
			this.sort_lev = false;
			this.sort_email = false;
		},

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
				return 5;
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
.active-users {
	font-weight: normal;
	font-size: 16px;
	line-height: 120%;
	color: #fad896;
	margin-bottom: 10px;
}
</style>
