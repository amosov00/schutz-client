<template lang="pug">
  b-navbar-dropdown(hoverable)
    template(slot="label")
      .div.option
        img.flag(:src="require(`~/assets/img/${selected.icon}`)")
        | {{ selected.name }}
    b-tooltip.tooltip(:label="tooltip(lang)" v-for="(lang, i) in filteredLanguages" :key="i" type="is-light" position="is-bottom")
      b-navbar-item(@click="setLang(lang)")
        nuxt-link(:to="switchLocalePath(lang.iso)")
          div.option
            img.flag(:src="require(`~/assets/img/${lang.icon}`)")
            | {{ lang.name }}
</template>

<script>
export default {
  name: "LangSwitcher",

  computed: {
    filteredLanguages() {
      return this.languages.filter(lang => lang.name !== this.selected.name);
    }
  },

  created() {
    this.languages.filter(el => {
      if (el.iso === this.$i18n.getLocaleCookie()) {
        this.selected = el;
      }
    });
  },

  methods: {
    setLang(lang) {
      this.selected = lang;
    },
    tooltip(lang) {
      return `Показать на ${lang.tooltip} языке`;
    }
  },

  data: () => ({
    selected: { name: "RU", icon: "ru.png", tooltip: "русском", iso: "ru" },
    languages: [
      { name: "EN", icon: "en.png", tooltip: "английском", iso: "en" },
      { name: "RU", icon: "ru.png", tooltip: "русском", iso: "ru" }
    ]
  })
};
</script>

<style lang="sass" scoped>
.b-navbar-item
  display: flex
  align-items: center
.flag
  width: 27px
  height: 27px
  margin-right: 5px
  border: 1px solid #e9e9e9
.option
  display: flex
  align-items: center
  font-weight: 500
  font-size: 16px
  line-height: 19px
  text-align: center
  color: #0495FB
.tooltip
  display: flex
  flex-direction: column
</style>
