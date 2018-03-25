import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Loader from "../utils/Loader";
import actions from "../../store/actions";
import "./Stage3.scss";
import Progress from "./Progress";

class Stage3 extends Component {
  componentDidMount() {
    const { addressIsValid, addresses, createTx, selectedCoins } = this.props;
    //Set order information
    if (addressIsValid) {
      createTx(
        addresses.withdrawAddress,
        addresses.returnAddress,
        selectedCoins.deposit.symbol,
        selectedCoins.receive.symbol
      );
    }
  }

  render() {
    const { txData, txProgress, txProgressData, loading } = this.props;
    let isComplete = txProgress === 3 ? true : false;

    if (!txData && !loading) {
      return (
        <div className={`stage stage3 ${loading ? "loading" : ""}`}>
          Something has gone wrong. Did you navigate directly to this page?
          Please start from the beginning
        </div>
      );
    }

    return (
      <div className={`stage stage3 ${loading ? "loading" : ""}`}>
        {loading && <Loader />}
        {!loading &&
          txData && (
            <React.Fragment>
              <Progress />
              {!isComplete && (
                <React.Fragment>
                  <div className="orderID">
                    <b>Order ID:</b> {txData.orderId}
                  </div>
                  <div className="depositInto">
                    <b>Deposit into:</b> {txData.deposit}
                  </div>
                  <div className="depositType">
                    <b>Deposit type:</b> {txData.depositType}
                  </div>
                  <div className="refundAddress">
                    <b>Your return address:</b>
                    {txData.returnAddress}
                  </div>
                  <div className="withdrawAddress">
                    <b>The exchanged coin will be sent to: </b>
                    {txData.withdrawal}
                  </div>
                </React.Fragment>
              )}
              {isComplete && (
                <React.Fragment>
                  <h4>Order complete!</h4>
                  <div className="address">
                    Order address: {txProgressData.address}
                  </div>
                  <div className="withdrawAddress">
                    Withdraw address: {txProgressData.withdraw}
                  </div>
                  <div className="incomingCoin">
                    Amount deposited: {txProgressData.incomingCoin}
                  </div>
                  <div className="incomingType">
                    Coin type of deposit: {txProgressData.incomingType}
                  </div>
                  <div className="outgoingCoin">
                    Amount sent to withdraw address:{" "}
                    {txProgressData.incomingCoin}
                  </div>
                  <div className="outgoingType">
                    Coin type of withdrawal: {txProgressData.incomingType}
                  </div>
                  <div className="transaction">
                    Transaction ID of coin sent to withdraw address:{" "}
                    {txProgressData.incomingType}
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          )}
      </div>
    );
  }
}

const mapStateToProps = ({
  api: {
    addressIsValid,
    addresses,
    txData,
    selectedCoins,
    txProgress,
    txProgressData,
    loading
  }
}) => {
  return {
    addressIsValid,
    addresses,
    txData,
    selectedCoins,
    txProgress,
    txProgressData,
    loading
  };
};
const mapDispatchToProps = dispatch => {
  return {
    createTx: (wAdd, rAdd, coin1, coin2) =>
      dispatch(actions.createTx(wAdd, rAdd, coin1, coin2))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Stage3));
