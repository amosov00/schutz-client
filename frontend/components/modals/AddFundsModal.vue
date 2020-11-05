<template>
  <div class="modal-card" style="width: 320px">
    <ValidationObserver v-slot="{ invalid }">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ $t("enterAmount") }}</p>
      </header>
      <section class="modal-card-body is-titleless">
        <ValidationProvider
          rules="required|min_value:500"
          slim
          v-slot="{ errors, valid }"
        >
          <b-field
            :type="{ 'is-danger': errors[0], 'is-success': valid }"
            :message="errors"
          >
            <b-input
              type="number"
              v-model="value"
              min="500"
              placeholder="500 USDT"
              required
            >
            </b-input>
          </b-field>
        </ValidationProvider>
      </section>
      <footer class="modal-card-foot">
        <div class="level">
          <div>
            <b-checkbox v-model="isTermsAcceped" required />
            <span @click="$parent.close()">
              <nuxt-link class="terms-link" to="/terms-and-conditions">{{
                $t("acceptTerms")
              }}</nuxt-link>
            </span>
          </div>
          <div>
            <button
              class="button is-info"
              :disabled="invalid"
              @click="addFunds"
            >
              {{ $t("ok") }}
            </button>
          </div>
        </div>
      </footer>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
export default {
  data() {
    return {
      value: ""
    };
  },
  components: { ValidationObserver, ValidationProvider },
  methods: {
    addFunds() {
      if (!this.isTermsAcceped) {
        this.$buefy.toast.open({
          message: "You have to confirm terms of the agreement",
          type: "is-warning"
        });
        return false;
      } else {
        this.$store.dispatch("transactions/addFunds", this.value);
        this.$parent.close();
      }
    }
  },
  computed: {
    isTermsAcceped: {
      get() {
        return this.$store.getters.isTermsAcceped;
      },
      set(newValue) {
        this.$store.commit("setIsTermsAcceped", newValue);
      }
    }
  }
};
</script>

<style lang="scss">
.terms-link {
  border-bottom: 3px dotted #0495fb;
}
</style>
