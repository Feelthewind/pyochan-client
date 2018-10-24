import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";

import Sidenav from "components/base/Sidenav";
import * as baseActions from "store/modules/base";
import * as userActions from "store/modules/user";
import * as listActions from "store/modules/list";
import storage, { keys } from "lib/storage";

class SidenavContainer extends Component {
  handleShowModal = () => {
    const { BaseActions, onClose } = this.props;
    onClose();
    BaseActions.showModal("login");
  };

  handleLogout = async () => {
    const { UserActions, ListActions, onClose, history, location } = this.props;
    onClose();
    await UserActions.logout();
    storage.remove(keys.user);
    history.push("/topic");
    if (location.pathname === "/topic") {
      await ListActions.getTopicList({ season: 1 });
    }
  };

  render() {
    const { visible, onClose, user } = this.props; // visible and onClose come from Base PageTemplate.
    const { handleShowModal, handleLogout, handleRegister } = this;

    return (
      <Sidenav
        user={user}
        visible={visible}
        onClose={onClose}
        onShowModal={handleShowModal}
        onLogout={handleLogout}
        onRegister={handleRegister}
      />
    );
  }
}

export default connect(
  ({ user }) => ({
    user: user.user
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch),
    ListActions: bindActionCreators(listActions, dispatch)
  })
)(withRouter(SidenavContainer));
