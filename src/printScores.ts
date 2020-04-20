import { terminal } from 'terminal-kit'

const printScores = (p1:number, p2:number) => {
	terminal.moveTo(process.stdout.columns/2-p1.toString().length+1, 5);
	terminal.yellow(`${p1} - ${p2}`);
};

export default printScores;