export default async function ({store}) {
  if (window.ethereum !== undefined) {
    let isUnlocked = false;
    try {
      isUnlocked = await window.ethereum._metamask.isUnlocked();
    } catch (e) {
    }

    if (
      isUnlocked && store.getters.user.ethereum_wallet &&
      store.getters.user.ethereum_wallet.toLowerCase() ===
      window.ethereum.selectedAddress &&
      window.ethereum.selectedAddress !== null
    ) {
      store.commit("metamask/setStatus", "online");
    } else {
      store.commit("metamask/setStatus", "offline");
    }
  } else {
    return false;
  }
}
