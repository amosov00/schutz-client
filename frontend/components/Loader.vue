<template lang="pug">
	.loader-container(v-if="showed")
		img(:src='loader_style')
</template>

<script>
	export default {
		props: {
			showed: {
				type: Boolean,
			},
			loader_style: {
				type: String,
				default: '/images/loading_2.gif'
			}

		}
	}
</script>

<style lang="scss" scoped>
	.loader-container {
		text-align: center;

		padding: 50px;

		img {
			width: 48px;
		}
	}
</style>
