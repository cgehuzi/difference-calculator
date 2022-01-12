import { test, expect, afterAll } from '@jest/globals';
import * as fs from 'fs';
import gendiff from '../src/gendiff.js';

afterAll(() => {
  fs.unlinkSync('step3.file1.json');
  fs.unlinkSync('step3.file2.json');
});

test('genDiff (step 3)', () => {
  const data1 = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  };
  fs.writeFileSync('step3.file1.json', JSON.stringify(data1, null, 2));

  const data2 = {
    timeout: 20,
    verbose: true,
    host: 'hexlet.io',
  };
  fs.writeFileSync('step3.file2.json', JSON.stringify(data2, null, 2));

  const diffs = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

  expect(gendiff('step3.file1.json', 'step3.file2.json')).toEqual(diffs);
});
