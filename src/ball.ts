import { terminal } from 'terminal-kit'
import pedal from './pedal'

class Ball{
	x = Math.floor(process.stdout.columns/2);
	y = Math.floor(process.stdout.rows/2);
	dx = Math.random()<0.5?1+Math.random():-1-Math.random();
	dy = Math.random()<0.5?0.5+Math.random():-0.5-Math.random();
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
		// clear old ball
		let cleartext = " ";
		
		for (let x = 0; x < this.width; x++){
			cleartext += " ";
		}

		for(let y = 0; y < this.height; y++){
			terminal.moveTo(this.x+this.width/2, this.y+this.height/2+y);
			terminal.green(cleartext);
		}

		// apply velocity
		if (this.y-this.height/2 < 0 || this.y+this.height/2 > process.stdout.rows){
			this.dy *= -1;
		}
		this.x += this.dx;
		this.y += this.dy;
	}

	reset(){
		//clear old ball
		let cleartext = " ";
		
		for (let x = 0; x < this.width; x++){
			cleartext += " ";
		}

		for(let y = 0; y < this.height; y++){
			terminal.moveTo(this.x+this.width/2, this.y+this.height/2+y);
			terminal.green(cleartext);
		}

		// reset ball position and velocity
		this.x = Math.floor(process.stdout.columns/2);
		this.y = Math.floor(process.stdout.rows/2);
		this.dx = Math.random()<0.5?1+Math.random():-1-Math.random();
		this.dy = Math.random()<0.5?0.5+Math.random():-0.5-Math.random();
	}

	checkCol(p:pedal, left:boolean){
		if (left){
			if (this.x <= p.x && this.y+this.height/2 > p.y-p.height/2 && this.y+this.height/2 < p.y+p.height/2){
				this.dx = Math.abs(this.dx);
				this.dy = (this.y-p.y)*0.2;
			}
		}else{
			if (this.x >= p.x-p.width && this.y+this.height/2 > p.y-p.height/2 && this.y-this.height/2 < p.y+p.height/2){
				this.dx = -Math.abs(this.dx);
				this.dy = (this.y-p.y)*0.2;
			}
		}
	}
}

export default Ball;