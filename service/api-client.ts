import axios, {CanceledError} from 'axios';


const apiClient = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

apiClient.interceptors.request.use(function (request) {
  // request.headers.Authorization =  Cookies.get(TOKEN);
  return request;
}, function (error) {
  return Promise.reject(error);
});

export default apiClient;

export {CanceledError};
