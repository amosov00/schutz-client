<template>
  <div class="modal-card" style="height: 300px">
    <header class="modal-card-head">
      <p class="modal-card-title">Update status</p>
    </header>
    <section class="modal-card-body">
      <b-field label="Status" class="is-fullwidth">
        <b-select placeholder="Select a status" class="select-width" v-model="mutableStatus">
          <option
            v-for="option in results"
            :value="option.value"
            :key="option.value">
            {{ option.name }}
          </option>
        </b-select>
      </b-field>
    </section>
    <footer class="modal-card-foot">
      <button class="button" type="button" @click="$parent.close()">
        Cancel
      </button>
      <button class="button is-primary" @click="updateStatus">Done</button>
    </footer>
  </div>
</template>

<script>
import formatCurrency from '~/mixins/formatCurrency'
export default {
  name: 'UpdateStatusModal',
  mixins: [formatCurrency],
  props: {
    agreement: {
      type: Object,
      required: true
    }
  },
  data: () =>({
    results: [
      {name: 'Не ответил', value: 1},
      {name: 'Закрыть', value: 2},
      {name: 'Продлить', value: 3}
      ],
    mutableStatus: ''
  }),
  methods: {
    updateStatus() {
       const {_id} = this.agreement
       this.$emit('updateStatus', {_id, result: this.mutableStatus})
       this.$parent.close()
    }
  },
  mounted() {
    this.mutableStatus = this.agreement.result
  }
}
</script>

<style scoped lang="scss">
.select-width * {
  width: 300px;
}
</style>