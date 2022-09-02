var express = require('express');
var app = express();
const PORT = process.env.PORT || 8000

const logic = {}
logic.spells = require('./logic/spells')

// -- Routes --
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/spells', (req, res, next) => {
    const result = logic.spells.getSpells(req, res, next)
    res.send(result)
});



// Serve built frontend. This path is set in frontend/package.json 'build' command
app.use(express.static(__dirname + '/public/'));
app.use('/favicon.ico', express.static('public/favicon.ico'));


app.listen(PORT, function () {
  console.log(`ElasticSpells [Backend] - Listening on http://localhost:${PORT}`);
});
