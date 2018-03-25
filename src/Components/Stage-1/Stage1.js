import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import actions from "../../store/actions";
import Deposit from "./Deposit";
import Receive from "./Receive";
import FontAwesome from "@fortawesome/react-fontawesome";
import faExchange from "@fortawesome/fontawesome-free-solid/faExchangeAlt";
import Loader from "../utils/Loader";
import "./Stage1.scss";

class Stage1 extends Component {
  // Select drop down handler
  handleSelect = (coin, location) => {
    //Object to array
    let x = Object.keys(this.props.coins).map(coin => this.props.coins[coin]);
    //Search through objects -> obj.name and compare it to given name
    x = x.filter(obj => obj.name === coin);
    // Take the obj out of array
    x = x[0];

    if (location === "receive") {
      this.props.setCoins(x, "receive");
      return;
    }

    // this.setState({ deposit: x });
    this.props.setCoins(x, "deposit");
  };

  swap = () => {
    const { swapCoins, selectedCoins } = this.props;

    swapCoins(selectedCoins);
  };

  render() {
    const { loading, coins } = this.props;
    return (
      <div className={`stage stage1 ${loading ? "loading" : ""}`}>
        {loading && <Loader />}
        {!loading &&
          coins && (
            <React.Fragment>
              <h1>Choose Assets to Trade</h1>
              <div id="asset_container">
                <Deposit handleSelect={this.handleSelect} />
                <div className="swap" onClick={this.swap}>
                  <FontAwesome icon={faExchange} />
                </div>
                <Receive handleSelect={this.handleSelect} />
              </div>
              <Link to="/stage2">Continue</Link>
            </React.Fragment>
          )}
      </div>
    );
  }
}

const mapStateToProps = ({ api: { coins, selectedCoins, loading } }) => {
  return {
    coins,
    selectedCoins,
    loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCoins: (coin, location) => dispatch(actions.setCoins(coin, location)),
    swapCoins: selectedCoins => dispatch(actions.swapCoins(selectedCoins))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Stage1));
