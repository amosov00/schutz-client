<template lang="pug">
	.container
		.level
			.level-left.is-size-5.has-text-primary.mb-4 Все пользователи
		b-table.custom-table.mb-4(
			pagination-position="bottom"
			:data="users"
		)
			template(slot-scope="props")
				b-table-column(
					field="id"
					label="ID"
					width="100"
				)
					a(@click.prevent="openUserModal(props.row._id)")
						text-highlight(:queries="searchQuery") {{ props.row._id }}
				b-table-column(field="email" label="Email" width="150")
					text-highlight(:queries="searchQuery") {{ props.row.email }}
				b-table-column(field="telegram" label="Telegram" width="150")
					text-highlight(:queries="searchQuery") {{ props.row.telegram }}
				b-table-column(field="first_name" label="First name"  width="100")
					text-highlight(:queries="searchQuery") {{ props.row.first_name }}
				b-table-column(field="last_name" label="Last name"  width="100")
					text-highlight(:queries="searchQuery") {{ props.row.last_name }}
				b-table-column(field="address" label="Address" width="150").has-text-primary.overflow-reset
					b-tooltip(:label="props.row.ethereum_wallet" type="is-black" position="is-bottom").w-100
						a(:href="'https://etherscan.io/address/' + props.row.ethereum_wallet" target="_blank").text-clamp
							text-highlight(:queries="searchQuery") {{ props.row.ethereum_wallet }}
		.center.mb-6
			button.default-button(@click="$emit('more')" v-if="showMore") {{ $t("показать еще") }}
</template>

<script>
import UserProfile from '@/components/modals/UserProfile'

export default {
	props: {
		users: {
			type: Array,
			required: true,
		},
		searchQuery: {
			type: String,
			default: '',
		},
		showMore: {
			type: Boolean,
			required: true,
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
	},
}
</script>

<style scoped></style>
