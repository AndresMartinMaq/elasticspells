const sampleData = require('./sampleData/sampleData');
const { esClient } =  require('../lib/elasticsearch/esClient');

// This file has a lot of comments because it's meant work as a learning/reference document.


// Simple query for reference
exports.getAllSpells = async (req, res, next) => {
    const esResponse = await esClient.search({
        index: 'elasticspells_spells',
        body: {
            size: 0,
            sort: [
                {
                    "name.keyword": {
                        "unmapped_type": "keyword",
                        "order": "desc"
                    }
                }
            ],
        }
    })
    const spellsData = esResponse.hits.hits.map(esHit => {
        return esHit._source
    })

    return spellsData
}

// Search spells
exports.getSpells = async (req, res, next) => {
    const searchTerm = req.query.searchTerm || '[all results]'
    console.log(`Searching for ${searchTerm}`)

    const esResponse = await esClient.search({
        index: 'elasticspells_spells',
        body: {
            query: {
                "query_string": {
                    "query": "*"
                }
            },
            size: 1000, // Optional, number of hits to return. Defaults to 10. Can be set to 0 for 'all'
            from: 0,    // Optional, offset used for results pagination. Defaults to 0.
            sort: [
                {
                    "name.keyword": {
                        "unmapped_type": "keyword",
                        "order": "desc"
                    }
                }
            ],
        }
    })

    console.log(`Searching for ${searchTerm} - found ${esResponse.hits.total} results.`)
    // Shape of a response:
    /**
     * {
     *   hits: {
     *     total: 3,
     *     max_score: X,
     *     hits: [
     *       _id: X
     *       _index: "elasticspells_spells"
     *       _score: X
     *       _source: { ...actual data... }
     *       _type: "_doc"
     *     ]
     *   }
     *   took: 3,
     *   timed_out: false,
     *   _shards: { ... }
     * }
     */
    const spellsData = esResponse.hits.hits.map(esHit => {
        return esHit._source
    })

    return spellsData
}
