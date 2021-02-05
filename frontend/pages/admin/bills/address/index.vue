<script>
export default {
	name: 'bills_address',
	layout: 'profile',
	middleware: ['authRequired', 'adminRequired'],
	asyncData({ redirect }) {
		redirect('/bills/')
	},
}
</script>
