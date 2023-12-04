import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day2a(dataPath?: string) {
  const games = await readData(dataPath);

  let sum = 0;
  for (const game of games) {
    const [gameLabel, allPairs] = game.split(':');
    const gameId = parseInt(gameLabel.slice(5));
    const pairs = allPairs.split(';').map((pair) =>
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
    );
    if (
      pairs.some(
        (pair) => pair['red'] > 12 || pair['green'] > 13 || pair['blue'] > 14
      )
    ) {
      continue;
    }
    sum += gameId;
  }
  return sum;
}

const answer = await day2a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
