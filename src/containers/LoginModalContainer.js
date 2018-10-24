import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";

import LoginModal from "components/login/LoginModal";
import * as authActions from "store/modules/auth";
import * as baseActions from "store/modules/base";
import * as userActions from "store/modules/user";
import * as listActions from "store/modules/list";
import storage, { keys } from "lib/storage";

class LoginModalContainer extends Component {
  handleRegister = async ({ email, password }) => {
    const { AuthActions, UserActions, history } = this.props;
    const { handleClose } = this;

    try {
      await AuthActions.localRegister({
        email,
        password
      });
      const { loginResult } = this.props;
      if (!loginResult) return;

      const { user } = loginResult;
      UserActions.setUser(user);
      storage.set(keys.user, user);

      handleClose();
      history.push("/topic");
    } catch (e) {
      console.log(e);
    }
  };

  handleLogin = async ({ email, password }) => {
    const { AuthActions, ListActions, UserActions, history } = this.props;
    const { handleClose } = this;
    try {
      await AuthActions.localLogin({
        email,
        password
      });

      const { loginResult } = this.props;
      if (!loginResult) return;

      await ListActions.getTopicList({ season: 1 });

      const { user } = loginResult;
      UserActions.setUser(user);
      storage.set(keys.user, user);

      handleClose();
      history.push("/topic");
    } catch (e) {
      console.log(e);
    }
  };

  handleChangeMode = () => {
    const { mode, AuthActions } = this.props;
    const inverted = mode === "login" ? "register" : "login";
    AuthActions.setMode(inverted);
  };

  handleClose = () => {
    const { BaseActions, AuthActions } = this.props;
    BaseActions.hideModal("login");
    AuthActions.initialize();
  };

  render() {
    const { mode, error, visible } = this.props;
    const { handleRegister, handleLogin, handleChangeMode, handleClose } = this;

    return (
      <div>
        <LoginModal
          visible={visible}
          mode={mode}
          error={error}
          onRegister={handleRegister}
          onLogin={handleLogin}
          onChangeMode={handleChangeMode}
          onClose={handleClose}
        />
      </div>
    );
  }
}

export default connect(
  ({ auth, base, pender }) => ({
    visible: base.modal.login,
    mode: auth.mode,
    error: auth.error,
    loginResult: auth.loginResult,
    pending: pender.pending["auth/LOCAL_LOGIN"]
  }),
  dispatch => ({
    AuthActions: bindActionCreators(authActions, dispatch),
    BaseActions: bindActionCreators(baseActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch),
    ListActions: bindActionCreators(listActions, dispatch)
  })
)(withRouter(LoginModalContainer));
