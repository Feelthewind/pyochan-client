import React, { Component } from "react";
import LessonList from "components/lesson/LessonList";
import Spinner from "components/common/Spinner";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";
import * as listActions from "store/modules/list";
import * as baseActions from "store/modules/base";

class CheckListContainer extends Component {
  getCheckList = () => {
    const { ListActions } = this.props;
    ListActions.getCheckList();
  };

  componentDidMount() {
    const { user, history, BaseActions } = this.props;
    if (!user) {
      BaseActions.showModal("login");
      history.push("/topic");
      return;
    }
    this.getCheckList();
  }

  handleUnlike = async (id, e) => {
    e.stopPropagation();
    const { ListActions } = this.props;
    ListActions.removeReview({ lessonId: id });
    await ListActions.unlikeLesson({ lessonId: id });
  };

  handleCollapse = async id => {
    const { ListActions } = this.props;
    await ListActions.reviewCollapse({ id });
  };

  render() {
    const { loading, reviews } = this.props;
    const { handleUnlike, handleCollapse } = this;
    if (loading) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Spinner size="3rem" />
        </div>
      );
    }
    return (
      <div>
        <LessonList
          lessons={reviews}
          onUnlike={handleUnlike}
          onCollapse={handleCollapse}
        />
      </div>
    );
  }
}

export default connect(
  ({ list, pender, user }) => ({
    user: user.user,
    reviews: list.reviews,
    loading: pender.pending["list/GET_CHECK_LIST"]
  }),
  dispatch => ({
    ListActions: bindActionCreators(listActions, dispatch),
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(withRouter(CheckListContainer));
