<template lang="pug">
  div.box
    div.level
      div.level-left {{$t('myRefferals')}}
    b-table.table-custom-m0(:data="partners" striped :paginated='true' pagination-simple
    default-sort="referral_level" pagination-position="bottom")
      template(slot-scope="props")
        b-table-column(field="email" label="E-mail").text-clamp {{ props.row.email }}
        b-table-column(field="created_at" :label="$t('registrationDate')" width="200" sortable).text-clamp {{ props.row.created_at ? new Date(props.row.created_at).toLocaleString() : '' }}
        b-table-column(field="fullname" :label="$t('fullName')").text-clamp {{ props.row.first_name }} {{ props.row.last_name }}
        b-table-column(field="referral_level" :label="$t('level')").text-clamp {{ props.row.referral_level }}
      template(slot="empty")
        section
          div.has-text-grey.has-text-centered
            p Invite people to your affiliate link above.
            p Information about all partners will be displayed in this window.
      template(slot="footer")
        .divider

</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "PartnersTable",
  computed: {
    ...mapGetters(["partners"])
  }
};
</script>

<style scoped></style>
