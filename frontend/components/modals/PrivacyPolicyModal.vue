<template>
	<div class="s-modal">
		<div class="s-modal__scroll">
			<div class="s-modal____content terms">
				<div class="terms__title"> {{ $t('Политика конфиденциальности SCHUTZ') }} </div>
				<div class="terms__body">
					<privacy-policy-body/>
				</div>
			</div>
		</div>
		<div class="terms__acception">
			<div
				class="terms__cancel"
				@click="$store.commit('toggleTermsModal', false)"
			>
				{{ $t('Отменить, не согласен') }}
			</div>
			<button
				@click="accept()"
				class="button terms__accept custom-button is-primary is-size-5 has-text-weight-bold"
			>
				{{$t('Принять')}}
			</button>
		</div>
	</div>
</template>

<script>
import PrivacyPolicyBody from '@/components/content_lang/PrivacyPolicy'
export default {
	name: "privacy-policy-modal",
	components:{
		PrivacyPolicyBody
	},
	methods: {
		accept() {
			this.$emit("accepted", true);
			this.$store.commit("toggleTermsModal", false);
		}
	}
};
</script>

<style lang="scss">
.terms {
	font-weight: 300;
	font-size: 14px;
	line-height: 19px;
	color: #666666;

	&__acception {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-right: 27px;
		padding-top: 10px;
	}
	&__cancel {
		font-weight: 300;
		font-size: 14px;
		line-height: 19px;
		color: #30a1ff;
		border-bottom: 1px dashed;
		cursor: pointer;
	}
	&__accept {
		width: 100%;
		max-width: 400px;
	}
	&__title {
		font-weight: normal;
		font-size: 24px;
		line-height: 120%;
		color: #000000;
	}
	&__date {
		margin-top: 1px;
		margin-bottom: 15px;
	}
	p {
		margin-bottom: 20px !important;
	}
	&__body {
		h3 {
			font-size: 14px;
			line-height: 19px;
			color: #666666;
			text-transform: uppercase;
			font-weight: 600;
			margin-top: 15px;
		}
		p {
			font-weight: 300;
			font-size: 14px;
			line-height: 19px;
			color: #666666;
			margin-bottom: 0 !important;
			margin-top: 10px;
		}
	}
}
</style>
