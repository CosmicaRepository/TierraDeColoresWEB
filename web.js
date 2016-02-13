var express = require('express'),
app = express();
app.use(express.static(__dirname + '/dist'));

app.get('*', function(req, res, next) {
  requireHTTPS(req, res, next);
});

