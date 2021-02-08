<template lang="pug">
  div
    h1.title.is-3 Active deposit detailed info
    div
      p.is-5 ID {{activeDepositsByID._id}}
      nuxt-link.is-5(v-if="activeDepositsByID.user_id" :to="'/users/' + activeDepositsByID.user_id") User ID {{ activeDepositsByID.user_id }}
      p.is-5 ETH {{ activeDepositsByID.address }}
    div.box
      ReportsTable(colsType="active_deposits_detail")
</template>

<script>
import ReportsTable from '~/components/tables/ReportsTable'

export default {
	name: 'reports',
	layout: 'admin',
	middleware: ['authRequired', 'adminRequired'],
	components: { ReportsTable },
	computed: {
		activeDepositsByID() {
			return this.$store.getters['reports/activeDepositsByID']
		},
	},
	asyncData({ store, params }) {
		store.dispatch('reports/fetchActiveDepositByID', params.id)
	},
}
</script>

<style lang="sass">
.is-5
  font-size: 1.15rem
</style>
