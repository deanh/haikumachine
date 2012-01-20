var express = require('express');
var haiku   = require('./haiku.js');

var app = express.createServer(express.logger());

app.get('/', function(request, response) {
    var h = {
        attribution: "Haiku based on http://www.youhaventlived.com/haikumatic/",
        text: haiku.trad()
    }

    response.contentType('application/json');
    response.send(JSON.stringify(h));
});

var port = process.env.PORT || 3001;
app.listen(port, function() {
  console.log("Listening on " + port);
});