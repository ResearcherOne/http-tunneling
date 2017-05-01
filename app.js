var request = require('request');
var express = require('express');
var app = express();

var allowCrossOrigin = require('./allowCrossOriginMiddleware');

const enWikipedia = "https://en.wikipedia.org";
const port = process.env.PORT || 8020;

function myMiddleware (req, res, next) {
   if (req.method === 'GET') {
	   var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
		console.log("fullUrl: "+fullUrl);
		console.log("originalUrl: "+req.originalUrl);
		request.get(enWikipedia+req.originalUrl).pipe(res);
   } else {
	   next();
   }
}

app.use(myMiddleware);

app.listen(port, function () {
	console.log('Example app listening on port '+port+'!');
});
