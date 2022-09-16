const { esClient } = require('../lib/elasticsearch/esClient');

console.log('Running createSpellsIndex.js Script...')

// Create the index (Table analogous)
const createSpellsIndex = () => {
    // https://www.elastic.co/guide/en/elasticsearch/client/elasticsearch-js/16.x/api-create.html
    esClient.indices.create({
        index: 'elasticspells_spells'
    }, (err, resp, status) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Create index response: ", resp);
        }
    })
    /*.then( () => { // Here is where I would add a mapping - if I knew what the point of doing so is and what to specify.
        return esClient.indices.putMapping({
            type: '_doc',
            index: `elasticspells_spells`,
            body: {
                properties: {
                    x: { type: 'keyword'},
                    y: { type: 'date'},
                }
            },
        })
    })*/
    // In applied, we also create the mapping here. Is it optional? What are the tradeoffs?
}

createSpellsIndex()

console.log('Finished createSpellsIndex.js Script.')