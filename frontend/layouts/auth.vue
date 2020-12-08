<template lang="pug">
	div.layout
		Navbar(:links="links")
		nuxt
		DefaultFooter
</template>

<script>
import Navbar from "../components/Navbar";
import DefaultFooter from '../components/DefaultFooter';

export default {
	components: {
		DefaultFooter,
		Navbar,
	},
	data: () => ({
		links: [
			{name: 'Регистрация', link: '/signup'},
			{name: 'Авторизация', link: '/'},
		],
	})
};
</script>
<style lang="scss" scoped>
.layout {
	width: 100%;
	min-height: 100vh;
	background-image: url("data:image/svg+xml,%3Csvg width='366' height='167' viewBox='0 0 366 167' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cline x1='364.414' y1='83.4142' x2='282.414' y2='165.414' stroke='url(%23paint0_linear)' stroke-width='4'/%3E%3Cline opacity='0.4' x1='83.4142' y1='35.4142' x2='1.41421' y2='117.414' stroke='url(%23paint1_linear)' stroke-width='4'/%3E%3Cline x1='99.4142' y1='1.41421' x2='17.4142' y2='83.4142' stroke='url(%23paint2_linear)' stroke-width='4'/%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear' x1='363' y1='82' x2='283.5' y2='161.5' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%234FAAFF'/%3E%3Cstop offset='1' stop-color='%232365A3' stop-opacity='0'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint1_linear' x1='82' y1='34' x2='2.5' y2='113.5' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%234FAAFF'/%3E%3Cstop offset='1' stop-color='%232365A3' stop-opacity='0'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint2_linear' x1='98' y1='0' x2='18.5' y2='79.5' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%234FAAFF'/%3E%3Cstop offset='1' stop-color='%232365A3' stop-opacity='0'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E%0A");
	background-repeat: no-repeat;
	background-position: top 72px left 15%;
	background-color: #164A75;
}
</style>
