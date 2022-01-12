import { test, expect } from '@jest/globals';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixteruPath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixteruPath(filename), 'utf-8');

test('genDiff(.json, .json)', () => {
  const file1 = getFixteruPath('file1.json');
  const file2 = getFixteruPath('file2.json');
  const diffs = readFile('diffs');

  expect(genDiff(file1, file2)).toEqual(diffs);
});

test('genDiff(.yml, .yml)', () => {
  const file1 = getFixteruPath('file1.yml');
  const file2 = getFixteruPath('file2.yaml');
  const diffs = readFile('diffs');

  expect(genDiff(file1, file2)).toEqual(diffs);
});

test('genDiff(.json, .yml)', () => {
  const file1 = getFixteruPath('file1.json');
  const file2 = getFixteruPath('file2.yaml');
  const diffs = readFile('diffs');

  expect(genDiff(file1, file2)).toEqual(diffs);
});
