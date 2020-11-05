<template lang="pug">
div
	LeftMenu
	nuxt

</template>

<script>
	import LeftMenu from "~/components/LeftMenu";

	export default {
		components: {
			LeftMenu
		},
		middleware: ['fetchUser'],
	}
</script>

<style scoped>
</style>
