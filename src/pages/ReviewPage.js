import React from "react";
import PageTemplate from "components/base/PageTemplate";
import ReviewListContainer from "containers/ReviewListContainer";
import queryString from "query-string";

const CheckPage = ({ location, match }) => {
  const { id } = match.params;
  return (
    <PageTemplate>
      <ReviewListContainer topicId={id} />
      {/* <Button theme="yellow">학습완료</Button> */}
    </PageTemplate>
  );
};

export default CheckPage;
