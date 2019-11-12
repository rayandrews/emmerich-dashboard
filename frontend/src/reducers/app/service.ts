import { request, AxiosPromise } from '@/utils/request';

import { CsrfResponse } from './types';

export const csrfService = () =>
  request.get<CsrfResponse>('/csrfToken').then(response => {
    request.defaults.headers['CSRF-Token'] = response.data.token;

    return {
      token: response.data.token,
    };
  }) as AxiosPromise<CsrfResponse>;
