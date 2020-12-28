<template lang="pug">
	div
		h1.title.is-2 {{$t('users')}}
		div.box
			b-field(label="Search User")
				b-input(placeholder="Type query here..." @input="changeInput($event)" v-model="searchQuery")
		div.box
			div.level
				div.level-left {{$t('usersList')}}
			b-table.table-custom-m0(:data="searchQuery.length >= 3 ? filteredUsers : users" striped paginated pagination-simple pagination-position="bottom" per-page="10" hoverable)
				template(slot-scope="props" )
					b-table-column(field="id" label="ID" width="100")
						nuxt-link(:to="`/users/${props.row._id}`")
							text-highlight(:queries="searchQuery") {{ props.row._id }}
					b-table-column(field="email" label="Email" width="150")
						text-highlight(:queries="searchQuery") {{ props.row.email }}
					b-table-column(field="telegram" label="Telegram" width="150")
						text-highlight(:queries="searchQuery") {{ props.row.telegram }}
					b-table-column(field="first_name" label="First name"  width="100")
						text-highlight(:queries="searchQuery") {{ props.row.first_name }}
					b-table-column(field="last_name" label="Last name"  width="100")
						text-highlight(:queries="searchQuery") {{ props.row.last_name }}
					b-table-column(field="address" label="Address" width="150").has-text-primary.overflow-reset
						b-tooltip(:label="props.row.ethereum_wallet" type="is-black" position="is-bottom").w-100
							a(:href="'https://etherscan.io/address/' + props.row.ethereum_wallet" target="_blank").text-clamp
								text-highlight(:queries="searchQuery") {{ props.row.ethereum_wallet }}
					b-table-column(field="referral_1" label="Referral 1" width="50")
						text-highlight(:queries="searchQuery") {{ props.row.referral_1 }}
					b-table-column(field="referral_2" label="Referral 2" width="50")
						text-highlight(:queries="searchQuery") {{ props.row.referral_2 }}
					b-table-column(field="referral_3" label="Referral 3" width="50")
						text-highlight(:queries="searchQuery") {{ props.row.referral_3 }}
				template(slot="footer")
					.divider
				template(slot="bottom-left")
					div
						p {{$t('export')}}
							a(@click="saveAsExcel") .xls
</template>

<script>
import {mapGetters} from "vuex";
import formatDate from '~/mixins/formatDate'
import XLSX from "xlsx";

export default {
	name: "users",
	layout: "admin",
	middleware: ["managerOrAdminRequired", "contracts"],
	mixins: [formatDate],
	computed: {
		...mapGetters("users", ["users"]),
		exportedFileDate() {
			const data = this.users.map(el => {
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
			return data
		}
	},
	data() {
		return {
			isEmpty: false,
			searchQuery: "",
			filteredUsers: []
		};
	},
	methods: {
		changeInput(e) {
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
		}
	},
	async created() {
		await this.$store.dispatch("users/fetchUsersV1");
	}
};
</script>

<style lang="sass" scoped></style>
