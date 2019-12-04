import { parseAnsi } from "./index";
import * as chalk from "chalk";

const ctx = new chalk.Instance({ level: 1 });

test("parse empty string", () => {
  expect(parseAnsi("")).toEqual([]);
});

test("parse string not included ansi codes", () => {
  expect(parseAnsi("hello,world")).toMatchSnapshot();
});

test("string with ansi color", () => {
  expect(parseAnsi(ctx.blue("hello, world"))).toMatchSnapshot();
});

test("bold modifier", () => {
  expect(parseAnsi(ctx.bold("hello, world"))).toMatchSnapshot();
});

test("underline modifier", () => {
  expect(parseAnsi(ctx.underline("hello, world"))).toMatchSnapshot();
});

test("italic modifier", () => {
  expect(parseAnsi(ctx.italic("hello, world"))).toMatchSnapshot();
});

test("inverse modifier", () => {
  expect(parseAnsi(ctx.inverse("hello, world"))).toMatchSnapshot();
});

test("multiple modifiers and colors", () => {
  expect(
    parseAnsi(
      "START" +
        ctx.inverse("INVERSE") +
        ctx.blue("BLUE") +
        ctx.underline("UNDERLINE") +
        ctx.red("RED") +
        ctx.bold("BOLD") +
        "END"
    )
  ).toMatchSnapshot();
});
