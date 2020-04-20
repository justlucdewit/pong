"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const terminal_kit_1 = require("terminal-kit");
const printScores = (p1, p2) => {
    terminal_kit_1.terminal.moveTo(process.stdout.columns / 2 - p1.toString().length + 1, 5);
    terminal_kit_1.terminal.yellow(`${p1} - ${p2}`);
};
exports.default = printScores;
