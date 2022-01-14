import {
  isObject,
  getAfterValue,
  getBeforeValue,
  getKey,
  getStatus,
  isDiff,
  getPath,
} from '../utils.js';

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
  const result = [];

  const iter = (item) => {
    if (isDiff(item)) {
      const status = getStatus(item);
      const before = normalize(getBeforeValue(item));
      const after = normalize(getAfterValue(item));
      const key = getKey(item);
      const path = getPath(item);
      const stringPath = [...path, key].join('.');

      switch (status) {
        case 'updated':
          result.push(`Property '${stringPath}' was updated. From ${before} to ${after}`);
          break;

        case 'removed':
          result.push(`Property '${stringPath}' was removed`);
          break;

        case 'added':
          result.push(`Property '${stringPath}' was added with value: ${after}`);
          break;

        default:
          break;
      }
    }
  };

  diffs.map(iter);

  return result.join('\n');
};

export default plain;
