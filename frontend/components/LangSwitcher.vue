<template>
	<div>
		<div class="lang-switcher pb-2" v-if="$i18n.locale == 'ru'" @click="$i18n.setLocale('en')">
			<span>RU</span>
			<img class="flag" :src="require(`~/static/img/ru.png`)" alt="ru" />
		</div>
		<div class="lang-switcher pb-2" v-if="$i18n.locale == 'en'" @click="$i18n.setLocale('ru')">
			<span>EN</span>
			<img class="flag" :src="require(`~/static/img/en.png`)" alt="eng" />
		</div>
	</div>
</template>

<script>
export default {
	name: 'LangSwitcher',

	computed: {
		filteredLanguages() {
			return this.languages.filter((lang) => lang.name !== this.selected.name)
		},
	},

	created() {
		this.languages.filter((el) => {
			if (el.iso === this.$i18n.getLocaleCookie()) {
				this.selected = el
			}
		})
	},

	methods: {
		setLang(lang) {
			this.selected = lang
		},
		tooltip(lang) {
			return `Показать на ${lang.tooltip} языке`
		},
	},

	data: () => ({
		selected: { name: 'RU', icon: 'ru.png', tooltip: 'русском', iso: 'ru' },
		languages: [
			{ name: 'EN', icon: 'en.png', tooltip: 'английском', iso: 'en' },
			{ name: 'RU', icon: 'ru.png', tooltip: 'русском', iso: 'ru' },
		],
	}),
}
</script>

<style lang="scss" scoped>
.lang-switcher {
	display: flex;
	align-items: center;
	font-style: normal;
	font-weight: 300;
	font-size: 14px;
	line-height: 19px;
	cursor: pointer;
	color: #b1ecff;
	transition: all 0.3s;

	.flag {
		width: 25px;
		height: 19px;
		margin-left: 6px;
	}

	&:hover {
		color: #fff;
	}
}
</style>
