import { Reducer } from 'redux';
import { createReducer } from 'typesafe-actions';

export interface ILoading {
  loading: boolean;
}

export function isLoading(...actions: any[]): Reducer<boolean> {
  const { request, success, failure } = actions.reduce(
    (container, action) => {
      container.request.push(action.request);
      container.success.push(action.success);
      container.failure.push(action.failure);

      return container;
    },
    {
      request: [],
      success: [],
      failure: [],
    },
  );

  return createReducer(false)
    .handleAction(request, (state, action) => true)
    .handleAction(success.concat(failure), (state, action) => false);
}

// export function isLoading2(
//   action1: AsyncActionCreator<any, any, any>,
//   action2: AsyncActionCreator<any, any, any>,
// ) {
//   return createReducer(false)
//     .handleAction([action1.request, action2.request], (state, action) => true)
//     .handleAction(
//       [action1.success, action1.failure, action2.success, action2.failure],
//       (state, action) => false,
//     );
// }
