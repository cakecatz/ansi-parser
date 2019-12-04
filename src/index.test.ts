import { parseAnsi } from "./index";
import * as chalk from "chalk";

const ctx = new chalk.Instance({ level: 1 });

test("parse empty string", () => {
  expect(parseAnsi("")).toEqual([]);
});

test("parse string not included ansi codes", () => {
  expect(parseAnsi("hello,world")).toEqual([
    { content: "hello,world", fg: 0, bg: 0 }
  ]);
});

test("string with ansi color", () => {
  expect(parseAnsi(ctx.blue("hello, world"))).toMatchSnapshot();
});
