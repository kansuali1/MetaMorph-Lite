import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { apiReducer } from "./reducers";

var store;

export default {
  configureStore: () => {
    const reducers = combineReducers({
      api: apiReducer
    });

    // const composeEnhancers =
    //   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    store = createStore(reducers, applyMiddleware(thunk));

    return store;
  },

  currentStore: () => {
    return store;
  }
};
