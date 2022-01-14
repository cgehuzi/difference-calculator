const isObject = (data) => Object.prototype.toString.call(data) === '[object Object]';

const makeDiff = (key, path, before, after, status) => ({
  type: 'diff',
  key,
  path,
  before,
  after,
  status,
});

const isDiff = (item) => item.type === 'diff';
const getKey = (item) => item.key;
const getPath = (item) => item.path;
const getBeforeValue = (diff) => diff.before;
const getAfterValue = (diff) => diff.after;
const getStatus = (item) => item.status;

export default makeDiff;
export {
  isObject, isDiff, getKey, getPath, getBeforeValue, getAfterValue, getStatus,
};
