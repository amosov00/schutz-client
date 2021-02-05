<template></template>

<script>
export default {
	name: 'bills_address',
	layout: 'admin',
	middleware: ['authRequired', 'adminRequired'],
	asyncData({ redirect }) {
		redirect('/bills/')
	},
}
</script>

<style></style>
