# ansi-parser

Parser for string that include ansi codes.

## Install

TODO

## Usage

```ts
import { ansiParser } from "ansi-parser";

const cells = ansiParser("\u001b[31mhello\u001b[39m");
```

`cells` will be like this.

```ts
[
  {
    bg: 0, // COLOR_CODES.BLACK
    fg: 1, // COLOR_CODES.RED
    content: "hello",
    bold: false,
    dim: false,
    inverse: false,
    italic: false,
    underline: false
  }
];
```
