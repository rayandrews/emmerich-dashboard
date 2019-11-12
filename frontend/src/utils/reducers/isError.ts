import {
  createReducer,
  ActionType,
  PayloadActionCreator,
  AsyncActionCreatorBuilder,
} from 'typesafe-actions';

export interface IError {
  error: any;
}

export function isError(
  ...failures: AsyncActionCreatorBuilder<any, any, any>['failure'][]
) {
  return createReducer(null).handleAction(
    failures,
    (state, action: ActionType<PayloadActionCreator<any, any>>) =>
      action.payload,
  );
}
