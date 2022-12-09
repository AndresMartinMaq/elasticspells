const express = require('express');
//const config = require('./lib/config')

const app = express();
const PORT = process.env.PORT || 8000

const logic = {}
logic.spells = require('./logic/spells')
logic.spellAggregations = require('./logic/spell_aggregations')


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

app.get('/spells', async (req, res, next) => {
    console.log('Called /spells')
    try {
        const result = await logic.spells.getSpells(req, res, next)
        res.send(result)
    }
    catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
});

app.get('/spellSearch', async (req, res, next) => {
    console.log('Called /spellSearch')
    try {
        const result = await logic.spells.getSpellsMultiMode(req, res, next)
        res.send(result)
    }
    catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
});


app.get('/aggs/numberOfSpellsOfEachLevel', async (req, res, next) => {
    console.log('Called aggs/numberOfSpellsOfEachLevel')
    try {
        const result = await logic.spellAggregations.numberOfSpellsOfEachLevel(req, res, next)
        res.send(result)
    }
    catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
});

app.get('/aggs/spellsPerDnDClass', async (req, res, next) => {
    console.log('Called aggs/spellsPerDnDClass')
    try {
        const result = await logic.spellAggregations.getNumberOfSpellsPerDnDClass(req, res, next)
        res.send(result)
    }
    catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
});
// -- Routes (end) --


// Start listening!
app.listen(PORT, function () {
  console.log(`ElasticSpells [Backend] - Listening on http://localhost:${PORT}`);
});
