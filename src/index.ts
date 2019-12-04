import * as ansiRegex from "ansi-regex";

export const enum COLOR_CODES {
  BLACK = 0,
  RED = 1,
  GREEN = 2,
  YELLOW = 3,
  BLUE = 4,
  MAGENTA = 5,
  CYAN = 6,
  WHITE = 7
}

const enum ANSI_CODES {
  NONE = 0,
  BOLD = 1,
  // FAINT = 2,
  ITALIC = 3, // Not widely supported. Sometimes treated as inverse.
  UNDERLINE = 4,
  REVERSE = 7, // swap foreground and background colors
  // CONCEAL = 8,
  // STRIKETHROUGH = 9,
  NORMAL_COLOR_OR_INTENSITY = 22,
  UNDERLINE_OFF = 24,
  INVERSE_OFF = 27
}

const colorMap: Record<number, COLOR_CODES> = {
  30: COLOR_CODES.BLACK,
  31: COLOR_CODES.RED,
  32: COLOR_CODES.GREEN,
  33: COLOR_CODES.YELLOW,
  34: COLOR_CODES.BLUE,
  35: COLOR_CODES.MAGENTA,
  36: COLOR_CODES.CYAN,
  37: COLOR_CODES.WHITE,
  // 38
  39: COLOR_CODES.WHITE,
  40: COLOR_CODES.BLACK,
  41: COLOR_CODES.RED,
  42: COLOR_CODES.GREEN,
  43: COLOR_CODES.YELLOW,
  44: COLOR_CODES.BLUE,
  45: COLOR_CODES.MAGENTA,
  46: COLOR_CODES.CYAN,
  47: COLOR_CODES.WHITE,
  // 48
  49: COLOR_CODES.BLACK
};

interface Cell {
  content: string;
  fg: COLOR_CODES;
  bg: COLOR_CODES;
  // modifier
  bold: boolean;
  underline: boolean;
  inverse: boolean;
  italic: boolean;
}

const defaultModifier = {
  bold: false,
  underline: false,
  inverse: false,
  dim: false,
  italic: false
};

const defaultBackgroundColor = colorMap[37];
const defaultForegroundColor = colorMap[49];

export function parseAnsi(str: string): Cell[] {
  const re = ansiRegex();
  const cells: Cell[] = [];

  let match = null;
  let currentPos = 0;
  let bg: COLOR_CODES = 0;
  let fg: COLOR_CODES = 0;
  let modifier = Object.assign({}, defaultModifier);
  while ((match = re.exec(str))) {
    // add prev content
    const content = str.slice(currentPos, match.index);
    if (content) {
      cells.push({
        content,
        fg,
        bg,
        ...modifier
      });
    }

    // set colors/modifiers
    const matchCode = /\u001b\[(\d*)m/.exec(match[0]);
    if (matchCode) {
      const code = parseInt(matchCode[1], 10);
      if (code >= 30 && code <= 49) {
        if (code >= 40) {
          bg = colorMap[code];
        } else {
          fg = colorMap[code];
        }
      } else {
        switch (code) {
          case ANSI_CODES.NONE:
            bg = defaultBackgroundColor;
            fg = defaultForegroundColor;
            modifier = defaultModifier;
            break;
          case ANSI_CODES.BOLD:
            modifier.bold = true;
            break;
          case ANSI_CODES.UNDERLINE:
            modifier.underline = true;
            break;
          case ANSI_CODES.REVERSE:
            modifier.inverse = true;
            break;
          case ANSI_CODES.ITALIC:
            modifier.italic = true;
            break;
          case ANSI_CODES.INVERSE_OFF:
            modifier.inverse = false;
            break;
          case ANSI_CODES.NORMAL_COLOR_OR_INTENSITY:
            bg = defaultBackgroundColor;
            fg = defaultForegroundColor;
            modifier.bold = false;
            break;
        }
      }
    }

    currentPos = match.index + match[0].length;
  }

  const content = str.slice(currentPos);
  if (content) {
    cells.push({
      content,
      fg,
      bg,
      ...modifier
    });
  }

  return cells;
}
