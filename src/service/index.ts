import { BASE_URL, TIME_OUT } from "./config";
import HYRequest from "./request";

const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn: (config) => {
      // 这里 config 类型是 InternalAxiosRequestConfig
      return config;
    },
  },
});

export default hyRequest;
