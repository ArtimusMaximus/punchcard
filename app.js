import fs from 'fs';
import readline from 'readline';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const RL = readline.createInterface(process.stdin, process.stdout);
const filePath = path.join(__dirname, 'times.txt')


class PunchCard
{
	constructor()
	{
		this.name = "Arthur Modyman";
		this.date = new Date();
		this.end = null;
	}
	startTime()
	{
		let currentTime = this.date.toString();
		return currentTime;
	}
	endTime(currentTime)
	{
		this.end = currentTime;
	        return this.end;
	}
	daysWork()
	{
		let day = {
			start: this.startTime(),
			end: this.end,
			dayDate: this.startTime().split(" ").slice(0,4).join(" ")
		}
		return day;
	}

}

let saturdayCard = new PunchCard();
	saturdayCard.startTime();
let outTime;
let start = saturdayCard.daysWork().start;
let end = saturdayCard.daysWork().end;
let day = saturdayCard.daysWork().dayDate;


const handleExit = () => {
	console.log('~ Dovíždane ~ || ~ довиждане ~');
	RL.close();
	process.exit(0);
}

const timeCard = new PunchCard();
RL.question('Job Name? >> ', data => {
	console.log(`~~~Logging time for ${data}~~~\n`);

	let d = fs.readFileSync('./times.txt', 'utf8');
	let dataArr = d.split("\n");
	let lastTwoClockIns = `Last two logs:\n> ${dataArr[dataArr.length -2]} \n> ${dataArr[dataArr.length -1]}`;
	setTimeout(() => console.log(lastTwoClockIns), 250);
	
	const delay = ms => new Promise(res => setTimeout(res, ms))
	delay(1000)
		.then(() => RL.setPrompt('Clock "IN" "OUT" or "CHECK" times || "EXIT"? >> '))
		.then(() => RL.prompt())
	
	let text = `Clocked in for ${data} @ : ${timeCard.startTime()}`;

	RL.on('line', async d => {
		if (d.toLowerCase() === 'exit' || d.toLowerCase() === 'x') { handleExit(); }
		if (d.toLowerCase() === 'in') {
			fs.existsSync(filePath) 
			? fs.appendFile("times.txt", `\n${text}`, (err) => { 
				if(err)console.error(err);
				console.log(`Punch in logged @ ${timeCard.startTime()}.`);
				handleExit();
			}) 
			: fs.writeFile('times.txt', text, (err) => {
				if(err)console.error(err);
				console.log(`Punch in logged @ ${timeCard.startTime()}.`);
				handleExit();
			});
		} 
		if (d.toLowerCase() === 'out') {
			let clockOut = `Clocked out for ${data} @ : ${timeCard.endTime(new Date().toString())}`
			fs.existsSync(filePath) 
			? fs.appendFile("times.txt", `\n${clockOut}`, (err) => { 
				if(err)console.error(err);
				console.log(`Punch out logged @ ${timeCard.endTime(new Date().toString())}.`);
				handleExit();
			}) 
			: fs.writeFile('times.txt', clockOut, (err) => {
				if(err)console.error(err);
				console.log(`Punch out logged @ ${timeCard.endTime(new Date().toString())}.`);
				handleExit();
			})
		} 
		if (d.toLowerCase() === 'check') {
			fs.readFile('times.txt', 'utf8', (err, data) => {
				if(err)console.error(err);
				console.log(`\nYour current timecard:\n\n${data}\n\n`);
				RL.prompt();
			});
		}
	})
});

