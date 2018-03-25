// Component
import React from "react";
import "./utils.scss";

export default ({ error }) => {
  if (error) {
    return <span className="error-message">{error.error}</span>;
  }

  return null;
};
