import {
  isObject, getAfterValue, getBeforeValue, getKey, getStatus, getPath,
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
  const result = diffs
    .filter((item) => getStatus(item) !== 'equal')
    .map((item) => {
      const status = getStatus(item);
      const before = normalize(getBeforeValue(item));
      const after = normalize(getAfterValue(item));
      const key = getKey(item);
      const path = getPath(item);
      const stringPath = [...path, key].join('.');

      switch (status) {
        case 'updated':
          return `Property '${stringPath}' was updated. From ${before} to ${after}`;

        case 'removed':
          return `Property '${stringPath}' was removed`;

        case 'added':
          return `Property '${stringPath}' was added with value: ${after}`;

        default:
          break;
      }

      return '';
    });

  return result.join('\n');
};

export default plain;
