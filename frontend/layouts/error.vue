<template>
	<div class="container">
		<div class="error-content">
			<div class="section">
				<h1 class="title">{{ $t("pageNotFound") }}</h1>
				<div class="section">
					<nuxt-link to="/profile" class="button is-info">
						Go to my.nts.fund
					</nuxt-link>
					<a href="https://nts.fund/" class="button is-primary">
						Go to nts.fund
					</a>
				</div>
			</div>
		</div>
		<br />
		<br />
	</div>
</template>

<script>
export default {
	layout: "auth",
	mounted() {
		console.error(this.error);
	}
};
</script>

<style lang="scss">
.error-content {
	padding: 50px 45px;
	box-sizing: border-box;
	z-index: 1;
	width: 100%;
	background: #fff;
	height: 100%;
	position: relative;
	border-radius: 12px;
	height: 500px;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
