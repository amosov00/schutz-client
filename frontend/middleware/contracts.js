import _ from 'lodash';

export default async function({store}) {
  if (
    _.isEmpty(store.getters['contract/contract']('NTSCD')) ||
    _.isEmpty(store.getters['contract/contract']('USDT'))
  ) {
    await store.dispatch('contract/fetchContracts')
  }
}
