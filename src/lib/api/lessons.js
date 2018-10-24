import axios from "lib/defaultClient";
import queryString from "query-string";

export const getLessons = ({ topicId }) => {
  return axios.get(`/api/lessons/?${queryString.stringify({ topicId })}`);
};

export const likeLesson = ({ lessonId }) => {
  return axios.post(`/api/lessons/like/${lessonId}`);
};

export const unlikeLesson = ({ lessonId }) => {
  return axios.post(`/api/lessons/unlike/${lessonId}`);
};

export const getChecks = () => {
  return axios.get("/api/lessons/check");
};

export const getReviews = ({ topicId }) => {
  return axios.get(
    `/api/lessons/review/?${queryString.stringify({ isReview: true, topicId })}`
  );
};
