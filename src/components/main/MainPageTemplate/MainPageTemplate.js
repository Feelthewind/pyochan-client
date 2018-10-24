import React, { Component } from "react";
import { withRouter } from "react-router";

import styles from "./MainPageTemplate.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

class MainPageTemplate extends Component {
  render() {
    return (
      <div className={cx("main-page-template")}>
        <main>
          <div
            className={cx("button")}
            onClick={() => this.props.history.push("/topic")}
          />
        </main>
      </div>
    );
  }
}

export default withRouter(MainPageTemplate);
