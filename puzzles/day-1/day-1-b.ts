import { readData } from '../../shared.ts';
import chalk from 'chalk';

const patternsValue = new Map<string, number>([
  ['1', 1],
  ['2', 2],
  ['3', 3],
  ['4', 4],
  ['5', 5],
  ['6', 6],
  ['7', 7],
  ['8', 8],
  ['9', 9],
  ['one', 1],
  ['two', 2],
  ['six', 6],
  ['four', 4],
  ['five', 5],
  ['nine', 9],
  ['three', 3],
  ['seven', 7],
  ['eight', 8],
]);

const NUMBER_LENGTHS = [1, 3, 4, 5];
const getIfValid = (index: number, code: string): number | null => {
  const CODE_LENGTH = code.length;
  for (const LENGTH of NUMBER_LENGTHS) {
    if (
      index + LENGTH <= CODE_LENGTH &&
      patternsValue.has(code.slice(index, index + LENGTH))
    ) {
      return patternsValue.get(code.slice(index, index + LENGTH));
    }
  }
  return null;
};

export async function day1b(dataPath?: string) {
  const codes = await readData(dataPath);
  let sum = 0;
  for (const code of codes) {
    const CODE_LENGTH = code.length;
    let [first, last] = [0, 0];

    for (let i = 0; i < CODE_LENGTH; ++i) {
      const res = getIfValid(i, code);
      if (res) {
        first = res;
        break;
      }
    }
    for (let i = CODE_LENGTH - 1; i >= 0; --i) {
      const res = getIfValid(i, code);
      if (res) {
        last = res;
        break;
      }
    }
    const current = first * 10 + last;
    sum += current;
  }
  return sum;
}

const answer = await day1b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
