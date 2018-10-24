import React, { Component } from "react";
import classNames from "classnames/bind";
import LessonItem from "components/lesson/LessonItem";

import styles from "./LessonList.scss";

const cx = classNames.bind(styles);

class LessonList extends Component {
  render() {
    const {
      lessons,
      onLike,
      onUnlike,
      onCollapse,
      onSpeak,
      user,
      onComplete,
      currentAudioUrl,
      playbackRate
    } = this.props;

    const lessonList = lessons.map(lesson => {
      const { id, jap, kor, diction, collapsed, liked = false } = lesson;
      return (
        <LessonItem
          key={id}
          jap={jap}
          kor={kor}
          id={id}
          collapsed={collapsed}
          diction={diction}
          liked={liked}
          onLike={e => onLike(id, e)}
          onUnlike={e => onUnlike(id, e)}
          onCollapse={() => onCollapse(id)}
          onSpeak={() => onSpeak(id)}
          currentAudioUrl={currentAudioUrl}
          playbackRate={playbackRate}
        />
      );
    });
    return (
      <div className={cx("lesson-list")}>
        {lessonList}
        {user && (
          <button
            className={cx("button", "yellow")}
            style={{
              marginTop: "1rem",
              marginBottom: "1rem",
              WebkitAppearance: "none"
            }}
            onClick={onComplete}
          >
            学習完了
          </button>
        )}
      </div>
    );
  }
}

export default LessonList;
