import constants from "../constants";
import SS from "../util";

// Set default coins for start up
const setDefaultCoins = (coins, coin1, coin2) => {
  // Change object to array
  const allCoins = Object.keys(coins).map(coin => coins[coin]);
  //Find index of default coins
  const c1 = allCoins.findIndex(coin => coin.symbol === coin1);
  const c2 = allCoins.findIndex(coin => coin.symbol === coin2);
  // Set objects to add index to them before passing
  let x = allCoins[c1];
  let y = allCoins[c2];
  x.index = c1;
  y.index = c2;

  const updated = { deposit: x, receive: y };
  return updated;
};

export default {
  getCoins: () => {
    return dispatch => {
      dispatch({ type: constants.LOADING, data: true });
      SS.GetCoins(coins => {
        //Set default coins first
        const selectedCoins = setDefaultCoins(coins, "BTC", "ETH");
        // Now dispatch it
        dispatch({
          type: constants.GET_COINS,
          data: { coins, selectedCoins }
        });
        dispatch({ type: constants.LOADING, data: false });
      });
    };
  },
  setCoins: (coin, location) => {
    return dispatch => {
      dispatch({
        type: constants.SET_COINS,
        data: { coin, location }
      });
    };
  },
  swapCoins: selectedCoins => {
    return dispatch => {
      let state = JSON.parse(JSON.stringify(selectedCoins));
      let reversed = [];
      reversed = Object.keys(state).map(obj => {
        return state[obj];
      });
      reversed.reverse();

      dispatch({
        type: constants.SWAP_COINS,
        data: reversed
      });
    };
  },
  getMarketInfo: (coin1, coin2) => {
    return dispatch => {
      dispatch({ type: constants.LOADING, data: true });
      SS.GetMarketInfo(coin1, coin2, data => {
        dispatch({
          type: constants.GET_MARKET_INFO,
          data
        });
        dispatch({ type: constants.LOADING, data: false });
      });
    };
  },
  validateAddress: (withdrawAddress, coin1, returnAddress, coin2) => {
    return dispatch => {
      dispatch({ type: constants.RESET_ERROR });
      dispatch({ type: constants.LOADING, data: ["button", true] });
      SS.ValidateAddress(withdrawAddress, coin1, result => {
        if (result.isvalid) {
          // WITHDRAW ADDRESS IS VALID
          SS.ValidateAddress(returnAddress, coin2, result2 => {
            if (result2.isvalid) {
              dispatch({
                type: constants.ADDRESS_ISVALID,
                data: { withdrawAddress, returnAddress }
              });
              dispatch({ type: constants.LOADING, data: ["button", false] });
              dispatch({ type: constants.RESET_ERROR });
            } else {
              dispatch({ type: constants.ERROR, data: result2 });
              dispatch({ type: constants.LOADING, data: ["button", false] });
            }
          });
        } else {
          dispatch({ type: constants.ERROR, data: result });
          dispatch({ type: constants.LOADING, data: ["button", false] });
        }
      });
    };
  },
  createTx: (wAdd, rAdd, coin1, coin2) => {
    return dispatch => {
      dispatch({ type: constants.LOADING, data: true });
      const data = SS.CreateNormalTx(wAdd, rAdd, coin1, coin2);

      SS.NormalTx(data, response => {
        dispatch({ type: constants.CREATE_TX, data: response });
        dispatch({ type: constants.LOADING, data: false });
      });
    };
  },
  getStatus: txDataDeposit => {
    return dispatch => {
      SS.GetStatusOfDepositToAddress(txDataDeposit, response => {
        dispatch({
          type: constants.GET_TX_STATUS,
          data: response
        });
      });
    };
  },
  orderInfo: orderId => {
    return dispatch => {
      dispatch({ type: constants.LOADING, data: true });
      SS.OrderInfo(orderId, response => {
        dispatch({
          type: constants.GET_ORDER_INFO,
          data: response
        });
        dispatch({ type: constants.LOADING, data: false });
      });
    };
  },
  error: error => {
    return dispatch => {
      dispatch({ type: constants.RESET_ERROR });
      dispatch({ type: constants.ERROR, data: { error } });
    };
  }
};
