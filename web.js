var express = require('express'),
app = express();
app.use(express.static(__dirname + '/public_html'));
function requireHTTPS(req, res, next) {
    if (!req.secure) {
        //FYI this should work for local development as well
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
}
app.get('*', function(req, res, next) {
  requireHTTPS(req, res, next);
});

var server = app.listen(process.env.PORT || 443);
