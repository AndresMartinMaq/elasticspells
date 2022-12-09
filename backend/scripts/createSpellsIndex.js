const { esClient } = require('../lib/elasticsearch/esClient');

console.log('Running createSpellsIndex.js Script...')

// Create the index (Table analogous)
const createSpellsIndex = () => {
    // https://www.elastic.co/guide/en/elasticsearch/client/elasticsearch-js/16.x/api-create.html
    return esClient.indices.create({
        index: 'elasticspells_spells'
    })
    .then( (resp) => {
        if (resp)
            console.log("Create index response: ", resp);
    })
    .then( () => { 
        // Mappings are analogous to schemas in a relational DB, they specify data types.
        // You can omit this completely and ES will default to reasonable values. You want to
        // specify your own if you require it for a specific reason. For example, as below, to specify
        // a "nested" type instead of having ES's default behaviour on nested objects.
        //
        // Whatever you don't specify will get generated once you add data to the index.
        return esClient.indices.putMapping({
            type: '_doc',
            index: `elasticspells_spells`,
            body: {
                properties: {
                    classes: { // <- "classes" here is not a keyword.
                        properties: {
                            fromClassList: {
                                type: "nested",
                                properties: {
                                    name: { type: "keyword" },
                                    source: { type: "keyword" },
                                },
                            },
                        },
                    },
                },
            },
        })
    })
    .then( (resp) => {
        if (resp)
            console.log("Create Mappings response: ", resp);
    })
    .catch((err) => {
		console.error(err);
		process.exit(1);
	})
}

createSpellsIndex()
.then(() => {
    console.log('Finished createSpellsIndex.js Script.')
})
