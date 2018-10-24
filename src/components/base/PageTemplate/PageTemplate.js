import React, { Component } from "react";
import styles from "./PageTemplate.scss";
import classNames from "classnames/bind";
import Header from "components/base/Header";
import SidenavContainer from "containers/SidenavContainer";

const cx = classNames.bind(styles);

class PageTemplate extends Component {
  state = {
    displaySidenav: false
  };

  handleToggle = () => {
    this.setState({
      displaySidenav: !this.state.displaySidenav
    });
  };

  handleClose = () => {
    this.setState({
      displaySidenav: false
    });
  };

  render() {
    const { children } = this.props;
    const { handleToggle, handleClose } = this;
    const { displaySidenav } = this.state;

    return (
      <div className={cx("page-template")}>
        <Header onToggle={handleToggle} />
        <SidenavContainer visible={displaySidenav} onClose={handleClose} />
        <main>{children}</main>
      </div>
    );
  }
}

export default PageTemplate;
