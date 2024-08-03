import AsyncStorage from '@react-native-async-storage/async-storage';

export const AsyncStorageKeys = {
  TITLE_KEY: '@title',
  FIRST_NAME_KEY: '@first-name',
  LANG_KEY: '@lang',
  ACCESS_TOKEN: '@access-token',
};

export const setDataToAsyncStorage = (
  key: string,
  data: string,
): Promise<void> => {
  return AsyncStorage.setItem(key, data);
};
export const setLastLang = (key: string, data: 'en' | 'si'): Promise<void> => {
  return AsyncStorage.setItem(key, data);
};

export const getDataFromAsyncStorage = (key: string): Promise<any> => {
  return AsyncStorage.getItem(key);
};
