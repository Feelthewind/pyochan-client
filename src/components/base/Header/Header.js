import React from "react";
import styles from "./Header.scss";
import classNames from "classnames/bind";
import { MdMenu, MdTurnedIn } from "react-icons/md";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const Header = ({ onToggle }) => (
  <header className={cx("header")}>
    <div className={cx("header-content")}>
      <div className={cx("menu-icon")} onClick={onToggle}>
        <MdMenu />
      </div>
      <Link to="/topic" className={cx("title")}>
        赤ちゃんのように
      </Link>
      <div className={cx("right")}>
        <Link to="/check" className={cx("review-icon")}>
          <MdTurnedIn />
        </Link>
      </div>
    </div>
  </header>
);

export default Header;
