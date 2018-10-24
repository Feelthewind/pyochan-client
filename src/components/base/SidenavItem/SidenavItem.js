import React from "react";
import { Link } from "react-router-dom";
import styles from "./SidenavItem.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const SidenavItem = ({ to, children, theme, ...rest }) => {
  if (!to) {
    return (
      <div className={cx("sidenav-item", theme)} {...rest}>
        {children}
      </div>
    );
  }

  return (
    <Link className={cx("sidenav-item", theme)} to={to} {...rest}>
      {children}
    </Link>
  );
};

export default SidenavItem;
