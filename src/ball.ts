import { terminal } from 'terminal-kit'

class Ball{
	x = Math.floor(process.stdout.columns/2);
	y = Math.floor(process.stdout.rows/2);
	dx = -1;
	dy = 0.5;
	width = 2;
	height = 2;

	show(){
		let balltext = "";
		
		for (let x = 0; x < this.width; x++){
			balltext += "#";
		}

		for(let y = 0; y < this.height; y++){
			terminal.moveTo(this.x+this.width/2, this.y+this.height/2+y);
			terminal.green(balltext);
		}
	}

	update(){
		if (this.y-this.height/2 < 0 || this.y+this.height/2 > process.stdout.rows){
			this.dy *= -1;
		}
		this.x += this.dx;
		this.y += this.dy;
	}

	reset(){
		this.x = Math.floor(process.stdout.columns/2);
		this.y = Math.floor(process.stdout.rows/2);
		this.dx = -1;
		this.dy = 0.5;
	}
}

export default Ball;