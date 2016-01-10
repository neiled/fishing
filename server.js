var dotenv = require('dotenv');
dotenv.load();
var express = require('express');
var path = require('path');
var logger = require('morgan');

var app = express();
app = require('./api/app')(app);
var server = require('http').Server(app);

var httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer();

var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? process.env.PORT : 8080;
var publicPath = path.resolve(__dirname, 'public');

app.use(express.static(publicPath));


app.set('port', port);
app.set('ip', process.env.IP || "0.0.0.0");

// We only want to run the workflow when not in production
if (!isProduction) {


  // Any requests to localhost:3000/build is proxied
  // to webpack-dev-server
  app.all('/build/*', function (req, res) {
    proxy.web(req, res, {
        target: 'http://retina.local:3000'
    });
  });

}

// It is important to catch any errors from the proxy or the
// server will crash. An example of this is connecting to the
// server when webpack is bundling
proxy.on('error', function(e) {
  console.log('Could not connect to proxy, please try again...');
});

server.listen(app.get('port'), app.get('ip'), function() {
  console.log('Express server listening on port ' + server.address().port);
});
