import { readData } from '../../shared.ts';
import chalk from 'chalk';

type Point = { x: number; y: number };

const isNumber = (maybeNumber: string) => !Number.isNaN(+maybeNumber);

const getCases = (point: Point, data: string[]) => {
  const { x, y } = point;
  const N = data.length;
  const points = [
    [
      x - 1 >= 0 && y - 1 >= 0 && isNumber(data[x - 1][y - 1]) ? '1' : '0',
      x - 1 >= 0 && isNumber(data[x - 1][y]) ? '1' : '0',
      x - 1 >= 0 && y + 1 < N && isNumber(data[x - 1][y + 1]) ? '1' : '0',
    ].join(''),
    [
      y - 1 >= 0 && isNumber(data[x][y - 1]) ? '1' : '0',
      '0',
      y + 1 < N && isNumber(data[x][y + 1]) ? '1' : '0',
    ].join(''),
    [
      x + 1 < N && y - 1 >= 0 && isNumber(data[x + 1][y - 1]) ? '1' : '0',
      x + 1 < N && isNumber(data[x + 1][y]) ? '1' : '0',
      x + 1 < N && y + 1 < N && isNumber(data[x + 1][y + 1]) ? '1' : '0',
    ].join(''),
  ];
  const cases: Point[] = [];
  for (let i = -1; i < 2; ++i) {
    if (['100', '110', '111'].includes(points[i + 1])) {
      cases.push({ x: x + i, y: y - 1 });
    }
    if (['011', '010'].includes(points[i + 1])) {
      cases.push({ x: x + i, y });
    }
    if (['001'].includes(points[i + 1])) {
      cases.push({ x: x + i, y: y + 1 });
    }
    if (['101'].includes(points[i + 1])) {
      cases.push({ x: x + i, y: y - 1 });
      cases.push({ x: x + i, y: y + 1 });
    }
    if (cases.length > 2) break;
  }
  return cases;
};

const findNumber = (point: Point, data: string[]) => {
  const { x, y } = point;

  let left = y;
  while (left >= 0 && isNumber(data[x][left])) {
    --left;
  }
  if (left < 0) {
    left = 0;
  } else if (!isNumber(data[x][left])) {
    ++left;
  }

  let num = 0;
  while (left < data[x].length && isNumber(data[x][left])) {
    num *= 10;
    num += +data[x][left];
    ++left;
  }
  console.log(point, data[x][y], num);
  return num;
};

export async function day3b(dataPath?: string) {
  const data = await readData(dataPath);
  let sum = 0;
  for (let x = 0; x < data.length; ++x) {
    for (let y = 0; y < data[x].length; ++y) {
      if (data[x][y] === '*') {
        const cases = getCases({ x, y }, data);
        if (cases.length === 2) {
          sum += findNumber(cases[0], data) * findNumber(cases[1], data);
          console.log('---');
        }
      }
    }
  }
  return sum;
}

const answer = await day3b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
