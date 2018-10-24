import React, { Component, Fragment } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import * as userActions from "store/modules/user";
import * as baseActions from "store/modules/base";
import storage from "lib/storage";

class Core extends Component {
  checkUser = async () => {
    const { UserActions } = this.props;
    const storedUser = storage.get("__pyochan_user__");
    if (!storedUser) {
      return;
    }
    UserActions.setUser(storedUser);

    try {
      await UserActions.checkUser();
    } catch (e) {
      storage.remove("__pyochan_user__");
    }
  };

  initialize = () => {
    this.checkUser();
  };
  componentDidMount() {
    this.initialize();
  }
  render() {
    return <Fragment />;
  }
}

export default connect(
  ({ user }) => ({
    user: user.user
  }),
  dispatch => ({
    UserActions: bindActionCreators(userActions, dispatch),
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(withRouter(Core));
