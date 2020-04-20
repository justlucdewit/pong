import { terminal } from 'terminal-kit'

class Pedal{
	y = process.stdout.rows/2;
	height = process.stdout.rows/4;
	width = 4;

	constructor(public x:number){}

	show(){
		let outstr = "";
		for (let i=0; i<this.width; i++){
			outstr += "#";
		}

		for (let ypos=this.y-this.height/2; ypos<this.y+this.height/2; ypos++){
			terminal.moveTo(this.x-this.width/2, ypos);
			terminal.blue(outstr);
		}
	}

	move(amount:number){
		this.y+=amount;

		if (this.y < this.height/2){
			this.y = this.height/2;
		}else if (this.y > process.stdout.rows-this.height/2){
			this.y = process.stdout.rows-this.height/2
		}
	}
}

export default Pedal;