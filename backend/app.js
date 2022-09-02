var express = require('express');
//const config = require('./lib/config')

var app = express();
const PORT = process.env.PORT || 8000

const logic = {}
logic.spells = require('./logic/spells')


// Serve built frontend. This path is set in frontend/package.json 'build' command
app.use(express.static(__dirname + '/public/'));
app.use('/favicon.ico', express.static('public/favicon.ico'));


// Allow CORS during development
app.use((req, res, next) => {
    if (process.env.NODE_ENV === 'development' || true) {

        res.header('Access-Control-Allow-Origin', req.headers.origin)
        res.header(
            'Access-Control-Allow-Methods',
            'GET,PUT,POST,DELETE,OPTIONS',
        )
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, Accept, Content-Type, Authorization, Content-Length, X-Requested-With',
        )
        res.header('Access-Control-Allow-Credentials', 'true')
    }
    return next()
})
//app.options('*', (req, res) => res.send(200))



// -- Routes --
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/spells', (req, res, next) => {
    console.log('Called /spells')
    const result = logic.spells.getSpells(req, res, next)
    res.send(result)
});



app.listen(PORT, function () {
  console.log(`ElasticSpells [Backend] - Listening on http://localhost:${PORT}`);
});
