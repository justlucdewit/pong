"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const terminal_kit_1 = require("terminal-kit");
class Pedal {
    constructor(x) {
        this.x = x;
        this.y = process.stdout.rows / 2;
        this.lastmove = 0;
        this.height = process.stdout.rows / 4;
        this.width = 2;
    }
    show() {
        let outstr = "";
        for (let i = 0; i < this.width; i++) {
            outstr += " ";
        }
        let delta1 = this.lastmove == 1 ? 1 : 0;
        let delta2 = this.lastmove == -1 ? 1 : 0;
        for (let ypos = this.y - this.height / 2 - delta1; ypos < this.y + (this.height / 2) + delta2; ypos++) {
            terminal_kit_1.terminal.moveTo(this.x - this.width / 2, ypos);
            terminal_kit_1.terminal.blue(outstr);
        }
        outstr = "";
        for (let i = 0; i < this.width; i++) {
            outstr += "#";
        }
        for (let ypos = this.y - this.height / 2; ypos < this.y + this.height / 2; ypos++) {
            terminal_kit_1.terminal.moveTo(this.x - this.width / 2, ypos);
            terminal_kit_1.terminal.blue(outstr);
        }
    }
    move(amount) {
        this.lastmove = amount;
        // update position
        this.y += amount;
        // bound check
        if (this.y < this.height / 2) { // 
            this.y = this.height / 2;
        }
        else if (this.y > process.stdout.rows - this.height / 2) {
            this.y = process.stdout.rows - this.height / 2;
        }
    }
    autoMove(b) {
        if (b.y > this.y && Math.random() > .5) {
            this.move(1);
        }
        else if (b.y < this.y && Math.random() > .5) {
            this.move(-1);
        }
    }
}
exports.default = Pedal;
