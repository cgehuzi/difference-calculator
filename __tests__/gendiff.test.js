import { test, expect } from '@jest/globals';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixteruPath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixteruPath(filename), 'utf-8');

test('genDiff - line structure', () => {
  const json1 = getFixteruPath('line_file1.json');
  const yaml1 = getFixteruPath('line_file1.yml');
  const json2 = getFixteruPath('line_file2.json');
  const yaml2 = getFixteruPath('line_file2.yaml');
  const diffs = readFile('line_diffs');

  expect(genDiff(json1, json2)).toEqual(diffs);
  expect(genDiff(yaml1, yaml2)).toEqual(diffs);
  expect(genDiff(yaml1, json2)).toEqual(diffs);
});

test('genDiff - tree structure', () => {
  const json1 = getFixteruPath('tree_file1.json');
  const yaml1 = getFixteruPath('tree_file1.yml');
  const json2 = getFixteruPath('tree_file2.json');
  const yaml2 = getFixteruPath('tree_file2.yaml');
  const diffs = readFile('tree_diffs');

  expect(genDiff(json1, json2)).toEqual(diffs);
  expect(genDiff(yaml1, yaml2)).toEqual(diffs);
  expect(genDiff(yaml1, json2)).toEqual(diffs);
});
