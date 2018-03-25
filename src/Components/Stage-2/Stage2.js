import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import actions from "../../store/actions";
import Loader from "../utils/Loader";
import FontAwesome from "@fortawesome/react-fontawesome";
import faRight from "@fortawesome/fontawesome-free-solid/faArrowRight";
import "./Stage2.scss";
import Err from "../utils/Error";

class Stage2 extends Component {
  state = {
    withdrawAddress: "",
    returnAddress: "",
    loading: false
  };

  componentDidMount() {
    const { selectedCoins, getMarketInfo } = this.props;
    if (!selectedCoins.deposit.name) return;
    getMarketInfo(selectedCoins.deposit.symbol, selectedCoins.receive.symbol);
  }

  handleInput = e => {
    if (e.target.name === "destination_address")
      this.setState({ withdrawAddress: e.target.value });
    else this.setState({ returnAddress: e.target.value });
  };

  validation = () => {
    const { validateAddress, error, addressIsValid } = this.props;
    console.log(addressIsValid);
    const { deposit, receive } = this.props.selectedCoins;
    const { withdrawAddress, returnAddress } = this.state;

    // Make sure fields aren't empty
    this.setState({ loading: true });
    if (
      this._address.value === "" ||
      this._address.value === null ||
      this._refundAddress.value === "" ||
      this._refundAddress.value === null
    ) {
      error("Both fields are required");

      return;
    }
    /*
     |
     | Address Validation
     |
     */
    const wAdd = withdrawAddress;
    const c1 = receive.symbol;
    const rAdd = returnAddress;
    const c2 = deposit.symbol;

    validateAddress(wAdd, c1, rAdd, c2);
  };

  render() {
    const {
      selectedCoins,
      marketInfo,
      errorMessage,
      addressIsValid,
      loading,
      loadingButton
    } = this.props;

    const coin1 = selectedCoins.deposit;
    const coin2 = selectedCoins.receive;

    let button;

    // Button
    if (!addressIsValid && !loadingButton) {
      button = "Verify Addresses";
    }
    if (loadingButton) button = <Loader yellow={false} />;

    if (addressIsValid) {
      this.props.history.push("/stage3");
    }
    // end button

    if (!marketInfo && !loading)
      return (
        <div className={`stage stage2 ${loading ? "loading" : ""}`}>
          <h3 className="skipStep">
            Did you skip the first step? Please go back and start again
          </h3>
        </div>
      );

    return (
      <div className={`stage stage2 ${loading ? "loading" : ""}`}>
        {loading && <Loader />}
        {!loading &&
          marketInfo && (
            <Fragment>
              <div id="rates">
                <div id="coins-being-exchanged">
                  <img src={coin1.image} alt={coin1.symbol} />
                  <FontAwesome icon={faRight} />
                  <img src={coin2.image} alt={coin2.symbol} />
                </div>
                <div className="rate">
                  <span>Rate:</span> 1 {coin1.symbol} = {marketInfo.rate}{" "}
                  {coin2.symbol}
                </div>
                <div className="min">
                  <span>Deposit Minimum:</span> {marketInfo.minimum}{" "}
                  {coin1.symbol}
                </div>
                <div className="max">
                  <span>Deposit Maximum:</span> {marketInfo.maxLimit}{" "}
                  {coin1.symbol}
                </div>
                <div className="fee">
                  <span>Miner Fee:</span> {marketInfo.minerFee} {coin1.symbol}
                </div>
              </div>
              <form action="#" id="createTx">
                <div className="input-control">
                  <input
                    required={true}
                    type="text"
                    name="destination_address"
                    id="destination_address"
                    className={addressIsValid ? "valid" : ""}
                    placeholder={`Your ${coin2.symbol} Address`}
                    onChange={this.handleInput}
                    ref={input => {
                      this._address = input;
                    }}
                  />
                  {window.innerWidth > 767 ? (
                    <Err error={errorMessage} />
                  ) : null}
                </div>
                <div className="input-control">
                  <input
                    required={true}
                    type="text"
                    name="refund_address"
                    id="refund_address"
                    className={addressIsValid ? "valid" : ""}
                    placeholder={`Your ${coin1.symbol} Refund Address`}
                    onChange={this.handleInput}
                    ref={input => {
                      this._refundAddress = input;
                    }}
                  />
                </div>
                {window.innerWidth <= 767 ? <Err error={errorMessage} /> : null}
              </form>
              <a onClick={this.validation}>{button}</a>
            </Fragment>
          )}
      </div>
    );
  }
}

const mapStateToProps = ({
  api: {
    selectedCoins,
    marketInfo,
    errorMessage,
    addressIsValid,
    loading,
    loadingButton
  }
}) => {
  return {
    selectedCoins,
    marketInfo,
    errorMessage,
    addressIsValid,
    loading,
    loadingButton
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getMarketInfo: (coin1, coin2) => {
      dispatch(actions.getMarketInfo(coin1, coin2));
    },
    validateAddress: (withdrawAddress, coin1, returnAddress, coin2) => {
      dispatch(
        actions.validateAddress(withdrawAddress, coin1, returnAddress, coin2)
      );
    },
    error: error => dispatch(actions.error(error))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Stage2));
