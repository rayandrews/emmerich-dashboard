import * as R from 'ramda';

const _capitalize = R.compose(
  R.join(''),
  R.juxt([R.compose(R.toUpper, R.head), R.tail]),
);

export const capitalize: (c: string) => string = R.ifElse(
  R.equals(null),
  R.identity,
  _capitalize,
);
