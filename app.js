const http = require('http');
const url = require('url');
const fs = require('fs');

const replaceTemplate = function (temp, product) {
	let output = temp.replace(/{%PRODUCTNAME%/g, product.productName);
	output = output.replace(/{%IMAGE%}/g, product.image);
	output = output.replace(/{%PRICE%}/g, product.price);
	output = output.replace(/{%FROM%}/g, product.image);
	output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
	output = output.replace(/{%QUANTITY%}/g, product.quantity);
	output = output.replace(/{%DESCRIPTION%}/g, product.description);
	output = output.replace(/{%ID%}/g, product.id);

	if (!product.organic)
		output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');

	return output;
};

const data = fs.readFileSync(`${__dirname}/Data/data.json`, 'utf-8');
const productObject = JSON.parse(data);
const tempOverview = fs.readFileSync(
	`${__dirname}/temp/tempOverview.html`,
	'utf-8'
);
const tempCard = fs.readFileSync(`${__dirname}/temp/tempCard.html`, 'utf-8');
const tempProduct = fs.readFileSync(
	`${__dirname}/temp/tempProduct.html`,
	'utf-8'
);

const server = http.createServer((req, res) => {
	const pathName = req.url;

	//? OverVIew Page
	if (pathName === '/overView') {
		res.writeHead(200, { 'Content-type': 'text/html' });

		const cardHtml = productObject
			.map((el) => replaceTemplate(tempCard, el))
			.join('');

		const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardHtml);

		res.end(output);
	}
	//?Product Page
	else if (pathName === './product') {
		res.end('This is the Product');
	}
	//? API
	else if (pathName === '/api') {
		res.writeHead(200, { 'Content-type': 'application/json' });
		res.end(data);
	}
	//? NOT FOUND
	else {
		res.writeHead(404, {
			'Content-type': 'text/html',
		});
		res.end('<h1>Page not found</h1>');
	}
});

server.listen(8000, '127.0.0.1', () => {
	console.log('Server listening on port 8000');
});
