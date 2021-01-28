<template lang="pug">
	.box.modal-card.user_profile__container(style="width: 860px" v-if="!loading")
		section.modal-card-body
			.user_profile__title Update User Data
			div
				ValidationObserver(v-slot="{ invalid }")
					b-field(grouped)
						b-field(label="ID")
							b-input(type="test" disabled :value="user._id")
						b-field(:label="$t('registerDate')")
							b-input(type="test" disabled :value="timestampFromUtc(user.created_at)")
					b-field(grouped)
						b-field(label="Telegram")
							b-input(type="text" placeholder="@nickname" v-model="form.telegram")
					b-field(:label="$t('ethereumWallet')")
						b-input(type="text" placeholder="0x..." v-model="form.ethereum_wallet")
					b-field(:label="$t('ethereumWalletPayout')")
						b-input(type="text" placeholder="0x..." v-model="form.ethereum_wallet_payout")
					b-field(:label="$t('referralLink')")
						b-input(type="text" :placeholder="$t('referralLink')" disabled :value="user.referral_link")
					div
						div.button.label(@click="toReportsPage(user._id)") {{$t('activeDeposits')}}
						b-table.table-custom-m0(:data="activeDeposits" striped)
							template(slot-scope="props")
								b-table-column(field="contract" label="Contract name") {{ showContract(props.row) }}
								b-table-column(field="open_date" label="Open date") {{ timestampToDate(props.row.open_date) }}
								b-table-column(field="close_date" label="Close date") {{ timestampToDate(props.row.close_date) }}
								b-table-column(field="is_active" label="Is active")
									span(v-if="props.row.is_active").green Active
									span(v-else).red Not active
								b-table-column(label="Prolong")
									b-button(@click="showProlongDepositModal(props.row.contract)" type="is-info") Prolong
					b-field(grouped)
						b-field(:label="$t('firstName')")
							b-input(type="text" placeholder="first" v-model="form.first_name")
						b-field(:label="$t('lastName')")
							b-input(type="text" placeholder="last" v-model="form.last_name")
					div.block
						b-checkbox(v-model="form.is_superuser") Admin
						b-checkbox(v-model="form.is_manager") Manager
					div.block
						b-switch(v-model="form.is_active") Email is activated
					b-field(:label="$t('email')")
						b-input(type="email" placeholder="your e-mail" v-model="form.email")
					b-field(grouped)
						ValidationProvider(rules="min:8" vid="confirmation" name="password" slim v-slot="{ errors, valid }")
							b-field(:label="$t('password')" :type="{ 'is-danger': errors[0], 'is-success': valid }"
								:message="errors")
								b-input(type="password" placeholder="password" v-model="form.password")
						ValidationProvider(rules="confirmed:confirmation"  name="password" slim v-slot="{ errors, valid }")
							b-field(:label="$t('confirmPassword')" :type="{ 'is-danger': errors[0], 'is-success': valid }"
								:message="errors")
								b-input(type="password" placeholder="confirm password" v-model="form.repeat_password")
					b-field(label="Referral 1")
						b-input(type="text" placeholder="Referral 1" v-model="form.referral_1")
					b-field(label="Referral 2")
						b-input(type="text" placeholder="Referral 2" v-model="form.referral_2")
					b-field(label="Referral 3")
						b-input(type="text" placeholder="Referral 3" v-model="form.referral_3")
					b-field(grouped class="between")
						b-button(class="is-link is-medium mr-3 is-danger" @click="closeModal")  {{$t('cancel')}}
						b-button(
							v-if="$userIsSuperuser()"
							size="is-medium"
							type="is-info"
							@click="update"
							:disabled="invalid") {{$t('update')}}
</template>

<script>
import CustomCheckbox from "~/components/ui/CustomCheckbox";
import CustomSwitcher from "~/components/ui/CustomSwitcher";
import CustomInput from "~/components/ui/CustomInput";
import CustomButton from "~/components/ui/CustomButton";
import {mapActions, mapGetters} from "vuex";
import {ValidationObserver, ValidationProvider} from 'vee-validate'
import formatDate from "~/mixins/formatDate";
import ProlongDepositModal from "~/components/modals/ProlongDepositModal";

export default {
	mixins: [formatDate],

	props: {
		userId: {
			type: String,
			required: true,
		}
	},

	components: {
		CustomCheckbox,
		CustomSwitcher,
		CustomInput,
		CustomButton,
		ValidationObserver,
		ValidationProvider,
	},

	data() {
		return {
			loading: false,
			user: null,

			form: {
				is_superuser: true,
				is_manager: false,
				is_active: false,
				referral_1: '',
				referral_2: '',
				referral_3: '',
				email: '',
				telegram: '',
				ethereum_wallet: '',
				ethereum_wallet_payout: '',
				first_name: '',
				last_name: '',
				password: '',
				repeat_password: '',
			}
		}
	},

	async created() {
		this.loading = true;

		this.user = this.userDetailsById(this.userId)

		if(!this.user) {
			await this.$store.dispatch('users/getById', this.userId);
			this.user = this.userDetailsById(this.userId)
		}

		Object.assign(this.form, this.user);

		this.loading = false;
	},

	computed: {
		...mapGetters({
			userDetailsById: 'users/detailsById',
		}),
		balance() {
			return '0'
		},

		activeDeposits() {
			return this.user.active_deposits
		},

		date() {
			return this.$moment(this.user.created_at).format('DD MMMM YYYY | HH:mm')
		},

		referralLink() {
			return this.user.referral_link;
		}
	},

	methods: {
		...mapActions({
			updateUser: 'users/updateUser',
			fetchUsers: 'users/fetchUsers',
		}),

		onCopy(e) {
			this.$buefy.toast.open({
				message: `Copied: ${e.text}`,
				type: "is-success"
			});
		},

		onError(e) {
			this.$buefy.toast.open({
				message: "Copying failed!",
				type: "is-danger"
			});
		},

		showContract(data) {
			return data.prolongedContract ? `${data.contract} (prolonged to ${data.prolongedContract})` : data.contract
		},

		toReportsPage(userId) {
			this.$router.push(`/admin/reports/${userId}`);

			this.closeModal();
		},

		async showProlongDepositModal(contract) {
			let modal = this.$buefy.modal.open({
				parent: this,
				component: ProlongDepositModal,
				trapFocus: true,
				props: {
					user: this.user,
					contract: contract
				}
			})
			modal.$on('close', async () => (await this.reloadActiveDeposits()))
		},

		async reloadActiveDeposits() {
			await this.$axios.get(`/admin/active-deposits/${this.user._id}/`).then(resp => {
				this.user.active_deposits = resp.data.contracts
			})
		},

		async update() {
			try {
				if (this.form.password === '' || this.form.repeat_password === '') {
					delete this.form.password;
					delete this.form.repeat_password;
				}

				await this.updateUser(this.form);
				await this.fetchUsers({ page: 1, limit: 10, });

				this.closeModal();
			} catch (e) {

			}
		},

		closeModal() {
			this.$modal.close();
		},
	}
}
</script>

<style lang="scss">
.user_profile__title {
	font-size: 24px;
	line-height: 120%;
	margin-bottom: 20px;
}

.user_profile__container {
	.input {
		border: 1px solid #dbdbdb;
		border-radius: 6px;
		color: #363636;
		box-shadow: inset 0 0.0625em 0.125em rgba(10, 10, 10, 0.05);
		max-width: 100%;
		width: 100%;
	}
}

.user_profile__body {
	display: grid;
	grid-template-columns: 1fr 40px 1fr;

	.first_column {
		max-width: 100%;
	}

	.second_column {
		grid-column-start: 3;
		width: 100%;

		.second__column_form {
			margin-right: 40px;
		}
	}

	.action__block {
		margin-top: 50px;

		.action__text {
			cursor: pointer;
			user-select: none;
			color: #30A1FF;
			text-decoration: underline dashed;
		}
	}

	.information__block {
		.user_id__block, .balance__block {
			font-weight: bold;
			font-size: 14px;
			line-height: 19px;
		}

		.date__block {
			color: #666666;
		}

		.privileges__block {
			display: flex;
			margin: 10px 0;

			* {
				min-width: 120px;
			}
		}

		.email__block {
			margin-bottom: 50px;
		}

		.referral__block {
			display: flex;
			overflow: hidden;
			color: #30A1FF;
			max-width: 100%;
			align-items: center;
			margin-bottom: 27px;

			.referral_copy {
				user-select: none;
				cursor: pointer;
			}

			.referral_link {
				max-width: 100%;
				overflow: hidden;
				text-overflow: ellipsis;
				text-decoration: underline;
			}
		}
	}

	.user_profile__input_block {
		display: flex;
		align-items: center;
		border-bottom: 1px solid #666666;
		margin-bottom: 20px;

		.user_profile__input_label {
			font-weight: 300;
			font-size: 14px;
			line-height: 19px;
			color: #666666;
			user-select: none;
			white-space: nowrap;
		}

		.user_profile__input {
			margin-left: 20px;
			width: 100%;
		}
	}
}
</style>
