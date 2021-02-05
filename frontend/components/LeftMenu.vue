<template lang="pug">
  div.left-menu
    figure.image
      nuxt-link(to="/investment")
        img.logo(src="~/static/logo-invert.svg")
    div.link-list
      n-link.link(v-for="(link, index) in links_main" :to="localePath(`${link.url}`, `${$i18n.locale}`)" :key="index" exact-active-class="active")
        div.icon-wrap
          InlineSvg.icon(:src="require(`../assets/icons/${link.icon}.svg`)")
        | {{ link.text }}
    div.link-list(v-if="$userIsManager()")
      .title {{$t('forAdministration')}}
      n-link.link(
        v-for="(link, index) in links_admin"
        v-if="link.perm()"
        :to="localePath(`${link.url}`, `${$i18n.locale}`)"
        :key="index"
        exact-active-class="active"
      )
        div.icon-wrap
          InlineSvg.icon(:src="require(`../assets/icons/${link.icon}.svg`)")
        | {{ link.text }}
</template>

<script>
import InlineSvg from 'vue-inline-svg'

export default {
	name: 'LeftMenu',
	components: { InlineSvg },

	computed: {
		links_main() {
			return [
				{ url: '/profile', icon: 'profile', text: this.$t('profile') },
				{
					url: '/investment',
					icon: 'investments',
					text: this.$t('investments'),
				},
				{ url: '/dividends', icon: 'dividends', text: this.$t('dividends') },
				{
					url: '/partner',
					icon: 'partner-program',
					text: this.$t('partnerProgram'),
				},
				{ url: '/faq', icon: 'help', text: this.$t('faq') },
			]
		},
		links_admin() {
			return [
				// { url: "/", icon: "dashboard", text: this.$t("dashboard"), perm: this.$userIsManager},
				{
					url: '/users',
					icon: 'profile',
					text: this.$t('users'),
					perm: this.$userIsManager,
				},
				{
					url: '/reports',
					icon: 'reports',
					text: this.$t('reports'),
					perm: this.$userIsManager,
				},
				{
					url: '/bills',
					icon: 'bills',
					text: this.$t('bills'),
					perm: this.$userIsSuperuser,
				},
				{
					url: '/deposit-accural',
					icon: 'reports',
					text: this.$t('Начисление депозита'),
					perm: this.$userIsSuperuser,
				},
			]
		},
	},
}
</script>

<style lang="sass" scoped>
.title
  font-size: 16px
  line-height: 19px
  color: #B0B0B0
  font-weight: normal
  padding-left: 10px
  padding-right: 10px

.link-list
  border-top: 1px solid rgba(176, 176, 176, 0.25)
  padding-top: 34px
  margin-top: 40px

.icon-wrap
  width: 35px
  margin-right: 20px
  display: flex
  align-items: center
  justify-content: center

.icon
  fill: #0495FB

.link
  display: flex
  align-items: center
  font-size: 16px
  line-height: 19px
  height: 40px
  color: #0495FB

  &:hover
    color: #B0B0B0

    & .icon
      fill: #B0B0B0

.active
  color: #B0B0B0

  & .icon
    fill: #B0B0B0

.left-menu
  height: 100%
  min-height: 100vh
  /*max-height: 100vh*/
  /*overflow-y: scroll*/
  width: 300px
  background: #F9F9FB
  padding: 30px

figure.image
  display: flex

  img.logo
    width: 100px
    height: 50px
</style>
