import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../store/actions";
import "./Stage3.scss";

class Progress extends Component {
  state = { interval: null };

  componentDidMount() {
    const { getStatus, txData } = this.props;
    getStatus(txData.deposit);
    // Update it every x seconds
    const interval = setInterval(getStatus(txData.deposit), 5000);
    //To clear when done
    this.setState({ interval: interval });
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  componentWillUpdate() {
    if (this.props.txProgress === 3) clearInterval(this.state.interval);
  }

  render() {
    const { txProgressData, txProgress } = this.props;

    if (!txProgressData) return <h1>Loading</h1>;

    let classes = [
      [
        "step step1",
        txProgressData.status === "no_deposits"
          ? "active"
          : txProgress > 1 ? "complete" : ""
      ],
      [
        "step step2",
        txProgressData.status === "received"
          ? "active"
          : txProgress > 2 ? "complete" : ""
      ],
      ["step step3", txProgressData.status === "complete" ? "complete" : ""]
    ];

    return (
      <div className="progress">
        <div className={classes[0].join(" ")}>
          <span>Awaiting Deposit</span>
        </div>
        <div className={classes[1].join(" ")}>
          <span>Received Deposit</span>
        </div>
        <div className={classes[2].join(" ")}>
          <span>Complete!</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ api: { txData, txProgress, txProgressData } }) => {
  return {
    txProgressData,
    txProgress,
    txData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getStatus: txDeposit => dispatch(actions.getStatus(txDeposit))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Progress);
