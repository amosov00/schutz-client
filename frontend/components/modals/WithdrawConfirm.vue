<template>
	<div class="modal-card" style="height: 300px; padding:0px">
		<section class="modal-card-body" v-if="$i18n.locale === 'ru'">
			<h2 class="confirm-text" v-if="!status">
				Вы действительно хотите закрыть вклад и вывести средства?
			</h2>
			<h2 class="confirm-text" v-else>
				Вклад будет начислен и доступен к выводу после 20 (следующий месяц,
				например, Февраля 2021).
			</h2>
		</section>
		<section class="modal-card-body" v-else>
			<h2 class="confirm-text" v-if="!status">
				Are you sure you want to close the deposit and withdraw funds?
			</h2>
			<h2 class="confirm-text" v-else>
				The deposit will be credited and available for withdrawal after 20 (next
				month, for example, February 2021).
			</h2>
		</section>
		<footer class="modal-card-foot">
			<button class="button" type="button" @click="$parent.close()">
				{{ status ? "Ok" : $t("Нет") }}
			</button>
			<button
				v-if="!status"
				class="button is-primary"
				@click="closeAgreement()"
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
		async closeAgreement() {
			if (this.lastContract) {
				const res = await this.$store.dispatch(
					"closeAgreement",
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
