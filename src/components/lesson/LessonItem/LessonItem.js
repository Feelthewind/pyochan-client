import React, { Component } from "react";

import styles from "./LessonItem.scss";
import classNames from "classnames/bind";
import {
  MdStarBorder,
  MdStar,
  MdSlowMotionVideo,
  MdPlayCircleOutline
} from "react-icons/md";

const cx = classNames.bind(styles);

class LessonItem extends Component {
  handleToggle = async id => {
    const { onCollapse, collapsed, onSpeak } = this.props;
    onSpeak();
    onCollapse(id);
    await this.audio.play();
    this.audio.play();
    // if (!collapsed) {
    // }
  };

  componentDidMount() {}

  handleSpeak = async e => {
    e.stopPropagation();

    this.audio.playbackRate = 1;
    await this.audio.play();
  };

  handleSlowSpeak = async e => {
    e.stopPropagation();
    this.audio.playbackRate = 0.6;
    await this.audio.play();
  };

  render() {
    const {
      id,
      jap,
      kor,
      diction,
      checked,
      onLike,
      onUnlike,
      collapsed,
      liked,
      currentAudioUrl
    } = this.props;

    const { handleToggle, handleSpeak, handleSlowSpeak } = this;
    return (
      <div className={cx("lesson-item")}>
        <div
          className={cx("jap-container", { collapsed })}
          onClick={() => handleToggle(id)}
        >
          <div>{jap}</div>
          {liked ? (
            <MdStar className={cx("gray-star")} onClick={e => onUnlike(e)} />
          ) : (
            <MdStarBorder
              className={cx("white-star")}
              onClick={e => onLike(e)}
            />
          )}
        </div>
        {collapsed && (
          <div className={cx("kor-container")} onClick={handleSpeak}>
            <div className={cx("kor")}>{kor}</div>
            <div className={cx("diction")}>{diction}</div>
            <div className={cx("control-container")}>
              <MdSlowMotionVideo onClick={e => handleSlowSpeak(e)} />
              <MdPlayCircleOutline onClick={e => handleSpeak(e)} />
            </div>
          </div>
        )}
        <audio
          defaultplaybackrate={0.5}
          playbackrate={0.1}
          src={currentAudioUrl}
          hidden
          ref={ref => (this.audio = ref)}
        />
      </div>
    );
  }
}

export default LessonItem;
