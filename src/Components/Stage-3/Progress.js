import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../store/actions";
import "./Stage3.scss";
import Loader from "../../Components/utils/Loader";

class Progress extends Component {
  state = { interval: null };

  componentDidMount() {
    const { txData, getStatus } = this.props;

    // Update status every 5 seconds..
    const interval = setInterval(() => {
      console.log("interval");
      getStatus(txData.deposit);
    }, 5000);
    //To clear when done
    this.setState({ interval });
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
    console.log("cleared", this.state.interval);
  }

  componentWillUpdate() {
    if (this.props.txProgress === 3) clearInterval(this.state.interval);
  }

  render() {
    const { txProgressData, txProgress } = this.props;

    // Failed Handling
    // txProgress defaults to 1
    // Only changed to 0 if tx failed
    const failed = txProgress === 0 ? true : false;

    if (!txProgressData) return <Loader />;

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
        {!failed && (
          <React.Fragment>
            <div className={classes[0].join(" ")}>
              <span>Awaiting Deposit</span>
            </div>
            <div className={classes[1].join(" ")}>
              <span>Received Deposit</span>
            </div>
            <div className={classes[2].join(" ")}>
              <span>Complete!</span>
            </div>
          </React.Fragment>
        )}
        {failed && (
          <div className="step failed">The transaction has failed</div>
        )}
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
