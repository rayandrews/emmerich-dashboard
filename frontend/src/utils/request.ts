import axios, { AxiosInstance } from 'axios';

import { Store } from 'redux';

import { ApplicationState } from '@/reducers';

import * as auth from '@/reducers/auth';
import * as app from '@/reducers/app';

export * from 'axios';

export let request: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
  timeout: 2000,
});

export function getRequestInstance(): AxiosInstance {
  return request;
}

export function initializeRequest(store: Store<ApplicationState>) {
  const modifyAccessToken = () => {
    const accessToken = auth.getAccessTokenFromAuth(store.getState().auth);
    request.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
  };

  store.subscribe(modifyAccessToken);

  request.interceptors.response.use(
    response => {
      const { data, status } = response;

      if (status !== 200 && status !== 201) {
        return Promise.reject(new Error(data.message || 'Error'));
      } else {
        return Promise.resolve(response);
      }
    },
    error => {
      const { status } = error.response;

      if (status === 401) {
        store.dispatch(
          app.addNotification({
            title: 'Log Out',
            message:
              'You have been logged out and not authorized anymore, try to login again.',
            level: 'error',
          }),
        );
        // store.dispatch(push(routes.auth.login));
      } else if (status === 403) {
        store.dispatch(
          app.addNotification({
            title: 'Forbidden',
            message: 'You are not allow to do this action.',
            level: 'error',
          }),
        );
      }

      return Promise.reject(error);
    },
  );
}
