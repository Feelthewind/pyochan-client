import { createAction, handleActions } from "redux-actions";

import { produce } from "immer";
import { pender } from "redux-pender";
import * as topicsAPI from "lib/api/topics";
// action types
const COMPLETE_TOPIC = "topic/COMPLETE_TOPIC";

// action creators
export const completeTopic = createAction(
  COMPLETE_TOPIC,
  topicsAPI.completeTopic
);

// action creators

// initial state =
const initialState = {};

// reducer
export default handleActions(
  {
    ...pender({
      type: COMPLETE_TOPIC
      // onSuccess: (state, action) => {
      //   return produce(state, draft => {
      //     console.log(
      //       "action.payload.data.reviews",
      //       action.payload.data.reviews
      //     );
      //     draft.lessons = action.payload.data.lessons;
      //   });
      // }
    })
  },
  initialState
);
