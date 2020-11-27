<template lang="pug">
div
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
