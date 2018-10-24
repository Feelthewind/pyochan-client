import { createAction, handleActions } from "redux-actions";

import { produce } from "immer";
import { pender } from "redux-pender";

import * as TopicsAPI from "lib/api/topics";
import * as LessonsAPI from "lib/api/lessons";

// action types
const INITAILIZE = "list/INITIALIZE";
const GET_TOPIC_LIST = "list/GET_TOPIC_LIST";
const GET_LESSON_LIST = "list/GET_LESSON_LIST";
const GET_CHECK_LIST = "list/GET_CHECK_LIST";
const GET_REVIEW_LIST = "list/GET_REVIEW_LIST";
const LIKE_LESSON = "list/LIKE_LESSON";
const UNLIKE_LESSON = "list/UNLIKE_LESSON";
const REMOVE_REVIEW = "list/REMOVE_REVIEW";
const SET_LIKE = "list/SET_LIKE";
const SET_UNLIKE = "list/SET_UNLIKE";
const COLLAPSE = "list/COLLAPSE";
const REVIEW_COLLAPSE = "list/REVIEW_COLLAPSE";
const SET_AUDIO_URL = "list/SET_AUDIO_URL";

// action creators
export const initialize = createAction(INITAILIZE);
export const getTopicList = createAction(GET_TOPIC_LIST, TopicsAPI.getTopics);
export const getLessonList = createAction(
  GET_LESSON_LIST,
  LessonsAPI.getLessons
);
export const getCheckList = createAction(GET_CHECK_LIST, LessonsAPI.getChecks);
export const getReviewList = createAction(
  GET_REVIEW_LIST,
  LessonsAPI.getReviews
);
export const likeLesson = createAction(LIKE_LESSON, LessonsAPI.likeLesson);
export const unlikeLesson = createAction(
  UNLIKE_LESSON,
  LessonsAPI.unlikeLesson
);
export const setLike = createAction(SET_LIKE);
export const setUnlike = createAction(SET_UNLIKE);
export const removeReview = createAction(REMOVE_REVIEW);
export const collapse = createAction(COLLAPSE);
export const reviewCollapse = createAction(REVIEW_COLLAPSE);
export const setAudioUrl = createAction(SET_AUDIO_URL);

// initial state =
const initialState = {
  topics: [],
  lessons: [],
  reviews: [],
  currentAudioUrl:
    "https://s3-ap-northeast-1.amazonaws.com/pyochan.com.polly/speech-160546d4-ebf3-4ea3-8aad-2c40238afdf1.mp3"
};

// reducer
export default handleActions(
  {
    [INITAILIZE]: state =>
      produce(state, draft => {
        draft = initialState;
      }),
    [SET_AUDIO_URL]: (state, action) => {
      return produce(state, draft => {
        const { id } = action.payload;
        const lesson = draft.lessons.find(lesson => lesson.id === id);
        draft.currentAudioUrl = lesson.audioUrl;
      });
    },
    [REMOVE_REVIEW]: (state, action) => {
      return produce(state, draft => {
        draft.reviews = draft.reviews.filter(
          review => review.id !== action.payload.lessonId
        );
      });
    },
    [SET_LIKE]: (state, action) => {
      const { lessonId } = action.payload;
      return produce(state, draft => {
        const index = draft.lessons.findIndex(lesson => {
          return lesson.id === lessonId;
        });
        draft.lessons[index].liked = true;
      });
    },
    [SET_UNLIKE]: (state, action) => {
      const { lessonId } = action.payload;
      return produce(state, draft => {
        const index = draft.lessons.findIndex(lesson => {
          return lesson.id === lessonId;
        });
        draft.lessons[index].liked = false;
      });
    },
    [COLLAPSE]: (state, action) => {
      const { id } = action.payload;
      return produce(state, draft => {
        draft.lessons = draft.lessons.map(lesson => {
          if (lesson.id === id) {
            return {
              ...lesson,
              collapsed: true
            };
          } else {
            return {
              ...lesson,
              collapsed: false
            };
          }
        });
      });
    },
    [REVIEW_COLLAPSE]: (state, action) => {
      const { id } = action.payload;
      return produce(state, draft => {
        draft.reviews = draft.reviews.map(review => {
          if (review.id === id) {
            return {
              ...review,
              collapsed: true
            };
          } else {
            return {
              ...review,
              collapsed: false
            };
          }
        });
      });
    },
    ...pender({
      type: GET_REVIEW_LIST,
      onSuccess: (state, action) => {
        return produce(state, draft => {
          console.log(
            "action.payload.data.reviews",
            action.payload.data.reviews
          );
          draft.lessons = action.payload.data;
        });
      }
    }),
    ...pender({
      type: GET_TOPIC_LIST,
      onSuccess: (state, action) => {
        return produce(state, draft => {
          draft.topics = action.payload.data;
        });
      }
    }),
    ...pender({
      type: GET_CHECK_LIST,
      onSuccess: (state, action) => {
        return produce(state, draft => {
          draft.reviews = action.payload.data.reviews;
        });
      }
    }),
    ...pender({
      type: GET_LESSON_LIST,
      onSuccess: (state, action) => {
        return produce(state, draft => {
          const { data: lessons } = action.payload;
          const result = lessons.map(lesson => {
            return {
              ...lesson,
              collapsed: false
            };
          });
          draft.lessons = result;
        });
      }
    }),
    ...pender({
      type: LIKE_LESSON,
      onFailure: (state, action) => {
        const { lessonId } = action.payload.data;
        return produce(state, draft => {
          const index = draft.lessons.findIndex(lesson => {
            return lesson.id === parseInt(lessonId, 10);
          });
          draft.lessons[index].liked = false;
        });
      }
    }),
    ...pender({
      type: UNLIKE_LESSON,
      onFailure: (state, action) => {
        const { lessonId } = action.payload.data;
        return produce(state, draft => {
          const index = draft.lessons.findIndex(lesson => {
            return lesson.id === parseInt(lessonId, 10);
          });
          draft.lessons[index].liked = true;
        });
      }
    })
  },
  initialState
);
