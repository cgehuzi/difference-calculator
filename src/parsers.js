import path from 'path';
import * as fs from 'fs';
import * as yaml from 'js-yaml';

const getExtension = (file) => path.extname(file);
const readFile = (file) => fs.readFileSync(path.resolve(process.cwd(), file), 'utf-8');

const parseJson = (data) => JSON.parse(data);
const parseYaml = (data) => yaml.load(data);
const parseOther = (data) => data.split('\n').reduce((acc, item, index) => ({ ...acc, [index + 1]: item }), {});

const parseFile = (file) => {
  const extension = getExtension(file);
  const data = readFile(file);

  switch (extension) {
    case '.json':
      return parseJson(data);

    case '.yaml':
    case '.yml':
      return parseYaml(data);

    default:
      return parseOther(data);
  }
};

export default parseFile;
