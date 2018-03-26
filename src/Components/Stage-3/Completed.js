import React from "react";

export default ({ txProgressData }) => {
  return (
    <React.Fragment>
      <h4>Order complete!</h4>
      <div className="address">Order address: {txProgressData.address}</div>
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
        Amount sent to withdraw address: {txProgressData.incomingCoin}
      </div>
      <div className="outgoingType">
        Coin type of withdrawal: {txProgressData.incomingType}
      </div>
      <div className="transaction">
        Transaction ID of coin sent to withdraw address:{" "}
        {txProgressData.incomingType}
      </div>
    </React.Fragment>
  );
};
