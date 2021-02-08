<template>
	<div>
		<dividend-products />
		<dividends-table />
	</div>
</template>

<script>
import DividendProducts from '~/components/DividendProducts'
import DividendsTable from '~/components/tables/DividendsTable'
import { mainSliderController } from '@/utils/slider'

export default {
	layout: 'profile',
	name: 'dividents',
	middleware: ['authRequired'],
	components: { DividendProducts, DividendsTable },
	transition: mainSliderController,
	async asyncData({ store }) {
		return await store.dispatch('fetchTransactions', 'dividends')
	},
	computed: {},
	async created() {
		if (!this.$store.state.metamask.gasPrice) {
			await this.$store.dispatch('metamask/getGasPrice')
		}
	},
	data: () => ({
		isEmpty: false,
	}),
}
</script>

<style lang="sass" scoped>
@import "~@/assets/scss/transitions/slide-fade.scss"
</style>
