import { test, expect, afterAll } from '@jest/globals';
import gendiff from '../src/gendiff.js';
import * as fs from 'fs';

let data1;
let data2;

afterAll(() => {
  fs.unlinkSync('file1.json');
  fs.unlinkSync('file2.json');
});

test('genDiff', () => {
  data1 = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  };
  fs.writeFileSync('file1.json', JSON.stringify(data1, null, 2));

  data2 = {
    timeout: 20,
    verbose: true,
    host: 'hexlet.io',
  };
  fs.writeFileSync('file2.json', JSON.stringify(data2, null, 2));

  const diffs = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

  expect(gendiff('file1.json', 'file2.json')).toEqual(diffs);
});
