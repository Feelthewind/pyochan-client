import React, { Component } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import {
  MdCheck,
  MdFlight,
  MdBatteryCharging20,
  MdSentimentVerySatisfied
} from "react-icons/md";

import styles from "./TopicListItem.scss";
import TopicButton from "components/topic/TopicButton";

const cx = classNames.bind(styles);

class TopicListItem extends Component {
  render() {
    const { title, id, disabled, read, complete } = this.props;
    return (
      <div className={cx("topic-list-item")}>
        <div className={cx("button-control")}>
          <TopicButton
            to={`/topic/${id}`}
            disabled={disabled}
            read={read}
            complete={complete}
          >
            {complete ? (
              <MdSentimentVerySatisfied className={cx("progress-icon")} />
            ) : read ? (
              <MdBatteryCharging20 className={cx("progress-icon")} />
            ) : (
              <MdFlight className={cx("progress-icon")} />
            )}
          </TopicButton>
          <Link className={cx("repeat-icon")} to={`/review/${id}`}>
            <MdCheck />
          </Link>
        </div>
        <div className={cx("title")}>{title}</div>
      </div>
    );
  }
}

export default TopicListItem;
