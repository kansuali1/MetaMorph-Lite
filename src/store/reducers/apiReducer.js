import constants from "../constants";

const initState = {
  stage: 1,
  coins: null,
  selectedCoins: { deposit: {}, receive: {} },
  marketInfo: null,
  errorMessage: null,
  addressIsValid: false,
  txData: null,
  addresses: null,
  txProgressData: null,
  txProgress: 0,
  loading: false,
  loadingButton: false
};

export default (state = initState, { type, data }) => {
  let updated = { ...state };

  /*
   |
   | GET COINS
   |
   */
  if (type === constants.GET_COINS) {
    updated.coins = data.coins;
    updated.selectedCoins = data.selectedCoins;
    return updated;
  }
  /*
   |
   | SET COINS ( the ones user has selected )
   |
   */
  if (type === constants.SET_COINS) {
    if (data.location === "receive") {
      updated.selectedCoins.receive = data.coin;
      return updated;
    }
    updated.selectedCoins.deposit = data.coin;
    return updated;
  }

  if (type === constants.SWAP_COINS) {
    updated.selectedCoins.deposit = data[0];
    updated.selectedCoins.receive = data[1];

    return updated;
  }

  if (type === constants.GET_MARKET_INFO) {
    updated.marketInfo = data;
    return updated;
  }

  if (type === constants.ADDRESS_ISVALID) {
    updated.addressIsValid = true;
    updated.addresses = data;
    return updated;
  }

  if (type === constants.CREATE_TX) {
    updated.txData = data;
    updated.stage = 3;
    updated.txProgress = 1;
    return updated;
  }

  if (type === constants.GET_TX_STATUS) {
    data.status === "no_deposits"
      ? (updated.txProgress = 1)
      : data.status === "received"
        ? (updated.txProgress = 2)
        : data.status === "complete"
          ? (updated.txProgress = 3)
          : (updated.txProgress = 0);
    updated.txProgressData = data;
    return updated;
  }

  if (type === constants.GET_ORDER_INFO) {
    data.status === "no_deposits"
      ? (updated.txProgress = 1)
      : data.status === "received"
        ? (updated.txProgress = 2)
        : data.status === "complete"
          ? (updated.txProgress = 3)
          : (updated.txProgress = 0);
    updated.txData = data;
    return updated;
  }

  /*
   |
   | error handling
   | and loader
   */

  if (type === constants.LOADING) {
    if (data[0] === "button") {
      updated.loadingButton = data[1];
    } else {
      updated.loading = data;
    }
    return updated;
  }

  if (type === constants.ERROR) {
    updated.errorMessage = data;
    return updated;
  }

  if (type === constants.RESET_ERROR) {
    updated.errorMessage = null;
    return updated;
  }
  // Default
  return updated;
};
