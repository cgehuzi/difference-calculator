import _ from 'lodash';
import {
  isObject,
  getAfterValue,
  getBeforeValue,
  getKey,
  getStatus,
  isDiff,
  getChildren,
} from '../tree.js';

const normalize = (item) => {
  if (typeof item === 'string') {
    return `'${item}'`;
  }

  if (isObject(item)) {
    return '[complex value]';
  }

  return item;
};

const plain = (diffs) => {
  const setPath = (list, path = []) =>
    list.flatMap((item) => {
      const key = getKey(item);
      const nowPath = [...path];
      nowPath.push(key);

      if (isDiff(item)) {
        const newItem = _.cloneDeep(item);
        newItem.path = nowPath.join('.');
        return newItem;
      }

      const children = getChildren(item);
      return setPath(children, nowPath);
    });

  const diffsPathed = setPath(diffs);

  const result = [];

  const iter = (item) => {
    if (isDiff(item)) {
      const status = getStatus(item);
      const before = getBeforeValue(item);
      const after = getAfterValue(item);

      switch (status) {
        case 'updated':
          result.push(`Property '${item.path}' was updated. From ${normalize(before)} to ${normalize(after)}`);
          break;

        case 'deleted':
          result.push(`Property '${item.path}' was removed`);
          break;

        case 'added':
          result.push(`Property '${item.path}' was added with value: ${normalize(after)}`);
          break;

        default:
          break;
      }
    } else {
      const children = getChildren(item);
      result.push(children.flatMap(iter));
    }
  };

  diffsPathed.map(iter);

  return result.join('\n');
};

export default plain;
