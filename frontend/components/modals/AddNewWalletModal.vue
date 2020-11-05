<template>
  <div class="add-wallet-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Add new wallet</p>
    </header>
    <section class="modal-card-body">
      <p class="is-size-5">Past your address manually here:</p>
      <b-field>
        <b-input
          type="text"
          v-model="wallet"
          placeholder="Your address"
          required
        >
        </b-input>
      </b-field>
      <p class="is-size-5">
        Or paste him from MetaMask:
        <InlineSvg :src="require('assets/icons/metamask-fox.svg')" />
      </p>
      <b-button type="is-warning" class="w-100" @click="pasteFromMM"
        >Paste from MetaMask</b-button
      >
    </section>
    <footer class="modal-card-foot">
      <button class="button" type="button" @click="$parent.close()">
        Close
      </button>
      <button class="button is-primary" @click="addWallet">Add</button>
    </footer>
  </div>
</template>
<script>
import InlineSvg from "vue-inline-svg";
export default {
  components: {
    InlineSvg
  },
  data() {
    return {
      wallet: ""
    };
  },
  methods: {
    async addWallet() {
      if (this.wallet) {
        const res = await this.$store.dispatch("wallet/addWallet", this.wallet);
        if (res) {
          this.$authFetchUser()
          this.$parent.close();
        }
      }
    },
    pasteFromMM() {
      this.wallet = window.ethereum.selectedAddress;
    }
  }
};
</script>

<style lang="scss">
.add-wallet-card {
  width: 450px;
  height: 330px;
  position: relative;
  z-index: 1000;
}
</style>
