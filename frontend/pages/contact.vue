<template lang="pug">
  div
    .title.is-size-2 Contact
    .columns
      .column.is-4-desktop
        .box
          div.has-text-weight-medium
            | Managers in
            =' '
            InlineSvg(:src="require('~/assets/icons/socials/telegram.svg')")
            =' '
            | Telegram
          div
            a.tg-btn.button.is-medium.is-info.is-block(:href="'https://t.me/' + m.link" target="_blank"
              v-for="(m, i) in telegram_managers" :key="i" :class="{ 'is-outlined': !m.isOnline }")
              | {{ m.isOnline ? '@' + m.link : m.name }}
        .box
          div.has-text-weight-medium Our social networks
          div
            a.soc-btn.button(:href="soc.link"
              v-for="(soc) in socials" :key="soc.name" :style="{ backgroundColor: soc.bg }" target="_blank")
              InlineSvg.soc-icon(:src="require(`~/assets/icons/socials/${soc.icon}`)")
              span.soc-name {{ soc.name }}


      .column.is-8-desktop
        .box.parent-height.contact-box
          b-field(label="Topic")
            b-input(type="text" v-model="contactForm.topic" minlength="5" custom-class="input-shadow")
          b-field.custom-textarea.is-flex.flex-column.flex-1(label="Text")
            b-input(type="textarea" v-model="contactForm.text" custom-class="min-h-100 no-resize input-shadow")
          div.btn-wrapper
            b-button(type="is-info" :loading="isLoading" @click="formPost") Send
</template>

<script>
import InlineSvg from "vue-inline-svg";
import { mapGetters } from "vuex";

export default {
	name: "contact",
	layout: "profile",
	middleware: ["authRequired"],
	components: { InlineSvg },
	computed: {
		...mapGetters(["user"])
	},

	methods: {
		formClear() {
			this.contactForm.topic = "";
			this.contactForm.text = "";
		},
		formPost() {
			this.isLoading = true;

			// Формирование текста из формы + доп. данных согласно ТЗ
			let data = this.contactForm;
			data["id"] = this.user._id;
			data["first_name"] = this.user.first_name;
			data["last_name"] = this.user.last_name;
			data["telegram"] = this.user.telegram;
			data["ethereum_wallet"] = this.user.ethereum_wallet;

			if (
				this.contactForm.text.length < 1 ||
				this.contactForm.topic.length < 1
			) {
				this.$buefy.toast.open({
					message: "Error: check form",
					type: "is-danger"
				});
				this.isLoading = false;
			} else {
				// Отправка данных
				this.isLoading = false;
				this.$buefy.toast.open({
					message: "Succesfully sent",
					type: "is-primary"
				});
				this.formClear();
			}
		}
	},

	data: () => ({
		isLoading: false,

		contactForm: {
			topic: "",
			text: ""
		},

		telegram_managers: [
			{ name: "Валерия", link: "Valeriya_crypto", isOnline: true },
			{ name: "Алёна", link: "", isOnline: false },
			{ name: "Даниил", link: "", isOnline: false }
		],

		socials: [
			{ name: "Facebook", icon: "facebook.svg", bg: "#3B5998", link: "#" },
			{
				name: "Twitter",
				icon: "twitter.svg",
				bg: "#0C85D0",
				link: "https://twitter.com/schutzcapital"
			},
			{
				name: "Instagram",
				icon: "instagram.svg",
				bg: "#D31E40",
				link: "https://www.instagram.com/neutrino_fund/"
			},
			{ name: "YouTube", icon: "youtube.svg", bg: "#CC0000", link: "#" },
			{
				name: "Telegram",
				icon: "telegram2.svg",
				bg: "#2CA5E0",
				link: "https://t.me/neutrinobank"
			},
			{ name: "GitHub", icon: "github.svg", bg: "#000000", link: "#" },
			{ name: "Bitcointalk", icon: "bct.svg", bg: "#F99D31", link: "#" },
			{
				name: "Reddit",
				icon: "reddit.svg",
				bg: "#FE4500",
				link: "https://www.reddit.com/user/NeutrinoBank"
			},
			{
				name: "Medium",
				icon: "medium.svg",
				bg: "#292929",
				link: "https://medium.com/@neutrinofund"
			}
		]
	})
};
</script>

<style lang="sass" scoped>
.btn-wrapper
  margin-top: 20px
  .button
    padding: 15px 59px
    font-size: 14px
    line-height: 17px
    height: auto

.custom-textarea
  .control
    flex: 1 10

.flex-1
  flex: 1 1 0

.contact-box
  display: flex
  flex-direction: column

.parent-height
  height: 100%

.soc-icon
  margin-right: 5px
  max-width: 24px
  max-height: 24px
  height: 24px
  width: 24px
.soc-btn
  border-color: transparent
  color: #ffffff
  margin: 8px 6px 0 0
  &:hover
    opacity: 0.75
  &:active
    transform: scale(0.98)
.tg-btn
  margin-top: 10px
</style>
