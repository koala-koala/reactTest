import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { routerMiddleware } from "react-router-redux";
import createReducer from "./reducers";
import history from "./history";

class configureStore {
  constructor(initialState, history) {
    const routerWare = routerMiddleware(history);
    const midWares = [thunk, routerWare];

    this.store = createStore(
      createReducer(),
      initialState,
      applyMiddleware(...midWares)
    );
    this.store.asyncReducers = {};
  }
  // create = history => {
  //   console.log("create");
  //   const routerWare = routerMiddleware(history);
  //   const midWares = [thunk, routerWare];

  //   this.store = createStore(
  //     createReducer(),
  //     initialState,
  //     applyMiddleware(...midWares)
  //   );

  //   this.store.asyncReducers = {};

  //   return this.store;
  // };
  injectReducer = ({ key, reducer }) => {
    this.store.asyncReducers[key] = reducer;
    this.store.replaceReducer(createReducer(this.store.asyncReducers));
  };
}

const cstore = new configureStore({}, history);
export default cstore;
