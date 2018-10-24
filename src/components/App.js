import React from "react";
import { Switch, Route } from "react-router-dom";
import {
  LessonPage,
  MainPage,
  TopicPage,
  CheckPage,
  ReviewPage,
  NotFoundPage
} from "pages";
import LoginModalContainer from "containers/LoginModalContainer";
import Core from "containers/base/Core";

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/topic" component={TopicPage} />
        <Route exact path="/topic/:id" component={LessonPage} />
        <Route exact path="/check" component={CheckPage} />
        <Route exact path="/review/:id" component={ReviewPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <LoginModalContainer />
      <Core />
    </div>
  );
};

export default App;
