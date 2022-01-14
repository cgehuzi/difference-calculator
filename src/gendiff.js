import _ from 'lodash';
import parseFile from './parsers.js';
import makeDiff, { isObject } from './utils.js';
import getFormatter from './formatters/index.js';

const genDiff = (file1, file2, formatName = 'stylish') => {
  const json1 = parseFile(file1);
  const json2 = parseFile(file2);

  const iter = (data1, data2, path) => {
    const keys = _.sortBy(Object.keys({ ...data1, ...data2 }));

    const diffs = keys.reduce((acc, key) => {
      const value1 = _.cloneDeep(data1[key]);
      const value2 = _.cloneDeep(data2[key]);
      const nexPath = [...path, key];

      if (_.has(data1, key)) {
        if (_.has(data2, key)) {
          if (_.isEqual(value1, value2)) {
            return [...acc, makeDiff(key, path, value1, value2, 'equal')];
          }

          if (isObject(value1) && isObject(value2)) {
            return [...acc, iter(value1, value2, nexPath)];
          }

          return [...acc, makeDiff(key, path, value1, value2, 'updated')];
        }

        return [...acc, makeDiff(key, path, value1, value2, 'removed')];
      }

      return [...acc, makeDiff(key, path, value1, value2, 'added')];
    }, []);

    return diffs;
  };

  const result = _.flattenDeep(iter(json1, json2, []));
  const formatter = getFormatter(formatName);

  return formatter(result);
};

export default genDiff;
