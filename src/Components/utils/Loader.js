import React, { Component } from "react";
import "./Loader.scss";

export default class extends Component {
  static defaultProps = {
    yellow: true
  };
  render() {
    let { yellow } = this.props;

    return (
      <React.Fragment>
        {yellow && (
          <div id="loader-fix">
            <div id="loader">
              <div className="loader">
                <div className="dot-container">
                  <div className="dot" />
                  <div className="dot" />
                  <div className="dot" />
                </div>
                <div className="dot-container">
                  <div className="dot" />
                  <div className="dot" />
                  <div className="dot" />
                </div>
                <div className="dot-container">
                  <div className="dot" />
                  <div className="dot" />
                  <div className="dot" />
                </div>
              </div>
            </div>
            <div className="loader-text">Loading...</div>
          </div>
        )}
        {!yellow && (
          <div className="spinner">
            <div className="double-bounce1" />
            <div className="double-bounce2" />
          </div>
        )}
      </React.Fragment>
    );
  }
}
