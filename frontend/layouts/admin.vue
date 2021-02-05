<template>
	<div class="wrapper">
		<div class="container is-flex">
			<LeftMenu />
			<div class="main">
				<div class="nav-container">
					<NavbarPersonalArea />
					<div class="separator"></div>
				</div>
				<div class="content-box admin-page">
					<nuxt />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import LeftMenu from '~/components/LeftMenu'
import NavbarPersonalArea from '~/components/NavBar/NavbarPersonalArea'

export default {
	components: {
		LeftMenu,
		NavbarPersonalArea,
	},
	middleware: ['fetchUser', 'web3'],
}
</script>
<style lang="scss" scoped>
.wrapper {
	margin: 0 auto;
	background: #f9f9fb;
}

.container {
	max-width: 1300px !important;
}

.main {
	flex: 1 1 0;
	background: #ffffff;
	min-height: 100vh;
	padding-bottom: 100px;
}

.nav-container {
	padding: 24px 40px 0 40px;
}

.separator {
	margin-top: 24px;
	border-bottom: 1px solid rgba(176, 176, 176, 0.25);
}

.content-box {
	padding: 24px 60px;
	flex: 1 1 0;
	background: #ffffff;
}
</style>
<style lang="scss">
.admin-page {
	.box,
	.subtitle {
		color: #000;
	}

	.input,
	.taginput .taginput-container.is-focusable,
	.textarea,
	.select select {
		background-color: white;
		border: 1px solid #dbdbdb;
		border-radius: 6px;
		color: #363636;
		box-shadow: inset 0 0.0625em 0.125em rgba(10, 10, 10, 0.05);
		max-width: 100%;
		width: 100%;

		&:focus {
			border-color: #0495fb;
			box-shadow: 0 0 0 0.125em rgba(4, 149, 251, 0.25);
		}
	}
}
</style>
