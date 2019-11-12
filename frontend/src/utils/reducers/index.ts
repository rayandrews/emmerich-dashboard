import { IError } from './isError';
import { ILoading } from './isLoading';

export * from './isError';
export * from './isLoading';

export interface IErrorWithLoading<T> extends IError, ILoading {
  state: T;
}
