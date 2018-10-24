import React from "react";

import styles from "./TopicButton.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const Div = ({ children, ...rest }) => <div {...rest}>{children}</div>;

const TopicButton = ({
  to,
  children,
  onClick,
  disabled,
  read,
  complete,
  theme = "default"
}) => {
  const Element = to && !disabled ? Link : Div;
  return (
    <Element
      to={to}
      className={cx("button", theme, { disabled }, { read }, { complete })}
      onClick={disabled ? () => null : onClick}
    >
      {children}
    </Element>
  );
};

export default TopicButton;
