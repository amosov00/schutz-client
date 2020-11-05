import Web3 from "web3";

export default ({ app, store, redirect }, inject) => {
  inject("contracts", () => {
    if (!app._contracts) {
      const NTSCD = store.getters["contract/contract"]("NTSCD");
      const USDT = store.getters["contract/contract"]("USDT");
      const OperatorNTS = store.getters["contract/contract"]("OperatorNTS");
      const web3 = new Web3(NTSCD.provider_link);
      app._contracts = {
        NTSCD: new web3.eth.Contract(NTSCD.abi, NTSCD.address),
        USDT: new web3.eth.Contract(USDT.abi, USDT.address),
        OperatorNTS: new web3.eth.Contract(OperatorNTS.abi, OperatorNTS.address)
      };
    }
    return app._contracts;
  });
};
