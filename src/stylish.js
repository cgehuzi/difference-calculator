import {
  isObject,
  getAfterValue,
  getBeforeValue,
  getKey,
  getStatus,
  isDiff,
  getChildren,
} from './tree.js';

const normalize = (item) => {
  if (!isObject(item)) {
    return item !== null ? item.toString() : 'null';
  }

  return Object.entries(item).reduce((acc, [key, value]) => {
    acc[`  ${key}`] = normalize(value);
    return acc;
  }, {});
};

const stringify = (value, replacer = '  ') => {
  const iter = (item, spaces) => {
    if (typeof item !== 'object') {
      return item.toString();
    }

    const spaceLine = `${replacer.repeat(spaces + 1)}`;
    const spaceClose = `${replacer.repeat(spaces)}`;

    const entries = Object.entries(item);
    const lines = entries.map(([key, val]) => {
      const formattedVal = iter(val, spaces + 2);
      return `${spaceLine}${key}: ${formattedVal}`;
    });

    return ['{', ...lines, `${spaceClose}}`].join('\n');
  };

  return iter(value, 0);
};

const stylish = (diffs) => {
  const iter = (acc, item) => {
    const key = getKey(item);

    if (isDiff(item)) {
      const status = getStatus(item);
      const before = getBeforeValue(item);
      const after = getAfterValue(item);

      switch (status) {
        case 'updated':
          acc[`- ${key}`] = normalize(before);
          acc[`+ ${key}`] = normalize(after);
          break;

        case 'deleted':
          acc[`- ${key}`] = normalize(before);
          break;

        case 'added':
          acc[`+ ${key}`] = normalize(after);
          break;

        default:
          acc[`  ${key}`] = normalize(before);
          break;
      }
    } else {
      const childrenObject = getChildren(item).reduce(iter, {});
      acc[`  ${key}`] = childrenObject;
    }

    return acc;
  };

  const diffsObject = diffs.reduce(iter, {});

  return stringify(diffsObject);
};

export default stylish;
