<template lang="pug">
	div
		nuxt

</template>

<script>
export default {
	middleware: ['fetchUser', 'web3'],
}
</script>

<style scoped>
</style>
