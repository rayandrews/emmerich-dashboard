import localForage from 'localforage';

localForage.setDriver(localForage.LOCALSTORAGE);

export function loadState<T extends object>(): T | undefined {
  try {
    // const serializedState: string = await localForage.getItem('app:state');
    const serializedState: string = localStorage.getItem('app:state') as string;

    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState) as T;
  } catch (e) {
    console.error('loadStorage error = ', e);
    return undefined;
  }
}

export const saveState = state => {
  const serializedState = JSON.stringify(state);
  localStorage.setItem('app:state', serializedState);

  // try {
  //   const serializedState = JSON.stringify(state);
  //   await localForage.setItem('app:state', serializedState);
  // } catch (e) {
  //   console.log('saveState error = ', e);
  // }
};

export const clearState = (callback?: ((err: any) => void) | undefined) => {
  // localForage.clear(callback);
  window.localStorage.clear();
  // await localForage.removeItem('app:state', () => {
  //   console.log('wew');
  // });
};
