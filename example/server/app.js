const fs = require('fs');
const http = require('http');
const path = require('path');
const urlParser = require('url');

const html = path.join(__dirname, './index.html');
const js = path.join(__dirname, '../build/main.js');

const port = process.env.NODE_ENV_PORT || 3000;
const host = process.env.NODE_ENV_HOST || 'localhost';

http.createServer(function (req, res) {
  console.log('\x1b[41m\x1b[37m', `${new Date()}: ${req.method} ${req.url}`, '\x1b[0m');
  if (req.method === 'GET') {
    url = urlParser.parse(req.url);
    if (url.pathname.endsWith('.js')) {
      const script = fs.readFileSync(js).toString();
      res.writeHead(200, { 'Content-Type': 'text/javascript' });
      res.write(script);
    } else if (url.pathname.endsWith('.js.map')) {
      const map = fs.readFileSync(`${js}.map`).toString();
      res.writeHead(200, { 'Content-Type': 'text/javascript' });
      res.write(map);
    } else {
      const body = fs.readFileSync(html).toString();
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(body);
    }
  } else {
    res.writeHead(400);
  }
  res.end();
  console.log('\x1b[42m\x1b[37m', `${new Date()}: ${res.statusCode} ${req.url}` , '\x1b[0m');
}).listen(port, host, () => {
  console.log(`${new Date()}: Server is started on ${host}:${port}`);
});
