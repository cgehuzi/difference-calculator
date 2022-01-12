import path from 'path';
import * as fs from 'fs';
import * as yaml from 'js-yaml';

const getExtension = (file) => path.extname(file);
const readFile = (file) => fs.readFileSync(path.resolve(process.cwd(), file), 'utf-8');

const parseFile = (file) => {
  const extension = getExtension(file);
  const data = readFile(file);

  switch (extension) {
    case '.json':
      return JSON.parse(data);

    case '.yaml':
    case '.yml':
      return yaml.load(data);

    default:
      return {};
  }
};

export default parseFile;
