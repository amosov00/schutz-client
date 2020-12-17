<template lang="pug">
	div
		CustomSlider(
			:activeDot="1"
			:dots="4"
		)
			template(slot="content")
				.is-fullheight.is-flex.is-align-items-center.is-justify-content-center
					.content.search_block.is-fullheight.is-fullwidth
						.search_block__title Найти пользователя
						.search_block__description введите id, имя, e-mail или адрес кошелька
						CustomInput(
							:size="`10`"
							placeholder="Поиск"
							default-placeholder
							align="center"
							v-model="searchQuery"
							debounce="800"
						)

		UsersTable(
			:users="users"
			@more="onMore"
		)
		.export__container.container.is-flex.is-flex-direction-row-reverse
			.export__text(@click="saveAsExcel") Экспортировать таблицу
		.total__container.container
			.total__text Всего начислено: 915.00 USDT
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import formatDate from '~/mixins/formatDate'
import XLSX from "xlsx";
import { UsersTable } from "@/components/tables";
import CustomSlider from "@/components/ui/CustomSlider";
import CustomInput from "@/components/ui/CustomInput";

export default {
	name: "users",
	layout: "profile",
	middleware: ["managerRequired", "contracts", "adminRequired"],
	mixins: [formatDate],
	components: {
		UsersTable,
		CustomSlider,
		CustomInput,
	},
	computed: {
		...mapGetters({
			usersPagination: 'usersPagination',
			users: 'users/users',
		}),

		exportedFileDate() {
			return this.users.map(el => {
				return {
					ID: el._id,
					"Register date": this.createdTime(el.created_at),
					Email: el.email,
					Telegram: el.telegram,
					"First name": el.first_name,
					"Last name": el.last_name,
					Address: el.ethereum_wallet,
					"Referral 1": el.referral_1,
					"Referral 2": el.referral_2,
					"Referral 3": el.referral_3,
				}
			})
		}
	},
	data() {
		return {
			isEmpty: false,
			searchQuery: "",
			filteredUsers: [],
			page: 1,
			limit: 20,
		};
	},

	watch: {
		searchQuery: {
			handler(value) {
				this.page = 1;
				this.limit = 20;

				this.fetchUsers({ page: this.page, limit: this.limit, query: value });
			}
		}
	},

	methods: {
		...mapActions({
				fetchUsers: 'users/fetchUsers',
			}),

		changeInput() {
			this.filter();
		},

		filter() {
			if (this.searchQuery.length >= 3) {
				this.filteredUsers = _.filter(this.users, el => {
					if (
						(el._id !== null &&
							el._id
								.toLowerCase()
								.startsWith(this.searchQuery.toLowerCase())) ||
						(el.email !== null &&
							el.email
								.toLowerCase()
								.startsWith(this.searchQuery.toLowerCase())) ||
						(el.first_name !== null &&
							el.first_name
								.toLowerCase()
								.startsWith(this.searchQuery.toLowerCase())) ||
						(el.last_name !== null &&
							el.last_name
								.toLowerCase()
								.startsWith(this.searchQuery.toLowerCase())) ||
						(el.telegram !== null &&
							el.telegram
								.toLowerCase()
								.startsWith(this.searchQuery.toLowerCase())) ||
						(el.ethereum_wallet !== null &&
							el.ethereum_wallet
								.toLowerCase()
								.startsWith(this.searchQuery.toLowerCase())) ||
						(el.referral_1 !== null &&
							el.referral_1
								.toLowerCase()
								.startsWith(this.searchQuery.toLowerCase())) ||
						(el.referral_2 !== null &&
							el.referral_2
								.toLowerCase()
								.startsWith(this.searchQuery.toLowerCase())) ||
						(el.referral_3 !== null &&
							el.referral_3
								.toLowerCase()
								.startsWith(this.searchQuery.toLowerCase()))
					) {
						return el;
					} else {
						return false;
					}
				});
			} else {
				this.filteredUsers = [];
			}
		},

		saveAsExcel() {
			const dataTableWS = XLSX.utils.json_to_sheet(this.exportedFileDate);
			const wb = XLSX.utils.book_new();
			XLSX.utils.book_append_sheet(wb, dataTableWS, "data"); // sheetAName is name of Worksheet
			// export Excel file
			XLSX.writeFile(wb, `users.xlsx`);
		},

		async onMore() {
			this.page = this.page + 1;

			await this.fetchUsers({ page: this.page, limit: this.limit })
		}
	},
	async asyncData({ store }) {
		return await store.dispatch("users/fetchUsers", { page: 1, limit: 20, });
	}
};
</script>

<style lang="scss" scoped>
.search_block {
	text-align: center;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-image: url('~@/assets/img/search-magnifier.svg');
	background-size: 300px 330px;
	background-repeat: no-repeat;
	background-position: center center;

	.search_block__title {
		font-size: 24px;
		line-height: 120%;
	}

	.search_block__description {
		font-weight: 300;
		font-size: 14px;
		line-height: 19px;
		text-align: center;
		color: #666666;
	}

	.custom-input {
		font-size: 20px;
		margin-top: 30px;
		border-bottom: 1px solid #666666;
		width: 60%;
	}
}

.export__container {
	margin-bottom: 35px;

	.export__text {
		user-select: none;
		cursor: pointer;
	}
}

.total__container {
	height: 50px;
	background: #FAD896;
	border-radius: 12px;
	margin-bottom: 50px;
	padding: 10px 20px;

	.total__text {
		font-size: 24px;
		line-height: 120%;
		color: #000000;
	}
}
</style>
