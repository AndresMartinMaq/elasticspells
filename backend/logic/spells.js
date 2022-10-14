const sampleData = require('./sampleData/sampleData');
const { esClient } = require('../lib/elasticsearch/esClient');

// This file has a lot of comments because it's meant work as a learning/reference document.


// Simplest query 
const getAllSpells = async (req, res, next) => {
    const esResponse = await esClient.search({
        index: 'elasticspells_spells',
        body: {
            size: 1000,
            sort: [
                {
                    "name.keyword": {
                        "unmapped_type": "keyword",
                        "order": "asc"
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

// Simple query
exports.getSpells = async (req, res, next) => {
    const searchTerm = req.query.searchTerm

    if (!searchTerm)
        return getAllSpells(req, res, next)

    console.log(`Searching for ${searchTerm}`)

    const esResponse = await esClient.search({
        index: 'elasticspells_spells',
        body: {
            query: {
                multi_match: {
                    query: searchTerm,
                    fields: ["entries", "entriesHigherLevel.entries", "name"],
                },
            },
            size: 1000, // Optional, number of hits to return. Defaults to 10.
            from: 0,    // Optional, offset used for results pagination. Defaults to 0.
            sort: [
                {
                    "name.keyword": {
                        "unmapped_type": "keyword",
                        "order": "asc"
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

// Using different kinds of queries
exports.getSpellsMultiMode = async (req, res, next) => {
    const searchTerm = req.query.searchTerm
    const searchMode = req.query.searchMode

    if (!searchTerm)
        return getAllSpells(req, res, next)
    
    const query = getInnerEsQuery(searchTerm, searchMode)
    if (searchMode && !query)
        return res.sendStatus(400)
    
    return searchSpells(query)
}

const searchSpells = async (innerQuery) => {
    const esResponse = await esClient.search({
        index: 'elasticspells_spells',
        body: {
            query: innerQuery,
            size: 1000,
            sort: [
                {
                    "name.keyword": {
                        "unmapped_type": "keyword",
                        "order": "asc"
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

const getInnerEsQuery = (searchTerm, type = "default_fullTermInTitleOrDesc") => {
    return {
        default_fullTermInTitleOrDesc: {
            "multi_match": {
                query: searchTerm,
                fields: ["entries", "entriesHigherLevel.entries", "name"],
            },
        },
        byTitle: {
            "match": {
                "name": searchTerm,
            },
        },
        byDescriptionSimple: {
            "match": {
                "entries": searchTerm,
            },
        },
        nameAndDescByPartialString: {
            "query_string": {
                query: `*${searchTerm}*`,
                fields: ["name", "entries", "entriesHigherLevel.entries"]
            },
        }, 
        nameAndDescByPartialString_alternative: {
            "query": {
                "filtered": {
                    "query": {
                        "match_all": {}
                    },
                    "filter": {
                        "bool": {
                            "should": [
                                { "query": { "wildcard": { "name": { "value": `*${searchTerm}*` } } } },
                                { "query": { "wildcard": { "entries": { "value": `*${searchTerm}*` } } } },
                                { "query": { "wildcard": { "entriesHigherLevel.entries": { "value": `*${searchTerm}*` } } } },
                            ]
                        }
                    }
                }
            }
        }
    }[type]
}
