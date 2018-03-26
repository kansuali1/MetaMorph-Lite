import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Loader from "../utils/Loader";
import actions from "../../store/actions";
import "./Stage3.scss";
import Progress from "./Progress";
import TxInfo from "./TxInfo";
import Completed from "./Completed";

class Stage3 extends Component {
  state = { bookmarked: false, orderId: null };

  componentDidCatch(error, info) {
    console.log(error, info);
  }

  componentDidMount() {
    const {
      addressIsValid,
      addresses,
      createTx,
      selectedCoins,
      orderInfo,
      location
    } = this.props;
    /*
    |
    | First check for params to allow for direct view of status
    | Need to update with a server to use private api
    |
    */
    if (location.search) {
      const reg = /order=([^&]*)/;
      const match = this.props.location.search.match(reg);
      this.setState({ bookmarked: true, orderId: match[1] });
      orderInfo(match[1]);
    }

    //Set order information
    if (addressIsValid && !location.search) {
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
    const { bookmarked } = this.state;
    let isComplete = txProgress === 3 ? true : false;

    if (!txData && !loading && !bookmarked) {
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
              {txProgress && <Progress location={this.props.location} />}
              {!isComplete && (
                <TxInfo
                  txProgress={txProgress}
                  txData={txData}
                  txProgressData={txProgressData}
                />
              )}
              {isComplete && <Completed txProgressData={txProgressData} />}
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
    createTx: (wAdd, rAdd, coin1, coin2) => {
      dispatch(actions.createTx(wAdd, rAdd, coin1, coin2));
    },
    orderInfo: orderId => dispatch(actions.orderInfo(orderId))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Stage3));
