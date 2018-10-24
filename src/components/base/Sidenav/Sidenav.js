import React, { Component } from "react";

import styles from "./Sidenav.scss";
import classNames from "classnames/bind";
import SidenavItem from "components/base/SidenavItem";
import Button from "components/login/Button";

const cx = classNames.bind(styles);

class Sidenav extends Component {
  state = {
    animate: false
  };

  startAnimation = () => {
    this.setState({
      animate: true
    });

    setTimeout(() => {
      this.setState({
        animate: false
      });
    }, 250);
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.visible !== this.props.visible) {
      this.startAnimation();
    }
  }

  render() {
    const { visible, user, onClose, onShowModal, onLogout } = this.props;
    const { animate } = this.state;

    if (!visible && !animate) return null;

    const animation = animate && (visible ? "enter" : "leave");

    let control;
    if (user) {
      control = (
        <div onClick={onLogout} className={cx("button")}>
          ログアウト
        </div>
      );
    } else {
      control = (
        <div onClick={onShowModal} className={cx("button")}>
          ログイン
        </div>
      );
    }

    return (
      <div className={cx("sidenav-container")}>
        <div className={cx("gray-background", animation)} onClick={onClose} />
        <div className={cx("sidenav", animation)}>
          <ul className={cx("list")} onClick={onClose}>
            <li className={cx("item")}>
              <SidenavItem theme="blue" to="/topic?season=1">
                シーズン1
              </SidenavItem>
            </li>
            <li className={cx("item")}>
              <SidenavItem theme="teal" to="/topic?season=2">
                <div>シーズン2</div>
              </SidenavItem>
            </li>
            <li className={cx("item")}>
              <SidenavItem theme="orange" to="/topic?season=3">
                シーズン3
              </SidenavItem>
            </li>
          </ul>
          {control}
        </div>
      </div>
    );
  }
}

export default Sidenav;
