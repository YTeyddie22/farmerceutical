const http = require('http');
const url = require('url');
const fs = require('fs');

const data = fs.readFileSync(`${__dirname}/Data/data.json`, 'utf-8');

const productObject = JSON.parse(data);

const server = http.createServer((req, res) => {
	const pathName = req.url;

	if (pathName === '/overView') {
		res.end('Hello OverView');
	} else if (pathName === '/api') {
		res.writeHead(200, { 'Content-type': 'application/json' });
		res.end(data);
	} else {
		res.end('Home');
	}
});

server.listen(8000, '127.0.0.1', () => {
	console.log('Server listening on port 8000');
});
