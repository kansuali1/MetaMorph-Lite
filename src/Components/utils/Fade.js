import React from "react";
import { CSSTransition } from "react-transition-group/Transition";
import "./utils.scss";

export default ({ children, ...props }) => (
  <CSSTransition {...props} timeout={1000} classNames="fade">
    {children}
  </CSSTransition>
);
