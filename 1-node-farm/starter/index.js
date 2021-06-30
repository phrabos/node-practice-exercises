const fs = require('fs');

// Synchronous blocking code
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);
// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${new Date}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File Written');

// Asynchronous non-blocking code
fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
  fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
    fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
      fs.appendFile(`./txt/${data1}.txt`,`${data3}`, 'utf-8', (err) => {
        fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data4) => {
          console.log(data4)
        })
      });
    });
  });
});
console.log('will read file after this log');