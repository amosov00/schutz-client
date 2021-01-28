<template>
	<div class="modal-card" style="height: 300px; padding:0px">
		<section class="modal-card-body" v-if="$i18n.locale === 'ru'">
			<h2 class="confirm-text" v-if="!status">
				Вы действительно хотите пролонгировать вклад на 12 мес ?
			</h2>
			<h2 class="confirm-text" v-else>
				Заявка на пролонгацию принята. Ваш вклад будет обновлен до конца месяца
				и продолжит приносить дивиденды. Благодарим за доверие!
			</h2>
		</section>
		<section class="modal-card-body" v-else>
			<h2 class="confirm-text" v-if="!status">
				Do you confirm the prolongation of the deposit for 12 months?
			</h2>
			<h2 class="confirm-text" v-else>
				The application for the prolongation has been accepted. Your deposit
				will be updated by the end of the month and continue to accrue
				dividends. Thank you for your trust!
			</h2>
		</section>
		<footer class="modal-card-foot">
			<button class="button" type="button" @click="$parent.close()">
				{{ status ? "Ok" : $t("Нет") }}
			</button>
			<button
				v-if="!status"
				class="button is-primary"
				@click="prolongAgreement()"
			>
				{{ $t("Да") }}
			</button>
		</footer>
	</div>
</template>

<script>
export default {
	props: ["lastContract"],

	data() {
		return {
			status: false
		};
	},

	methods: {
		async prolongAgreement() {
			if (this.lastContract) {
				const res = await this.$store.dispatch(
					"prolongAgreement",
					this.lastContract._id
				);
				if (!res) {
					this.$buefy.toast.open({
						message: this.$t("investment.errorMessage"),
						type: "is-danger",
						queue: false
					});
				} else {
					this.status = true;
				}
				await this.$store.dispatch("fetchContractAgreements");
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.confirm-text {
	font-size: 22px;
	text-align: center;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	padding-left: 70px;
	padding-right: 70px;
}
</style>
