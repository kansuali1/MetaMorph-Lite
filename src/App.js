import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import actions from "./store/actions";
import "./App.scss";
import Stage1 from "./Components/Stage-1/Stage1";
import Stage2 from "./Components/Stage-2/Stage2";
import Stage3 from "./Components/Stage-3/Stage3";
import logo from "./images/logo.png";
import sslogo from "./images/ss-logo.png";
// import txDataa from "./lib/txData";

class App extends Component {
  state = {
    error: null,
    loading: false,
    txData: null
  };

  // Make request to API to get all coins
  componentDidMount() {
    this.props.getCoins();
  }

  // Start the Transaction
  startTransaction = (withdrawAddress, returnAddress) => {
    const { createTx, selectedCoins } = this.props;
    //Start loading
    this.setState({ loading: true });
    /*
     |
     | Create Transaction
     |
     */
    createTx(
      withdrawAddress,
      returnAddress,
      selectedCoins.deposit.symbol,
      selectedCoins.receive.symbol
    );
  };

  render() {
    return (
      <div className="App">
        <img width="150" src={logo} alt="YLX.exchange" />
        <Switch>
          <Route exact path="/" component={Stage1} />
          <Route path="/stage2" component={Stage2} />
          <Route path="/stage3" component={Stage3} />
        </Switch>
        <div id="powered-by">
          <div className="pp-by-ss">
            <a href="https://shapeshift.io/">
              <img width="150" src={sslogo} alt="Shape shift" />
              <span>Powered by ShapeShift.io</span>
            </a>
            <br />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  api: { coins, selectedCoins, addressIsValid, addresses }
}) => {
  return {
    coins,
    selectedCoins,
    addressIsValid,
    addresses
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCoins: () => dispatch(actions.getCoins()),
    createTx: (wAdd, rAdd, coin1, coin2) =>
      dispatch(actions.createTx(wAdd, rAdd, coin1, coin2))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
