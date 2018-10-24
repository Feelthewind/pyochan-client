import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";

import TopicList from "components/topic/TopicList";
import * as listActions from "store/modules/list";

class TopicListContainer extends Component {
  getTopicList = () => {
    const { season, ListActions } = this.props; // season comes from page component
    ListActions.initialize();
    ListActions.getTopicList({
      season
    });
  };

  componentDidMount() {
    this.getTopicList();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.season !== this.props.season) {
      this.getTopicList();
    }
  }

  render() {
    const { loading, topics } = this.props;
    if (loading) return null;

    return (
      <div>
        <TopicList topics={topics} />
      </div>
    );
  }
}

export default connect(
  ({ list, pender }) => ({
    topics: list.topics,
    loading: pender.pending["list/GET_TOPIC_LIST"]
  }),
  dispatch => ({
    ListActions: bindActionCreators(listActions, dispatch)
  })
)(withRouter(TopicListContainer));
