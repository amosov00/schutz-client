<template lang="pug">
  div
    h1.title.is-5
    div.box
      div.mb-30
        p.subtitle Address —
          a(:href="'https://etherscan.io/address/' + activeDepositTransactions.ethereum_wallet" target="_blank") {{activeDepositTransactions.ethereum_wallet}}
          b-button.ml-5(type="is-primary" v-clipboard="activeDepositTransactions.ethereum_wallet" v-clipboard:success="clipboardSuccessHandler")
            b-icon(pack="fas" icon="copy")
        p.subtitle Contract — {{activeDepositTransactions.contract}}
        p.subtitle Status —
          span.green(v-if="activeDepositTransactions.is_active") Active
          span.red(v-else) Not active
      ReportsTable(:activeDepositTransactions="activeDepositTransactions" colsType="active_deposits_transactions")
</template>

<script>
import ReportsTable from '~/components/tables/ReportsTable'
export default {
	name: 'reports',
	layout: 'profile',
	middleware: ['authRequired', 'adminRequired'],
	components: { ReportsTable },
	computed: {
		activeDepositTransactions() {
			return this.$store.getters['reports/activeDepositTransactions']
		},
	},
	methods: {
		clipboardSuccessHandler() {
			this.$buefy.toast.open({
				message: 'Copied!',
				type: 'is-success',
			})
		},
	},
	asyncData({ store, params }) {
		return store.dispatch('reports/fetchActiveDepositTransactions', params)
	},
}
</script>

<style scoped>
.ml-5 {
	margin-left: 20px;
}
.mb-30 {
	margin-bottom: 30px;
}
</style>
