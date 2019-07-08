import axios from "axios";

axios.defaults.baseURL = "http://uqer.ccbfund.cn/";
axios.defaults.withCredentials = true;
axios.defaults.headers.common["Content-Type"] = "application/json";

export const noParser = data =>
  new Promise(resolve => {
    resolve(data);
  });

const defaultParser = data =>
  new Promise((resolve, reject) => {
    if (data.code === 200 || data.code === 0) {
      resolve(data.data);
    } else if (data.success === true) {
      resolve(data.data);
    }

    reject(data);
  });

export const callApi = (endpoint, options) =>
  axios(endpoint, options)
    .then(response => response.data)
    .then((options && options.parser) || defaultParser)
    .then(
      response => ({ response }),
      error => {
        throw new Error(error.message || error.msg || "Something bad happened");
      }
    );

export default axios;
