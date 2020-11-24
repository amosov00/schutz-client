import Web3 from "web3";

export default ({ app, store, redirect }, inject) => {
  inject("contracts", () => {
    if (!app._contracts) {
      let contracts = {}
      const infura = store.getters["contract/infura"]
      const web3 = new Web3(infura.ws);
      store.getters["contract/contracts"].map(i => {
        if (i.abi && i.address) {
          contracts[i.title] = new web3.eth.Contract(i.abi, i.address)
        }
      })
      app._contracts = contracts
    }
    return app._contracts;
  });
};
