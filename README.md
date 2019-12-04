# ansi-parser

Parser for string that include ansi codes.

## Install

```sh
npm i @cakecatz/ansi-parser
```

## Usage

```ts
const { parseAnsi } = require("@cakecatz/ansi-parser");
const cells = parseAnsi("\u001b[31mhello\u001b[39m");
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
