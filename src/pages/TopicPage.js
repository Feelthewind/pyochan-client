import React from "react";
import queryString from "query-string";

import PageTemplate from "components/base/PageTemplate";
import TopicListContainer from "containers/TopicListContainer";

const TopicPage = ({ location }) => {
  const { season = 1 } = queryString.parse(location.search);
  return (
    <PageTemplate>
      <TopicListContainer season={season} />
    </PageTemplate>
  );
};

export default TopicPage;
