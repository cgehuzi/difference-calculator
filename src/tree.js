import _ from 'lodash';

const makeDiff = (key, before, after, status) => ({
  type: 'diff',
  key,
  before,
  after,
  status,
});
const isDiff = (item) => item.type === 'diff';

const makeParent = (key, children) => ({
  type: 'parent',
  key,
  children,
});
const isParent = (item) => item.type === 'parent';

const getKey = (item) => item.key;
const getBeforeValue = (diff) => diff.before;
const getAfterValue = (diff) => diff.after;
const getStatus = (item) => item.status;
const getChildren = (parent) => parent.children;

export {
  makeDiff,
  isDiff,
  makeParent,
  isParent,
  getKey,
  getBeforeValue,
  getAfterValue,
  getStatus,
  getChildren,
};
