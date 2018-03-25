import React, { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import "./index.scss";

class CoinInput extends Component {
  state = { search: "", isSearching: false };

  componentDidMount() {
    this.setState({ search: this.props.data.name });
  }

  componentDidCatch(error) {}

  handleChange = e => {
    if (e.target.value === " " || e.target.value === null) {
      this.setState({ search: "" });
      return;
    }
    // Backslashes crash the app for some reason, so escape it
    // todo learn regex
    if (e.target.value.match("[\"'\\\\/]+")) return;
    this.setState({ isSearching: true, search: e.target.value });
  };

  setValue = e => {
    this.setState({ search: e.target.dataset.name, isSearching: false });
    this.props.onchange(e.target.dataset.name, this.props.type);
  };

  render() {
    let { data, coins } = this.props;
    const { isSearching, search } = this.state;

    // Object to array for ez search
    const allCoins = Object.keys(coins).map(coin => coins[coin]);
    let searchBar;
    if (isSearching) {
      searchBar = allCoins.filter(coin => {
        return (
          coin.name.toLowerCase().search(this.state.search.toLowerCase()) !== -1
        );
      });
    }
    return (
      <div className="search-bar">
        <input
          type="text"
          value={isSearching ? search : data.name}
          onChange={this.handleChange}
          ref="searchBar"
        />
        {isSearching && (
          <Scrollbars
            style={{ width: "100%", height: 200, position: "absolute" }}
          >
            <ul ref="coinList" className="coins-list">
              {searchBar.map(x => {
                return (
                  <li
                    className={x.status === "available" ? "" : "disabled-coin"}
                    onClick={this.setValue}
                    key={x.symbol}
                    data-name={x.name}
                  >
                    <img src={x.imageSmall} alt={x.symbol} />
                    {x.name}
                  </li>
                );
              })}
            </ul>
          </Scrollbars>
        )}
      </div>
    );
  }
}

export default CoinInput;
