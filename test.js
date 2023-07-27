import fs from 'fs';


// fs.readFile('./times.txt', 'utf8', (err, data) => {
//     if(err)console.log(err);
//     let dataArr, lastRecord, lastLog;
//     dataArr = data.split("\n");
//     lastRecord = dataArr[dataArr.length - 1];
//     lastRecord.includes("Clocked in") ? lastLog = true : lastLog = false;

// });


let d = fs.readFileSync('./times.txt', 'utf8');
let dataArr = d.split("\n");
let lastTwoClockIns = `${dataArr[dataArr.length -2]} \n${dataArr[dataArr.length -1]}`;
console.log(lastTwoClockIns);




