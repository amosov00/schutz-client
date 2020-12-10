<template>
  <div class="modal-card" style="height: 600px">
    <header class="modal-card-head">
      <p class="modal-card-title">Mailing users</p>
    </header>
    <section class="modal-card-body">
      <div class="is-flex-direction-column is-flex">
        <b-checkbox
          class="mb-3"
          v-for="{id, email} in users"
          v-model="selectedUsers"
          :key="id"
          :native-value="id">
          {{email}}
        </b-checkbox>
      </div>
    </section>
    <footer class="modal-card-foot">
      <button class="button" type="button" @click="$parent.close()">
        Close
      </button>
      <button class="button is-primary" @click="sendMail">Send</button>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'MailingUsersModal',
  props: {
    users: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    selectedUsers: []
  }),
  methods: {
    sendMail() {
      this.$emit('sendMail', this.selectedUsers)
      this.$parent.close()
    }
  }
}
</script>

<style scoped>

</style>