import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import LessonList from "components/lesson/LessonList";
import Spinner from "components/common/Spinner";
import Button from "components/common/Button";
import * as listActions from "store/modules/list";
import * as topicActions from "store/modules/topic";
import * as baseActions from "store/modules/base";

class LessonListContainer extends Component {
  getLessonList = () => {
    const { topicId, ListActions } = this.props;
    ListActions.getLessonList({
      topicId
    });
  };

  componentDidMount() {
    this.getLessonList();
  }

  handleLike = async (id, e) => {
    e.stopPropagation();
    const { ListActions } = this.props;
    ListActions.setLike({ lessonId: id });
    await ListActions.likeLesson({ lessonId: id });
  };

  handleUnlike = async (id, e) => {
    e.stopPropagation();
    const { ListActions } = this.props;
    ListActions.setUnlike({ lessonId: id });
    await ListActions.unlikeLesson({ lessonId: id });
  };

  handleComplete = async () => {
    if (window.deferredPrompt) {
      window.deferredPrompt.prompt();

      window.deferredPrompt.userChoice.then(function(choiceResult) {
        console.log(choiceResult.outcome);

        if (choiceResult.outcome == "dismissed") {
          console.log("User cancelled home screen install");
        } else {
          console.log("User added to home screen");
        }

        // We no longer need the prompt.  Clear it up.
        window.deferredPrompt = null;
      });
    }
    const { TopicActions, topicId } = this.props;
    await TopicActions.completeTopic({ topicId });
  };

  handleLogin = async (id, e) => {
    e.stopPropagation();
    const { BaseActions } = this.props;
    await BaseActions.showModal("login");
  };

  handleCollapse = async id => {
    const { ListActions } = this.props;
    await ListActions.collapse({ id });
  };

  render() {
    const { loading, lessons, user } = this.props;

    const {
      handleLike,
      handleUnlike,
      handleComplete,
      handleLogin,
      handleCollapse
    } = this;
    if (loading)
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

    return (
      <div>
        <LessonList
          lessons={lessons}
          onLike={!user ? handleLogin : handleLike}
          onUnlike={!user ? handleLogin : handleUnlike}
          onCollapse={handleCollapse}
          onComplete={handleComplete}
          user={user}
        />
      </div>
    );
  }
}

export default connect(
  ({ list, pender, user }) => ({
    lessons: list.lessons,
    user: user.user,
    loading: pender.pending["list/GET_LESSON_LIST"]
  }),
  dispatch => ({
    ListActions: bindActionCreators(listActions, dispatch),
    TopicActions: bindActionCreators(topicActions, dispatch),
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(LessonListContainer);
