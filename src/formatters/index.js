import _ from 'lodash';
import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatters = { stylish, plain, json };

const getFormatter = (formatName) => {
  if (!_.has(formatters, formatName)) {
    throw new Error(`Unknown formatter: '${formatName}'.`);
  }
  return formatters[formatName];
};
export default getFormatter;
