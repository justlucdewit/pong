import Ball from './ball'
import printScores from './printScores'
import Pedal from './pedal'
const keypress = require("keypress");
import { terminal } from 'terminal-kit'

const pongGame = () => {
	// game mode
	let ai = false;
	if (process.argv.length >= 3){
		ai = process.argv[2] !== "-s" ? true : false;
	}

	// create game objects
	const ball = new Ball();
	const p1_pedal = new Pedal(5);
	const p2_pedal = new Pedal(process.stdout.columns-5);

	// player scores
	let p1_score = 0;
	let p2_score = 0;

	// game input
	let keystate = {"w":false, "s":false, "up":false, "down":false};
	keypress(process.stdin);
	process.stdin.on('keypress', (ch, key) => {
		if (key && key.ctrl && key.name == "c"){
			process.exit(1);
		}

		switch (key.name) {
			case "w":
				if (keystate["s"]) {
					keystate["s"] = false;
				} else {
					keystate["w"] = true;
				}
				break;
			case "s":
				if (keystate["w"]) {
					keystate["w"] = false;
				} else {
					keystate["s"] = true;
				}
				break;
			case "up":
				if (!ai){
					if (keystate["down"]){
						keystate["down"] = false;
					} else {
						keystate["up"] = true;
					}
				}
				break;
			case "down":
				if (!ai){
					if (keystate["up"]){
						keystate["up"] = false;
					} else {
						keystate["down"] = true;
					}
				}
		}
	});

	// setup for game
	process.stdin.setRawMode(true);
	console.clear();
	terminal.windowTitle(process.argv.length.toString());
	// main game loop
	setInterval(() => {
		if (ball.x < 0){
			ball.reset();
			p2_score++;
		}
			
		if(ball.x > process.stdout.columns){
			ball.reset();
			p1_score++;
		}

		if (ai){
			p2_pedal.autoMove(ball);
		}

		if (keystate["w"]){
			p1_pedal.move(-1);
		}else if (keystate["s"]){
			p1_pedal.move(1);
		}

		if (keystate["up"]){
			p2_pedal.move(-1);
		}else if (keystate["down"]){
			p2_pedal.move(1);
		}

		ball.update();
		ball.show();


		p1_pedal.show();
		p2_pedal.show();

		ball.checkCol(p1_pedal, true);
		ball.checkCol(p2_pedal, false);



		printScores(p1_score, p2_score);
	}, 30);
};

module.exports = pongGame;