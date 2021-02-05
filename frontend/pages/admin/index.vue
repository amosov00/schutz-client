<template lang="pug">
	div
</template>

<script>
export default {
	middleware: ['authRequired', 'adminRequired'],
}
</script>

<style scoped></style>
