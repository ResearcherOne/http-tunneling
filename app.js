var request = require('request');
var express = require('express');
var app = express();

var allowCrossOrigin = require('./allowCrossOriginMiddleware');

const turkishWiki = "https://tr.wikipedia.org";
const enWiki = "https://en.wikipedia.org";

app.get('/en', function (req, res) {
	var requestedUrl = req.param('page');
	request.get(enWiki).pipe(res);
});

function myMiddleware (req, res, next) {
   if (req.method === 'GET') {
	   var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
		console.log("fullUrl: "+fullUrl);
		console.log("originalUrl: "+req.originalUrl);
		request.get(turkishWiki+req.originalUrl).pipe(res);
   } else {
	   next();
   }
}

app.use(myMiddleware)

app.listen(8010, function () {
	console.log('Example app listening on port 8010!');
});