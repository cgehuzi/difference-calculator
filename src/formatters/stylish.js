import _ from 'lodash';
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
  if (item === undefined) {
    return undefined;
  }

  if (!isObject(item)) {
    return item !== null ? item.toString() : 'null';
  }

  return Object.entries(item).reduce((acc, [key, value]) => {
    acc[`  ${key}`] = normalize(value);
    return acc;
  }, {});
};

const normalizePath = (path) => path.map((item) => `  ${item}`);

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
      const before = normalize(getBeforeValue(item));
      const after = normalize(getAfterValue(item));
      const path = normalizePath(getPath(item));

      switch (status) {
        case 'updated':
          _.set(acc, [...path, `- ${key}`], before);
          _.set(acc, [...path, `+ ${key}`], after);
          break;

        case 'deleted':
          _.set(acc, [...path, `- ${key}`], before);
          break;

        case 'added':
          _.set(acc, [...path, `+ ${key}`], after);
          break;

        default:
          _.set(acc, [...path, `  ${key}`], before);
          break;
      }
    }

    return acc;
  };

  const diffsObject = diffs.reduce(iter, {});

  return stringify(diffsObject);
};

export default stylish;
