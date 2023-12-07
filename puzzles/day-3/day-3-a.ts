import { readData } from '../../shared.ts';
import chalk from 'chalk';

const isSafe = (x: number, y: number, data: string[]) => {
  const points = [
    [
      x - 1 >= 0 && y - 1 >= 0 ? data[x - 1][y - 1] : '.',
      x - 1 >= 0 ? data[x - 1][y] : '.',
      x - 1 >= 0 && y + 1 < data.length ? data[x - 1][y + 1] : '.',
    ],
    [
      y - 1 >= 0 ? data[x][y - 1] : '.',
      data[x][y],
      y + 1 < data.length ? data[x][y + 1] : '.',
    ],
    [
      x + 1 < data.length && y - 1 >= 0 ? data[x + 1][y - 1] : '.',
      x + 1 < data.length ? data[x + 1][y] : '.',
      x + 1 < data.length && y + 1 < data.length ? data[x + 1][y + 1] : '.',
    ],
  ];
  // console.log(x, y, data.length, data[x][y], points);
  return points
    .flat(1)
    .every((point) => point === '.' || !Number.isNaN(+point));
};

export async function day3a(dataPath?: string) {
  const data = await readData(dataPath);
  let sum = 0;
  let prevWasNumber = false;
  let unsafe = false;

  for (let i = 0; i < data.length; ++i) {
    const line = data[i];
    let num = 0;
    for (let j = 0; j < line.length; ++j) {
      const spot = +line[j];
      if (!Number.isNaN(spot)) {
        num *= 10;
        num += spot;
        prevWasNumber = true;
        if (!unsafe && !isSafe(i, j, data)) {
          // console.log('mark not safe at', i, j, data[i][j], { num });
          // num = 0;
          unsafe = true;
        }
        continue;
      }
      if (prevWasNumber) {
        if (unsafe) {
          console.log('not safe', num);
          sum += num;
          unsafe = false;
        }
        num = 0;
        prevWasNumber = false;
      }
    }
    if (prevWasNumber && unsafe) {
      console.log('not safe', num);
      sum += num;
      unsafe = false;
    }
    num = 0;
    prevWasNumber = false;
  }
  return sum;
}

const answer = await day3a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
