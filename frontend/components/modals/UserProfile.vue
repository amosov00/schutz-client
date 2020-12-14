<template lang="pug">
	.modal-card.user_profile__container(style="width: 860px" v-if="!loading")
		section.modal-card-body
			.user_profile__title Изменить данные пользователя
			.user_profile__body
				.first_column
					.information__block
						.user_id__block ID: {{ userId }}
						.balance__block Баланс: {{ balance }}
						.date__block Зарегистрирован: {{ date }}
						.privileges__block
							.admin__block
								.field
									CustomCheckbox(v-model="form.is_superuser") Админ
							.manager__block
								.field
									CustomCheckbox(v-model="form.is_manager") Менеджер
						.email__block
							CustomSwitcher(v-model="form.is_active") E-mail активирован
						.referral__block
							.referral_link {{ referralLink }}
							.referral_copy copy
						.user_profile__input_block
							.user_profile__input_label Referral 1:
							CustomInput(v-model="form.referral_1").user_profile__input
						.user_profile__input_block
							.user_profile__input_label Referral 2:
							CustomInput(v-model="form.referral_2").user_profile__input
						.user_profile__input_block
							.user_profile__input_label Referral 3:
							CustomInput(v-model="form.referral_3").user_profile__input
					.action__block
						.action__text(@click="$emit('close')") Отменить
				.second_column
					.second__column_form
						.user_profile__input_block
							.user_profile__input_label E-mail:
							CustomInput(v-model="form.email").user_profile__input
						.user_profile__input_block
							.user_profile__input_label Telegram:
							CustomInput(v-model="form.telegram").user_profile__input
						.user_profile__input_block
							.user_profile__input_label ETH wallet:
							CustomInput(v-model="form.ethereum_wallet").user_profile__input
						.user_profile__input_block
							.user_profile__input_label ETH wallet для выплат:
							CustomInput(v-model="form.ethereum_wallet_payout").user_profile__input
						.user_profile__input_block
							.user_profile__input_label Имя:
							CustomInput(v-model="form.first_name").user_profile__input
						.user_profile__input_block
							.user_profile__input_label Фамилия:
							CustomInput(v-model="form.last_name").user_profile__input
						.user_profile__input_block
							.user_profile__input_label Пароль:
							CustomInput(type="password" v-model="form.password").user_profile__input
						.user_profile__input_block
							.user_profile__input_label Подтвердите пароль:
							CustomInput(type="password" v-model="form.repeat_password").user_profile__input
					CustomButton(style="width: 100%" @click.native="update") Сохранить


</template>

<script>
import CustomCheckbox from "~/components/ui/CustomCheckbox";
import CustomSwitcher from "~/components/ui/CustomSwitcher";
import CustomInput from "~/components/ui/CustomInput";
import CustomButton from "~/components/ui/CustomButton";
import {mapActions} from "vuex";

export default {
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

		this.user = await this.$store.dispatch('fetchUser', this.userId);
		Object.assign(this.form, this.user);

		this.loading = false;
	},

	computed: {
		balance() {
			return '0'
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
			updateUser: 'updateUser',
			fetchUsers: 'fetchUsers',
		}),

		async update() {
			try {
				if (this.form.password === '' || this.form.repeat_password === '') {
					delete this.form.password;
					delete this.form.repeat_password;
				}

				await this.updateUser(this.form);
				await this.fetchUsers({ page: 1, limit: 10, });

				this.$emit('close');
			} catch (e) {

			}
		}
	}
}
</script>

<style scoped lang="scss">
.user_profile__title {
	font-size: 24px;
	line-height: 120%;
	margin-bottom: 20px;
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
