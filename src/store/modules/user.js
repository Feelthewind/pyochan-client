import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import * as AuthAPI from "lib/api/auth";
import pender from "redux-pender/lib/pender";

const SET_USER = "user/SET_USER";
const LOGOUT = "user/LOGOUT";
const CHECK_USER = "user/CHECK_USER";

export const setUser = createAction(SET_USER);
export const logout = createAction(LOGOUT, AuthAPI.logout);
export const checkUser = createAction(CHECK_USER, AuthAPI.check);

const initialState = {
  user: null,
  clickPush: false
};

export default handleActions(
  {
    [SET_USER]: (state, action) => {
      return produce(state, draft => {
        draft.user = action.payload;
      });
    },
    ...pender({
      type: LOGOUT,
      onSuccess: (state, action) => {
        return produce(state, draft => {
          draft.user = null;
        });
      }
    }),
    ...pender({
      type: CHECK_USER,
      onSuccess: (state, { payload: { data } }) => {
        return produce(state, draft => {
          draft.user = data.user;
        });
      },
      onError: state => {
        return produce(state, draft => {
          draft.user = null;
        });
      }
    })
  },
  initialState
);
