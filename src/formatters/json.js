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

      const mappedItem = {};
      mappedItem.path = stringPath;
      mappedItem.status = status;

      switch (status) {
        case 'updated':
          mappedItem.before = before;
          mappedItem.after = after;
          break;

        case 'deleted':
          mappedItem.before = before;
          break;

        case 'added':
          mappedItem.after = after;
          break;

        default:
          break;
      }

      return mappedItem;
    });

  return JSON.stringify(result);
};

export default json;
