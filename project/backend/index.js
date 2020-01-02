const http = require('http');
const https = require('https');
const express = require('express');
const app = express();
const path = require('path');


// import api route
const api = require('./routes/api'); 

//ssl security (https) configuration
//const privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
//const certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
//const credentials = {key: privateKey, cert: certificate};

// create servers
const http_server = http.createServer(app);
//const httpsServer = https.createServer(credentials, app);

// api route
app.use('/api/', api.router);

app.use(express.static('frontend'));
// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/frontend/index.html'));
});

const port = process.env.PORT || 3000;

// start servers
http_server.listen(port,function(){
	console.log('Backend Server listening on port ' + port);
}); 

/*
httpsServer.listen(8443,function(){
	console.log('HTTPS SERVER listening on port 8443!');
});  
*/

module.exports = http_server
