#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../src/gendiff.js';
import stylish from '../src/stylish.js';

const program = new Command();

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format', 'stylish')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    switch (program.opts().format) {
      case 'stylish':
        console.log(genDiff(filepath1, filepath2));
        break;
    }
  });

program.parse();
