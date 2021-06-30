const http = require('http');
const fs = require('fs');
const url = require('url');

require('./mungeUtils')

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');

const productData = JSON.parse(data);

const server = http.createServer((req, res) => {
  console.log(req.url);
  const pathName = req.url;
  if(pathName === '/' || pathName === '/overview') res.end('overview page')
  else if (pathName === '/product') res.end('product page')
  else if (pathName === '/api') {
      res.writeHead(200, {'Content-type': 'application/json'})
      res.end(data);
  } 
  else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'custom-header': 'custom'
    });
    res.end('Page not found!')
  }
})


server.listen(8000, '127.0.0.1', () => {
  console.log('Server spinning on port 8000');
})