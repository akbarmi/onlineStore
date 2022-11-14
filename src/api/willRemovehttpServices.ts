import axios, { AxiosResponse } from "axios";

axios.defaults.headers.post["Content-Type"] = "application/json";
const TOKEN = localStorage.getItem("token");
if (TOKEN) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${TOKEN}`;
}

axios.interceptors.response.use(undefined, (error) => {
  const expectedErrors =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedErrors) {
    console.log(error);
  }
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
