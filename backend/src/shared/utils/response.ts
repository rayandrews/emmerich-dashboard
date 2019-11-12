export interface Response<T, E extends Error> {
  data?: T;
  error?: E;
}
