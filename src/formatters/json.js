import {
  getAfterValue, getBeforeValue, getKey, getStatus, getPath,
} from '../utils.js';

const json = (diffs) => {
  const result = diffs
    .filter((item) => getStatus(item) !== 'equal')
    .map((item) => {
      const status = getStatus(item);
      const before = getBeforeValue(item);
      const after = getAfterValue(item);
      const key = getKey(item);
      const path = getPath(item);
      const stringPath = [...path, key].join('.');

      const mappedItem = { path: stringPath, status };

      switch (status) {
        case 'updated':
          return { ...mappedItem, before, after };

        case 'removed':
          return { ...mappedItem, before };

        case 'added':
          return { ...mappedItem, after };

        default:
          break;
      }

      return { ...mappedItem, before, after };
    });

  return JSON.stringify(result);
};

export default json;
