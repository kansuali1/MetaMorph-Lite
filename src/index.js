import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
import Particles from "react-particles-js";
import config from "./lib/particlesjs-config.json";

ReactDOM.render(
  <Provider store={store.configureStore()}>
    <React.Fragment>
      <Particles params={config} style={{ height: "100%" }} />
      <Router basename="/yolo-shift">
        <App />
      </Router>
    </React.Fragment>
  </Provider>,
  document.getElementById("root")
);
// registerServiceWorker();
