import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
// import { BrowserRouter } from "react-router-dom";
import Routes from "./router";
import cStore from "./configureStore";
import history from "./history";

export const store = cStore.store;

export default class App extends React.Component {
  state = {};
  render() {
    return (
      <Provider store={store}>
        {/** react-redux 6.0.1 store需要传进ConnectedComponent */}
        <ConnectedRouter history={history} store={store}>
          {/* <BrowserRouter> */}
          <Routes />
          {/* </BrowserRouter> */}
        </ConnectedRouter>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
