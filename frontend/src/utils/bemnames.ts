import classNames from 'classnames';
import { ClassValue } from 'classnames/types';

export const createBEM = namespace => {
  return {
    create: (blockName: ClassValue) => {
      let block = blockName;

      if (typeof namespace === 'string') {
        block = `${namespace}-${blockName}`;
      }

      return {
        b: (...more: ClassValue[]) => {
          return classNames(block, more);
        },
        e: (className, ...more: ClassValue[]) => {
          return classNames(`${block}__${className}`, more);
        },
        m: (className, ...more: ClassValue[]) => {
          return classNames(`${block}--${className}`, more);
        },
      };
    },
  };
};

export const bemNames = createBEM('cr');

export default bemNames;
