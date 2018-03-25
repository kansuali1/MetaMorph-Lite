import React from "react";
import { connect } from "react-redux";
import CoinInput from "../../inc/CoinInputSearch";

const mapStateToProps = ({ api: { coins, selectedCoins } }) => {
  return {
    receive: selectedCoins.receive,
    coins
  };
};

export default connect(mapStateToProps)(props => {
  const { coins, receive, handleSelect } = props;
  // let index = coins.find(coin => coin.symbol === data.symbol);

  return (
    <div className="asset receive">
      <CoinInput
        data={receive}
        coins={coins}
        onchange={handleSelect}
        type="receive"
      />
      <img src={coins[receive.symbol].image} alt="" />
      <h4 className="name">Receive</h4>
    </div>
  );
});

// <select
//         name="receive"
//         id="receive"
//         onChange={handleSelect}
//         defaultValue={data.name}
//         value={data.name}
//       >
//         {options &&
//           options.map((coin, index) => {
//             return (
//               <option key={coin.name} value={coin.name}>
//                 {coin.name}
//               </option>
//             );
//           })}
//       </select>
