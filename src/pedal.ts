import { terminal } from 'terminal-kit'

class Pedal{
	y = process.stdout.rows/2;
	lastmove = 0;
	height = process.stdout.rows/4;
	width = 2;

	constructor(public x:number){}

	show(){
		let outstr = "";
		for (let i=0; i<this.width; i++){
			outstr += " ";
		}
		let delta1 = this.lastmove==1?1:0;
		let delta2 = this.lastmove==-1?1:0
		for (let ypos=this.y-this.height/2-delta1; ypos<this.y+(this.height/2)+delta2; ypos++){
			terminal.moveTo(this.x-this.width/2, ypos);
			terminal.blue(outstr);
		}

		outstr = "";
		for (let i=0; i<this.width; i++){
			outstr += "#";
		}

		for (let ypos=this.y-this.height/2; ypos<this.y+this.height/2; ypos++){
			terminal.moveTo(this.x-this.width/2, ypos);
			terminal.blue(outstr);
		}
	}

	move(amount:number){
		this.lastmove = amount;

		// update position
		this.y+=amount;

		// bound check
		if (this.y < this.height/2){// 
			this.y = this.height/2;
		}else if (this.y > process.stdout.rows-this.height/2){
			this.y = process.stdout.rows-this.height/2
		}
	}
}

export default Pedal;