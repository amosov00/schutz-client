<template lang="pug">
	div
		nuxt

</template>

<script>
export default {
	middleware: ['fetchUser', 'metamask'],
}
</script>

<style scoped>
</style>
