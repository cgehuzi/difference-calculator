import { test, expect } from '@jest/globals';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import gendiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixteruPath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixteruPath(filename), 'utf-8');

test('genDiff (step 3)', () => {
  const file1 = getFixteruPath('step3/file1.json');
  const file2 = getFixteruPath('step3/file2.json');
  const diffs = readFile('step3/diffs');

  expect(gendiff(file1, file2)).toEqual(diffs);
});
