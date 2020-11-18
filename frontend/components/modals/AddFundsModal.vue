<template>
  <div class="modal-card" style="width: 420px">
    <ValidationObserver v-slot="{ invalid }">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ $t('enterAmount') }}</p>
      </header>
      <section class="modal-card-body is-titleless">
        <ValidationProvider
          rules="required|min_value:500"
          slim
          v-slot="{ errors, valid }"
        >
          <base-input
            type="number"
            v-model="value"
            min="500"
            placeholder="500 USDT"
            required
            :is-danger="errors[0]"
            :is-success="valid"
            :error="errors[0]"
          />
        </ValidationProvider>
      </section>
      <footer class="modal-card-foot">
        <div class="is-flex is-justify-content-space-between is-flex-grow-1">
          <div class="is-flex is-align-items-center">
            <b-checkbox v-model="isTermsAcceped" required />
            <span @click="$parent.close()">
              <nuxt-link class="terms-link is-size-7" to="/terms-and-conditions">
                {{ $t('acceptTerms') }}
              </nuxt-link>
            </span>
          </div>
          <div>
            <button
              class="button is-primary"
              :disabled="invalid"
              @click="addFunds"
            >
              {{ $t('ok') }}
            </button>
          </div>
        </div>
      </footer>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  data() {
    return {
      value: ''
    }
  },
  components: { ValidationObserver, ValidationProvider },
  methods: {
    addFunds() {
      if (!this.isTermsAcceped) {
        this.$buefy.toast.open({
          message: 'You have to confirm terms of the agreement',
          type: 'is-warning'
        })
        return false
      } else {
        this.$store.dispatch('transactions/addFunds', this.value)
        this.$parent.close()
      }
    }
  },
  computed: {
    isTermsAcceped: {
      get() {
        return this.$store.getters.isTermsAcceped
      },
      set(newValue) {
        this.$store.commit('setIsTermsAcceped', newValue)
      }
    }
  }
}
</script>

<style lang="scss">
.terms-link {
  border-bottom: 3px dotted #0495fb;
}
</style>
