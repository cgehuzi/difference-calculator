import { test, expect } from '@jest/globals';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixteruPath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixteruPath(filename), 'utf-8');

test('stylish - line structure', () => {
  const json1 = getFixteruPath('line_file1.json');
  const yaml1 = getFixteruPath('line_file1.yml');
  const json2 = getFixteruPath('line_file2.json');
  const yaml2 = getFixteruPath('line_file2.yaml');
  const diffs = readFile('line_stylish_diffs');

  expect(genDiff(json1, json2)).toEqual(diffs);
  expect(genDiff(yaml1, yaml2)).toEqual(diffs);
  expect(genDiff(yaml1, json2)).toEqual(diffs);
});

test('stylish - tree structure', () => {
  const json1 = getFixteruPath('tree_file1.json');
  const yaml1 = getFixteruPath('tree_file1.yml');
  const json2 = getFixteruPath('tree_file2.json');
  const yaml2 = getFixteruPath('tree_file2.yaml');
  const diffs = readFile('tree_stylish_diffs');

  expect(genDiff(json1, json2)).toEqual(diffs);
  expect(genDiff(yaml1, yaml2)).toEqual(diffs);
  expect(genDiff(yaml1, json2)).toEqual(diffs);
});

test('plain - line structure', () => {
  const json1 = getFixteruPath('line_file1.json');
  const yaml1 = getFixteruPath('line_file1.yml');
  const json2 = getFixteruPath('line_file2.json');
  const yaml2 = getFixteruPath('line_file2.yaml');
  const diffs = readFile('line_plain_diffs');

  expect(genDiff(json1, json2, 'plain')).toEqual(diffs);
  expect(genDiff(yaml1, yaml2, 'plain')).toEqual(diffs);
  expect(genDiff(yaml1, json2, 'plain')).toEqual(diffs);
});

test('plain - tree structure', () => {
  const json1 = getFixteruPath('tree_file1.json');
  const yaml1 = getFixteruPath('tree_file1.yml');
  const json2 = getFixteruPath('tree_file2.json');
  const yaml2 = getFixteruPath('tree_file2.yaml');
  const diffs = readFile('tree_plain_diffs');

  expect(genDiff(json1, json2, 'plain')).toEqual(diffs);
  expect(genDiff(yaml1, yaml2, 'plain')).toEqual(diffs);
  expect(genDiff(yaml1, json2, 'plain')).toEqual(diffs);
});

test('json - line structure', () => {
  const json1 = getFixteruPath('line_file1.json');
  const yaml1 = getFixteruPath('line_file1.yml');
  const json2 = getFixteruPath('line_file2.json');
  const yaml2 = getFixteruPath('line_file2.yaml');
  const diffs = readFile('line_json_diffs');

  expect(genDiff(json1, json2, 'json')).toEqual(diffs);
  expect(genDiff(yaml1, yaml2, 'json')).toEqual(diffs);
  expect(genDiff(yaml1, json2, 'json')).toEqual(diffs);
});

test('json - tree structure', () => {
  const json1 = getFixteruPath('tree_file1.json');
  const yaml1 = getFixteruPath('tree_file1.yml');
  const json2 = getFixteruPath('tree_file2.json');
  const yaml2 = getFixteruPath('tree_file2.yaml');
  const diffs = readFile('tree_json_diffs');

  expect(genDiff(json1, json2, 'json')).toEqual(diffs);
  expect(genDiff(yaml1, yaml2, 'json')).toEqual(diffs);
  expect(genDiff(yaml1, json2, 'json')).toEqual(diffs);
});
