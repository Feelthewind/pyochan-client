import axios from "lib/defaultClient";
import queryString from "query-string";

export const getTopics = ({ season }) => {
  return axios.get(`/api/topics/?${queryString.stringify({ season })}`);
};

export const completeTopic = ({ topicId }) => {
  return axios.post(`/api/topics/complete/${topicId}`);
};
