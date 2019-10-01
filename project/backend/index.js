const http = require('http');
const https = require('https');
const express = require('express');
const app = express();


// import api route
const api = require('./routes/api'); 

//ssl security (https) configuration
//var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
//var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
//var credentials = {key: privateKey, cert: certificate};

// create servers
var http_server = http.createServer(app);
//var httpsServer = https.createServer(credentials, app);

app.use(express.static('public'));

// api route
app.use('/api/', api.router);

var port = process.env.PORT || 3000;

// start servers
http_server.listen(port,function(){
	console.log('HTTP SERVER listening on port ' + port);
}); 

/*
httpsServer.listen(8443,function(){
	console.log('HTTPS SERVER listening on port 8443!');
});  
*/