import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day2b(dataPath?: string) {
  const games = await readData(dataPath);

  let sum = 0;
  for (const game of games) {
    const [_, allPairs] = game.split(':');
    const pairs = allPairs
      .split(';')
      .map((pair) =>
        pair
          .trim()
          .split(',')
          .map((ball) => {
            const [number, type] = ball.trim().split(' ');
            return { [type]: parseInt(number) };
          })
          .reduce((a, c) => {
            return {
              red: (a['red'] || 0) + (c['red'] || 0),
              green: (a['green'] || 0) + (c['green'] || 0),
              blue: (a['blue'] || 0) + (c['blue'] || 0),
            };
          }, {})
      )
      .reduce((a, c) => {
        return {
          red:
            (a['red'] || 0) < (c['red'] || 0) ? c['red'] || 0 : a['red'] || 0,
          green:
            (a['green'] || 0) < (c['green'] || 0)
              ? c['green'] || 0
              : a['green'] || 0,
          blue:
            (a['blue'] || 0) < (c['blue'] || 0)
              ? c['blue'] || 0
              : a['blue'] || 0,
        };
      }, {});
    sum += pairs['red'] * pairs['green'] * pairs['blue'];
  }
  return sum;
}

const answer = await day2b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
