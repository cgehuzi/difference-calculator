import _ from 'lodash';
import parseFile from './parsers.js';
import makeDiff, { isObject } from './utils.js';
import getFormatter from './formatters/index.js';

const genDiff = (file1, file2, formatName = 'stylish') => {
  const json1 = parseFile(file1);
  const json2 = parseFile(file2);

  const iter = (data1, data2, path) => {
    const keys = Object.keys({ ...data1, ...data2 }).sort();

    const diffs = keys.reduce((acc, key) => {
      const value1 = _.cloneDeep(data1[key]);
      const value2 = _.cloneDeep(data2[key]);
      const nexPath = [...path, key];

      if (_.has(data1, key)) {
        if (_.has(data2, key)) {
          if (_.isEqual(value1, value2)) {
            acc.push(makeDiff(key, path, value1, value2, 'equal'));
          } else if (isObject(value1) && isObject(value2)) {
            acc.push(iter(value1, value2, nexPath));
          } else {
            acc.push(makeDiff(key, path, value1, value2, 'updated'));
          }
        } else {
          acc.push(makeDiff(key, path, value1, value2, 'removed'));
        }
      } else {
        acc.push(makeDiff(key, path, value1, value2, 'added'));
      }

      return acc;
    }, []);

    return diffs;
  };

  const result = _.flattenDeep(iter(json1, json2, []));
  const formatter = getFormatter(formatName);

  return formatter(result);
};

export default genDiff;
