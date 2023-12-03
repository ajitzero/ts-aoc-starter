import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day1a(dataPath?: string) {
  const codes = await readData(dataPath);
  let sum = 0;
  for (const code of codes) {
    const letters = code.split('');
    let [first, last] = [0, 0];
    for (const letter of letters) {
      const num = parseInt(letter);
      if (!Number.isNaN(num)) {
        first = num;
        break;
      }
    }
    for (let i = letters.length - 1; i >= 0; --i) {
      const num = parseInt(letters[i]);
      if (!Number.isNaN(num)) {
        last = num;
        break;
      }
    }
    const current = first * 10 + last;
    sum += current;
  }
  return sum;
}

const answer = await day1a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
