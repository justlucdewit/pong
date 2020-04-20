"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const terminal_kit_1 = require("terminal-kit");
class Pedal {
    constructor(x) {
        this.x = x;
        this.y = process.stdout.rows / 2;
        this.height = process.stdout.rows / 4;
        this.width = 4;
    }
    show() {
        let outstr = "";
        for (let i = 0; i < this.width; i++) {
            outstr += "#";
        }
        for (let ypos = this.y - this.height / 2; ypos < this.y + this.height / 2; ypos++) {
            terminal_kit_1.terminal.moveTo(this.x - this.width / 2, ypos);
            terminal_kit_1.terminal.blue(outstr);
        }
    }
    move(amount) {
        this.y += amount;
        if (this.y < this.height / 2) {
            this.y = this.height / 2;
        }
        else if (this.y > process.stdout.rows - this.height / 2) {
            this.y = process.stdout.rows - this.height / 2;
        }
    }
}
exports.default = Pedal;
