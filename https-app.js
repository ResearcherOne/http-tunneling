var allowCrossOrigin    = require('./allowCrossOriginMiddleware');
var request             = require('request');
var express             = require('express');
var https               = require('https');
var app                 = express();
var fs                  = require('fs');

var privateKey  = fs.readFileSync('ssl/server.key', 'utf8');
var certificate = fs.readFileSync('ssl/server.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

const turkishWikipedia = "https://tr.wikipedia.org";
const port = process.env.PORT || 8010;

function myMiddleware (req, res, next) {
	console.log("HEY YO");
   if (req.method === 'GET') {
	   var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
		console.log("fullUrl: "+fullUrl);
		console.log("originalUrl: "+req.originalUrl);
		request.get(turkishWikipedia+req.originalUrl).pipe(res);
   } else {
	   next();
   }
}

app.use(myMiddleware);

var httpsServer = https.createServer(credentials, app);
httpsServer.listen(8443);
/*
app.listen(port, function () {
	console.log('Example app listening on port '+port+'!');
});
*/
