var request = require('request');
var express = require('express');
var app = express();

var allowCrossOrigin = require('./allowCrossOriginMiddleware');

const websiteToConnect = "https://tr.wikipedia.org";

app.get('/get', function (req, res) {
	var requestedUrl = req.param('page');
	console.log("requestedUrl: "+requestedUrl);
	console.log("new stuff");
	request.get(websiteToConnect).pipe(res);
});

function myMiddleware (req, res, next) {
   if (req.method === 'GET') {
	   var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
		console.log("fullUrl: "+fullUrl);
		console.log("originalUrl: "+req.originalUrl);
		request.get(websiteToConnect+req.originalUrl).pipe(res);
   } else {
	   next();
   }
}

app.use(myMiddleware)

app.listen(8010, function () {
	console.log('Example app listening on port 8010!');
});