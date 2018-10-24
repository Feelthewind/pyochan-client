import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import LessonList from "components/lesson/LessonList";
import Spinner from "components/common/Spinner";
import * as listActions from "store/modules/list";
import * as baseActions from "store/modules/base";
import axios from "lib/defaultClient";
import configurePubSub from "lib/notification/configurePubSub";

class ReviewListContainer extends Component {
  getReviewList = () => {
    const { ListActions, topicId } = this.props;
    ListActions.getReviewList({ topicId });
  };

  componentDidMount() {
    this.getReviewList();
  }

  handleLike = async (id, e) => {
    e.stopPropagation();
    const { ListActions, BaseActions, user, lessons, requested } = this.props;
    if (!user) {
      return BaseActions.showModal("login");
    }
    ListActions.setLike({ lessonId: id });
    await ListActions.likeLesson({ lessonId: id });

    let num_liked = 0;
    lessons.forEach(lesson => {
      console.log(lesson);
      num_liked = lesson.liked ? num_liked + 1 : num_liked;
    });
    // console.log("num_liked", num_liked);
    // console.log("requested", requested);
    // console.log("user", user);
    // console.log("Notification" in window);
    // console.log("serviceWorker" in navigator);
    if (
      "Notification" in window &&
      "serviceWorker" in navigator &&
      !requested &&
      user &&
      num_liked === 3
    ) {
      console.log("requestPermission");
      Notification.requestPermission(function(result) {
        console.log("User Choice", result);
        if (result !== "granted") {
          console.log("No notification permission granted!");
        } else {
          configurePubSub(axios);
          BaseActions.setRequest();
          // displayConfirmNotification();
        }
      });
    }
  };

  handleUnlike = async (id, e) => {
    e.stopPropagation();
    const { ListActions } = this.props;
    ListActions.setUnlike({ lessonId: id });
    await ListActions.unlikeLesson({ lessonId: id });
  };

  handleCollapse = async id => {
    const { ListActions } = this.props;
    await ListActions.collapse({ id });
  };

  render() {
    const { loading, lessons } = this.props;
    const { handleLike, handleUnlike, handleCollapse } = this;
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
          onLike={handleLike}
          onUnlike={handleUnlike}
          onCollapse={handleCollapse}
        />
      </div>
    );
  }
}

export default connect(
  ({ list, pender, user, base }) => ({
    user: user.user,
    lessons: list.lessons,
    loading: pender.pending["list/GET_REVIEW_LIST"],
    requested: base.requested
  }),
  dispatch => ({
    ListActions: bindActionCreators(listActions, dispatch),
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(ReviewListContainer);
