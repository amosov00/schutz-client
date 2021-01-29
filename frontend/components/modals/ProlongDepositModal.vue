<template lang="pug">
  div.invoice-modal
    div.title.is-5.main-title Пролонгировать вклад {{contractFrom}}
    div.columns
      div.column
        b-field(label="Из контракта")
          b-select(v-model="contractFrom" expanded)
            option(v-for="(option, index) in userDepositsTitles" :key="index") {{option}}
      div.column
        b-field(label="В контракт")
          b-select(v-model="contractTo" expanded)
            option(v-for="(option, index) in availableContracts" :key="index") {{option}}
    p.mb-3 Пролонгация контракта автоматически меняет сроки активного депозита контрактов
    p.mb-3(v-if="contractFrom === contractTo")
      | Прологирование в тот же контракт отменяет прошлую пролонгацию контракта
    b-button(@click="prolongDeposit" type="is-info" expanded) Пролонгировать

</template>

<script>
import {NTS_CONTRACTS} from "@/consts";

export default {
  name: "ProlongDepositModal",
  props: ["user", "contract"],
  data() {
    return {
      loading: false,
      contractFrom: "",
      contractTo: NTS_CONTRACTS.SCHUTZ,
      availableContracts: [NTS_CONTRACTS.SCHUTZ, this.contract]
    }
  },
  computed: {
    userDepositsTitles() {
      return this.user.active_deposits.reduce((acc, curr) => {
        acc.push(curr.contract)
        return acc
      }, [])
    },

  },
  methods: {
    async prolongDeposit() {
      await this.$store.dispatch("admin/prolongContract", {
        userId: this.user._id,
        data: {
          contract_from: this.contractFrom,
          contract_to: this.contractTo,
        },
      }).then(resp => {
        this.$emit('close')
        this.$buefy.toast.open({
          message: 'Успешно выполнено!',
          type: 'is-success'
        })
      }).catch(err => {
        this.$buefy.toast.open({
          message: 'Ошибка: что-то пошло не так!',
          type: 'is-danger'
        })
      })
    },
  },
  created() {
    this.contractFrom = this.contract
  }
}
</script>

<style lang="sass" scoped>
.invoice-modal
  background: #ffffff
  padding: 40px 73px
  margin: auto

.my-3
  margin: 1rem 0

.mr-auto
  margin-right: auto

.d-flex
  display: flex
</style>
