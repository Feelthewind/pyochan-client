import { createAction, handleActions } from "redux-actions";

import { produce } from "immer";
import { pender } from "redux-pender";
import * as AuthAPI from "lib/api/auth";

const INITIALIZE = "auth/INITIALIZE";
const CHANGE_INPUT = "auth/CHANGE_INPUT";
const LOCAL_REGISTER = "auth/LOCAL_REGISTER";
const LOCAL_LOGIN = "auth/LOCAL_LOGIN";
const SET_MODE = "auth/SET_MODE";

export const changeInput = createAction(CHANGE_INPUT);
export const localRegister = createAction(
  LOCAL_REGISTER,
  AuthAPI.localRegister
);
export const localLogin = createAction(LOCAL_LOGIN, AuthAPI.localLogin);
export const setMode = createAction(SET_MODE);
export const initialize = createAction(INITIALIZE);

const initialState = {
  mode: "login",
  form: {
    email: "",
    password: ""
  },
  error: null,
  loginResult: null
};

export default handleActions(
  {
    [INITIALIZE]: state => {
      return initialState;
    },
    [CHANGE_INPUT]: (state, action) => {
      const { name, value } = action.payload;
      return produce(state, draft => {
        draft.form[name] = value;
      });
    },
    [SET_MODE]: (state, action) => {
      return produce(state, draft => {
        draft.mode = action.payload;
      });
    },
    ...pender({
      type: LOCAL_REGISTER,
      onSuccess: (state, action) => {
        const { data: user } = action.payload;
        return produce(state, draft => {
          draft.loginResult = user;
        });
      },
      onFailure: (state, action) => {
        return produce(state, draft => {
          draft.error = {
            message: ["アカウントが間違っています"]
          };
        });
      }
    }),
    ...pender({
      type: LOCAL_LOGIN,
      onSuccess: (state, action) => {
        return produce(state, draft => {
          draft.loginResult = action.payload.data;
        });
      },
      onFailure: (state, action) => {
        return produce(state, draft => {
          draft.error = {
            message: ["アカウントが間違っています"]
          };
        });
      }
    })
  },
  initialState
);
