var express = require('express');
var app = express();
const PORT = process.env.PORT || 8000

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});


// Serve built frontend. This path is set in frontend/package.json 'build' command
app.use(express.static(__dirname + '/public/'));
app.use('/favicon.ico', express.static('public/favicon.ico'));


app.listen(PORT, function () {
  console.log(`ElasticSpells [Backend] - Listening on http://localhost:${PORT}`);
});
