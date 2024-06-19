import { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import * as Keychain from 'react-native-keychain';
import { store } from '../storeReduxToolkit/store';
import { setAccessToken, removeAccessToken } from '../storeReduxToolkit/authorizationSlice';
import { refreshToken } from '../services';

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (token: string) => {
  refreshSubscribers.map(cb => cb(token));
  refreshSubscribers = [];
};

export const setupInterceptorsTo = (api: AxiosInstance) => {
  const excludedEndpoints = [
    'auth/login/student',
    'auth/login/supporter',
    '/auth/signup/student',
    '/auth/signup/supporter',
  ];

  api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      const state = store.getState();
      const clientLanguage = state.language.value.toLowerCase();
      console.log("clientLanguage: ", clientLanguage);
  
      if (clientLanguage && config.headers) {
        config.headers['accept-language'] = clientLanguage;
      }
  
      if (excludedEndpoints.some(endpoint => config.url?.includes(endpoint))) {
        return config;
      }
     
      const token = state.authorization.accessToken;
      console.log('Sending request with accessToken: ', token);
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      if (clientLanguage && config.headers) {
        config.headers['clientLanguage'] = clientLanguage;
      }
      return config;
    },
    error => Promise.reject(error),
  );

  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    async error => {
      const { config, response } = error;
      const originalRequest = config;
      console.log("error response", error);
      console.log("error details:", {
        url: originalRequest.url,
        method: originalRequest.method,
        headers: originalRequest.headers,
        data: originalRequest.data,
      });

      if (excludedEndpoints.some(endpoint => originalRequest.url?.includes(endpoint))) {
        return Promise.reject(error);
      }

      if (response && response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        if (!isRefreshing) {
          isRefreshing = true;
          try {
            console.log("Attempting to refresh token");
            const data = await refreshToken();
            const { accessToken } = data;
            console.log('New access token: ', accessToken);
            store.dispatch(setAccessToken(accessToken));

            onRefreshed(accessToken);
            isRefreshing = false;
          } catch (err) {
            isRefreshing = false;
            console.error('Failed to refresh token:', err);
            await Keychain.resetGenericPassword({ service: 'refreshToken' });
            store.dispatch(removeAccessToken());
            // TODO Navigation needed to login
            return Promise.reject(err);
          }
        }

        const retryOriginalRequest = new Promise<AxiosResponse>(resolve => {
          subscribeTokenRefresh((token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          });
        });

        return retryOriginalRequest;
      }

      return Promise.reject(error);
    },
  );

  return api;
};
