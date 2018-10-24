import React, { Component } from "react";
import classNames from "classnames/bind";

import styles from "./TopicList.scss";
import TopicListItem from "components/topic/TopicListItem";

const cx = classNames.bind(styles);

class TopicList extends Component {
  render() {
    const { topics } = this.props;

    const topicList = topics.map(item => {
      const { topic, id, disabled, read, complete } = item; // TODO: implement disabled related stuffs!
      return (
        <TopicListItem
          key={id}
          id={id}
          title={topic}
          read={read}
          complete={complete}
          disabled={disabled}
        />
      );
    });

    return <div className={cx("topic-list")}>{topicList}</div>;
  }
}

export default TopicList;
