import process from "process";
import chalk from "chalk";

export function cyan(str) {
  console.log(chalk.cyan(str));
}

export function yellow(str) {
  console.log(chalk.yellow(str));
}

export function green(str) {
  console.log(chalk.green(str));
}

export function red(str) {
  console.error(chalk.red(str));
}

export function errorAndExit(e) {
  red(e.stack ?? e.message);
  process.exit(1);
}
