import React from "react";
import PageTemplate from "components/base/PageTemplate";
import CheckListContainer from "containers/CheckListContainer";
import queryString from "query-string";

const CheckPage = ({ location, match }) => {
  // const { id = 1 } = match.params;
  return (
    <PageTemplate>
      <CheckListContainer />
      {/* <Button theme="yellow">학습완료</Button> */}
    </PageTemplate>
  );
};

export default CheckPage;
