import _ from 'lodash';
import * as fs from 'fs';

const genDiff = (file1, file2) => {
  const json1 = JSON.parse(fs.readFileSync(file1, 'utf-8'));
  const json2 = JSON.parse(fs.readFileSync(file2, 'utf-8'));

  const keys = Object.keys({ ...json1, ...json2 }).sort();
  const diffs = keys
    .reduce((acc, key) => {
      if (_.has(json1, key)) {
        if (_.has(json2, key)) {
          if (json1[key] === json2[key]) {
            acc.push(`  ${key}: ${json1[key]}`);
          } else {
            acc.push(`- ${key}: ${json1[key]}`);
            acc.push(`+ ${key}: ${json2[key]}`);
          }
        } else {
          acc.push(`- ${key}: ${json1[key]}`);
        }
      } else {
        acc.push(`+ ${key}: ${json2[key]}`);
      }

      return acc;
    }, [])
    .map((item) => `  ${item}`);

  return ['{', ...diffs, '}'].join('\n');
};

export default genDiff;
