import axios, { CanceledError } from 'axios';
import { AsyncStorageKeys, getDataFromAsyncStorage, setDataToAsyncStorage } from "@/util/AsyncStorageUtil";
import { router } from "expo-router";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

apiClient.interceptors.request.use(async function (request) {
  const accesskey = await getDataFromAsyncStorage(AsyncStorageKeys.ACCESS_TOKEN);
  if (!accesskey) {
    router.replace('/login');
  } else {
    request.headers['Authorization'] = `${accesskey}`;
  }
  return request;
}, function (error) {
  return Promise.reject(error);
});

export default apiClient;
export { CanceledError };
