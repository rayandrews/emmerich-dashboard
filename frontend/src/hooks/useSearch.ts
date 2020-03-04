/**
 Taken from this stackoverflow answer :
 https://stackoverflow.com/questions/23123138/perform-debounce-in-react-js
*/

import React from 'react';

import AwesomeDebouncePromise from 'awesome-debounce-promise';
import useConstant from 'use-constant';
import { useAsync } from 'react-async-hook';

import { RequestQueryBuilder, CondOperator } from '@nestjsx/crud-request';

import { AxiosPromise } from '@/utils/request';

// export type BasicService<T> = (meta: string) => AxiosPromise<T>;
export type ServiceWithPayload<T> = (
  payload: any,
  meta: string,
) => AxiosPromise<T>;

export interface Options<T> {
  field: string;
  service: ServiceWithPayload<T>;
}

// function serviceNormalizer<T>(service: ServiceWithPayload<T>) {
//   return async (payload: any, meta: string) => {
//     const result = await service(payload, meta);

//     if (result.status !== 200) {
//       throw new Error('bad status = ' + result.status);
//     }

//     return Promise.resolve(result.data);
//   }
// }

export function useSearch<T>({ field, service }: Options<T>) {
  const [inputText, setInputText] = React.useState('');

  const debounceSearch = useConstant(() =>
    AwesomeDebouncePromise(service, 150),
  );

  const search = useAsync(async () => {
    if (inputText.length === 0) {
      const queries = RequestQueryBuilder.create({
        page: 1,
        limit: 25,
      }).query();
      const result = await service(undefined, queries);
      return result.data;
    } else {
      const queries = RequestQueryBuilder.create({
        filter: [{ field, value: inputText, operator: CondOperator.CONTAINS }],
      }).query();

      const result = await debounceSearch(undefined, queries);

      return result.data;
    }
  }, [inputText]);

  return {
    inputText,
    setInputText,
    search,
  };
}
