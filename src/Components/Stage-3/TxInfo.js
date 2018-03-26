import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import FontAwesome from "@fortawesome/react-fontawesome";
import faClipboardList from "@fortawesome/fontawesome-free-solid/faClipboardList";

export default class extends Component {
  state = {
    value: "",
    copied: false
  };

  componentDidCatch(error, info) {
    console.log(error, info);
  }

  render() {
    const { txData, txProgressData } = this.props;
    const fullLink = window.location.href;

    // if error/invalid order id
    if (!txProgressData && !txData) {
      return (
        <h3>
          Transaction failed: {txData.error} <br /> You probably used an
          incorrect ID
        </h3>
      );
    }

    // If visited by bookmark
    if (!txData.orderId) {
      return (
        <React.Fragment>
          <div className="orderCopy">
            <h4>Bookmark the link to visit later: </h4>
            <div style={{ position: "relative" }}>
              <input value={fullLink} />
              <CopyToClipboard
                text={fullLink}
                onCopy={() => this.setState({ copied: true })}
              >
                <FontAwesome
                  icon={faClipboardList}
                  className={this.state.copied ? "copied" : ""}
                />
              </CopyToClipboard>
              {this.state.copied ? <small>Link copied</small> : null}
            </div>
          </div>
          <div className="depositInto">
            <b>Deposit into:</b> {txData.deposit}
          </div>
          <div className="depositType">
            <b>Deposit type:</b>{" "}
            <img
              src={txData.incomingCoinInfo.imageSmall}
              alt={txData.incomingType}
            />
          </div>
          <div className="withdrawAddress">
            <b>The exchanged coin will be sent to: </b>
            {txData.withdrawal}
          </div>
          <div className="withdrawType">
            <b>Withdraw type:</b>{" "}
            <img
              src={txData.outgoingCoinInfo.imageSmall}
              alt={txData.outgoingType}
            />
          </div>
        </React.Fragment>
      );
    }

    // The organic way of going step by step
    return (
      <React.Fragment>
        <div className="orderCopy">
          <input value={`${fullLink}/${txData.orderId}`} />
          <CopyToClipboard
            text={`${fullLink}?order=${txData.orderId}`}
            onCopy={() => this.setState({ copied: true })}
          >
            <FontAwesome
              icon={faClipboardList}
              className={this.state.copied ? "copied" : ""}
            />
          </CopyToClipboard>
        </div>
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
    );
  }
}
