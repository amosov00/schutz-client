<template lang="pug">
	.modal-card(style='height: 700px; margin: auto').p-0
		header.modal-card-head
			p.modal-card-title Close Date for {{ contract.contract }}
		section.modal-card-body
			b-field(label='Date')
				b-datepicker(v-model='formatedDate')
		footer.modal-card-foot
			button.button(type='button' @click='$parent.close()')
				| Close
			button.button.is-primary(@click='update') Update
</template>

<script>
import formatDate from "~/mixins/formatDate";
import moment from "moment";
import _ from "lodash";
import {mapActions} from "vuex";

export default {
  props: ["contract", "activeDeposit"],
  mixins: [formatDate],
  data() {
    return {
      formatedDate: new Date(this.contract.close_date * 1000)
    };
  },
  methods: {
  	...mapActions({
			updateCloseDate: 'reports/updateCloseDate',
		}),

    async update() {
      let activeDepositCopy = Object.assign({}, this.activeDeposit)
      let contractCopy = Object.assign({}, this.contract)
      let closeDate = this.formatedDate
      closeDate.setHours(12)
      contractCopy.close_date = closeDate.getTime() / 1000;
      activeDepositCopy.contracts = _.uniqBy([contractCopy, ...activeDepositCopy.contracts], "contract")

			await this.updateCloseDate(activeDepositCopy);

      this.$parent.close();
    }
  }
};
</script>

<style></style>
