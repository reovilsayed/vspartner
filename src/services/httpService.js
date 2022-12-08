import axios from 'axios';
const baseURL = process.env.REACT_APP_API_BASE;
const instance = axios.create({
  baseURL,
  timeout: 15000,
  withCredentials: true,
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  return {
    ...config,
    withCredentials: true,
    headers: {
      Accept: 'application/json',
      // 'Content-Type': 'multipart/form-data',
    },
  };
});

const responseBody = (response) => response.data;

const requests = {
  get: (url) => instance.get(url).then(responseBody),
  post: (url, body) => instance.post(url, body).then(responseBody),
  patch: (url, body) => instance.patch(url, body).then(responseBody),
  delete: (url) => instance.delete(url).then(responseBody),
};

export default requests;
