<template>
  <div class="container">
    <div class="level">
      <div
        class="level-left is-size-5 has-text-primary mb-4"
      >
        История транзакций
      </div>
    </div>
    <b-table
      :data="partners"
      pagination-simple="pagination-simple"
      default-sort="referral_level"
      class="custom-table mb-6"
    >
      <template slot-scope="props">
        <b-table-column
          class="text-clamp"
          field="created_at"
          :label="$t('registrationDate')"
          width="200"
          sortable="sortable"
        >{{ props.row.created_at ? new Date(props.row.created_at).toLocaleString() : '' }}
        </b-table-column>
        <b-table-column
          class="text-clamp"
          field="fullname"
          :label="$t('fullName')"
        >{{ props.row.first_name }} {{ props.row.last_name }}
        </b-table-column>
        <b-table-column
          class="text-clamp"
          field="email"
          label="E-mail"
        >{{ props.row.email }}
        </b-table-column>
        <b-table-column
          class="text-clamp"
          field="referral_level"
          :label="$t('level')"
          align="right"
          width="10%"
        >{{ props.row.referral_level }}
        </b-table-column>
      </template>
    </b-table>
    <div class="is-size-5 has-background-primary total-withdraw mb-6">
      Всего начислено: 0 USDT
    </div>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PartnersTable',
  computed: {
    ...mapGetters(['partners'])
  }
}
</script>

<style scoped></style>
