"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const terminal_kit_1 = require("terminal-kit");
class Ball {
    constructor() {
        this.x = Math.floor(process.stdout.columns / 2);
        this.y = Math.floor(process.stdout.rows / 2);
        this.dx = Math.random() < 0.5 ? 1 + Math.random() : -1 - Math.random();
        this.dy = Math.random() < 0.5 ? 0.5 + Math.random() : -0.5 - Math.random();
        this.width = 2;
        this.height = 2;
    }
    show() {
        let balltext = "";
        for (let x = 0; x < this.width; x++) {
            balltext += "#";
        }
        for (let y = 0; y < this.height; y++) {
            terminal_kit_1.terminal.moveTo(this.x + this.width / 2, this.y + this.height / 2 + y);
            terminal_kit_1.terminal.green(balltext);
        }
    }
    update() {
        // clear old ball
        let cleartext = " ";
        for (let x = 0; x < this.width; x++) {
            cleartext += " ";
        }
        for (let y = 0; y < this.height; y++) {
            terminal_kit_1.terminal.moveTo(this.x + this.width / 2, this.y + this.height / 2 + y);
            terminal_kit_1.terminal.green(cleartext);
        }
        // apply velocity
        if (this.y - this.height / 2 < 0 || this.y + this.height / 2 > process.stdout.rows) {
            this.dy *= -1;
        }
        this.x += this.dx;
        this.y += this.dy;
    }
    reset() {
        //clear old ball
        let cleartext = " ";
        for (let x = 0; x < this.width; x++) {
            cleartext += " ";
        }
        for (let y = 0; y < this.height; y++) {
            terminal_kit_1.terminal.moveTo(this.x + this.width / 2, this.y + this.height / 2 + y);
            terminal_kit_1.terminal.green(cleartext);
        }
        // reset ball position and velocity
        this.x = Math.floor(process.stdout.columns / 2);
        this.y = Math.floor(process.stdout.rows / 2);
        this.dx = Math.random() < 0.5 ? 1 + Math.random() : -1 - Math.random();
        this.dy = Math.random() < 0.5 ? 0.5 + Math.random() : -0.5 - Math.random();
    }
    checkCol(p, left) {
        if (left) {
            if (this.x <= p.x && this.y + this.height / 2 > p.y - p.height / 2 && this.y + this.height / 2 < p.y + p.height / 2) {
                this.dx = Math.abs(this.dx);
                this.dy = (this.y - p.y) * 0.2;
            }
        }
        else {
            if (this.x >= p.x - p.width && this.y + this.height / 2 > p.y - p.height / 2 && this.y - this.height / 2 < p.y + p.height / 2) {
                this.dx = -Math.abs(this.dx);
                this.dy = (this.y - p.y) * 0.2;
            }
        }
    }
}
exports.default = Ball;
