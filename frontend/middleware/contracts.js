export default async function ({store}) {
  if (store.getters['contract/contracts'].length === 0) {
    await store.dispatch('contract/fetchContractsV2')
  }
}
