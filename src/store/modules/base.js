import { createAction, handleActions } from "redux-actions";

import { produce } from "immer";
import { pender } from "redux-pender";
import { create } from "domain";

// action types
const SHOW_MODAL = "base/SHOW_MODAL";
const HIDE_MODAL = "base/HIDE_MODAL";
const SET_REQUEST = "base/SET_REQUEST";

// action creators
export const showModal = createAction(SHOW_MODAL);
export const hideModal = createAction(HIDE_MODAL);
export const setRequest = createAction(SET_REQUEST);

// initial state =
const initialState = {
  modal: {
    login: false
  },
  event: null,
  requested: false
};

// reducer
export default handleActions(
  {
    [SHOW_MODAL]: (state, action) => {
      const { payload: modalName } = action;
      return produce(state, draft => {
        draft.modal[modalName] = true;
      });
    },
    [HIDE_MODAL]: (state, action) => {
      const { payload: modalName } = action;
      return produce(state, draft => {
        draft.modal[modalName] = false;
      });
    },
    [SET_REQUEST]: (state, action) => {
      return produce(state, draft => {
        draft.requested = true;
      });
    }
  },
  initialState
);
