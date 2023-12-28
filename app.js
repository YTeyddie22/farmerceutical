//? Core modules

const http = require("http");
const url = require("url");
const fs = require("fs");

//?File modules

const replaceTemplate = require("./module/replaceTemp");

/////////////////////////////////////////////////////////////////////

//? variables working Synchronously

const data = fs.readFileSync(`${__dirname}/Data/data.json`, "utf-8");

const productObject = JSON.parse(data);

const tempOverview = fs.readFileSync(
	`${__dirname}/temp/tempOverview.html`,
	"utf-8"
);

const tempCard = fs.readFileSync(`${__dirname}/temp/tempCard.html`, "utf-8");

const tempProduct = fs.readFileSync(
	`${__dirname}/temp/tempProduct.html`,
	"utf-8"
);

//////////////////////////////////////////////////////////////////////

//* Adding slugify to the product names;

//! Starting a server

const server = http.createServer((req, res) => {
	const { query, pathname } = url.parse(req.url, true);

	//? OverVIew Page
	if (pathname === "/overview" || pathname === "/") {
		res.writeHead(200, { "Content-type": "text/html" });

		const cardHtml = productObject
			.map((el) => replaceTemplate(tempCard, el))
			.join("");

		const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardHtml);

		res.end(output);
	}
	//?Product Page
	else if (pathname === "/product") {
		res.writeHead(200, { "Content-type": "text/html" });
		const product = productObject[query.id];

		const output = replaceTemplate(tempProduct, product);
		res.end(output);
	}
	//? API
	else if (pathname === "/api") {
		res.writeHead(200, { "Content-type": "application/json" });
		res.end(data);
	}
	//? NOT FOUND
	else {
		res.writeHead(404, {
			"Content-type": "text/html",
		});
		res.end("<h1>Page not found</h1>");
	}
});

server.listen(8000, "127.0.0.1", () => {
	console.log("Server listening on port 8000");
});
