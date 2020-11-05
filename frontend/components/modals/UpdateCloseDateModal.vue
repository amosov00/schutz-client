<template>
  <div class="modal-card" style="height: 600px">
    <header class="modal-card-head">
      <p class="modal-card-title">Close Date for {{ contract.contract }}</p>
    </header>
    <section class="modal-card-body">
      <b-field label="Date">
        <b-datepicker v-model="formatedDate"></b-datepicker>
      </b-field>
    </section>
    <footer class="modal-card-foot">
      <button class="button" type="button" @click="$parent.close()">
        Close
      </button>
      <button @click="update" class="button is-primary">Update</button>
    </footer>
  </div>
</template>

<script>
import formatDate from "~/mixins/formatDate";
import moment from "moment";
import _ from "lodash";

export default {
  props: ["contract", "activeDeposit"],
  mixins: [formatDate],
  data() {
    return {
      formatedDate: new Date(this.contract.close_date * 1000)
    };
  },
  methods: {
    async update() {
      let activeDepositCopy = Object.assign({}, this.activeDeposit)
      let contractCopy = Object.assign({}, this.contract)
      let closeDate = this.formatedDate
      closeDate.setHours(12)
      contractCopy.close_date = closeDate.getTime() / 1000;
      activeDepositCopy.contracts = _.uniqBy([contractCopy, ...activeDepositCopy.contracts], "contract")
      await this.$store.dispatch("reports/updateCloseDate", activeDepositCopy).then(() => {
        this.$parent.close();
      })
    }
  }
};
</script>

<style></style>
