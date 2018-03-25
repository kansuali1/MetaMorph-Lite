import React from "react";
import { connect } from "react-redux";
import CoinInput from "../../inc/CoinInputSearch";

const mapStateToProps = ({ api: { coins, selectedCoins } }) => {
  return {
    deposit: selectedCoins.deposit,
    coins
  };
};

export default connect(mapStateToProps)(props => {
  const { coins, deposit, handleSelect } = props;

  return (
    <div className="asset deposit">
      <CoinInput
        data={deposit}
        coins={coins}
        onchange={handleSelect}
        type="deposit"
      />
      <img src={coins[deposit.symbol].image} alt="" />
      <h4 className="name">Deposit</h4>
    </div>
  );
});

// <select
//   name="deposit"
//   id="deposit"
//   onChange={handleSelect}
//   defaultValue={data.name}
//   value={data.name}
// >
//   {options &&
//     options.map(coin => {
//       return (
//         <option
//           key={coin.name}
//           value={coin.name}
//           disabled={coin.status !== "available" ? true : false}
//         >
//           {coin.name}
//         </option>
//       );
//     })}
// </select>
