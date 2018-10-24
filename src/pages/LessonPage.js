import React from "react";
import PageTemplate from "components/base/PageTemplate";
import LessonListContainer from "containers/LessonListContainer";

const LessonPage = ({ location, match }) => {
  const { id = 1 } = match.params;
  return (
    <PageTemplate>
      <LessonListContainer topicId={id} />
    </PageTemplate>
  );
};

export default LessonPage;
