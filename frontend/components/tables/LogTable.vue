<template lang="pug">
	.container
		b-table(
			:data='data'
			:loading='loading'
			detailed
			:show-detail-icon="true"
		).custom-table.mb-4
			template(slot-scope="{ row }")
				b-table-column.overflow-reset(field='user_id' :label=`$t('Пользователи')`)
					b-tooltip(
						:label='row.user_id'
						type='is-black'
						position='is-bottom'
					)
						span.text-clamp(
							@click="openUserModal(row.user_id)"
						)  {{ row.user_id }}
				b-table-column(
					label='Email'
				) {{ row.user_email }}
				b-table-column(
					:label=`$t('action')`
				) {{ row.type }}
				b-table-column(
					:label=`$t('Дата и время')`
				) {{ formatDate(row.created_at) }}
			template(#detail='props')
				article.media
					.media-content
						.content
							p(
								v-for='([key, value]) in normalizeObject(props.row.extra)'
								:key='key'
							) {{ key }}: {{ isObject(value) ? null : value }}
								template(v-if='isObject(props.row.extra[key])' )
									br
									span.ml-5(v-for='([innerKey, innerValue]) in normalizeObject(props.row.extra[key])')
										| {{ innerKey }}: {{ innerValue !== null ? innerValue : 'null' }}
										br
		.center.mb-6
			button.default-button(@click="$emit('more')" v-if="showMore") {{ $t("показать еще") }}
</template>

<script>
import formatDate from '~/mixins/formatDate'
import UserProfile from '~/components/modals/UserProfile'
import isObject from 'lodash/isObject'

export default {
	mixins: [formatDate],

	props: {
		data: {
			type: Array,
			required: true,
		},

		loading: {
			type: Boolean,
			default: false,
		},

		showMore: {
			type: Boolean,
			default: true,
		},
	},

	methods: {
		openUserModal(userId) {
			this.$modal.open({
				factory: () => UserProfile,
				props: {
					userId,
				},
			})
		},

		normalizeObject(object) {
			return Object.entries(object)
		},

		isObject(value) {
			return isObject(value)
		},
	},
}
</script>

<style scoped></style>
