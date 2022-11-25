const { esClient } = require('../lib/elasticsearch/esClient');

// This file has a lot of comments because it's meant to work as a learning/reference document.


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
    
    const innerQuery = getInnerEsQuery(searchTerm, searchMode)
    if (searchMode && !innerQuery)
        return res.sendStatus(400)
    
    console.log(`Searching for [${searchTerm}] - in mode [${searchMode}].`)

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
            // 'match' and 'multi-match' will only match full words, but may match only one of the given words. 
            // E.g. "fire ball" will match "fire" or "ball" but not "firefly".
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
        nameAndDescByPartialString_alternative1: {
            "bool": {
                "should": [ // Entries in "should" are OR'd.
                    { "wildcard": { "name": { "value": `*${searchTerm}*` } } },
                    { "wildcard": { "entries": { "value": `*${searchTerm}*` } } },
                    { "wildcard": { "entriesHigherLevel.entries": { "value": `*${searchTerm}*` } } },
                ],
                "minimum_should_match" : 1,
            },
        },
        nameAndDescByPartialString_alternative2: {
            /**
             * What is query > bool > [must + filter] structure?
             * Apparently, "filter" type clauses
             * are usually run after the preceding query is done. If we want ES to try to optimise the initial query by considering
             * the "filter" clause ahead of time, we need to warn it using this "bool" wrapper.
             * 
             * Is this any more efficent or better that just dropping the innermost "bool" clause directly after the root query? Don't know.
             * 
             * https://stackoverflow.com/questions/28958882/elasticsearch-filtered-query-vs-filter (deprecated, see next link)
             * https://www.elastic.co/guide/en/elasticsearch/reference/5.0/query-dsl-filtered-query.html 
             */
            "bool": {
                "must": { "match_all": {} },
                "filter": {
                    "bool": {
                        "should": [
                            { "wildcard": { "name": { "value": `*${searchTerm}*` } } },
                            { "wildcard": { "entries": { "value": `*${searchTerm}*` } } },
                            { "wildcard": { "entriesHigherLevel.entries": { "value": `*${searchTerm}*` } } },
                        ]
                    }
                }
            }
        },
        nameAndDescByFullPhrase: {
            // Similar to match, but does not separate words. E.g. "fire ball" does not match "fire on the ball" (unlike "match").
            "bool": {
                "should": [
                    { "match_phrase": { "name": searchTerm } },
                    { "match_phrase": { "entries": searchTerm } },
                ]
            }
        },
        fuzzyDesc: {
            // Seems to behave weird when 2 words are provided. E.g. "fire damage" does not match "fire damage".
            // By default, matches terms within 1 Levenshtein edit distance for terms of 3-5 characters, 2 L.Distance for terms of 6+ characters.
            "fuzzy": {
                "entries": searchTerm,
            },
        },
        spellLevelRange: {
            "range": {
                "level": {
                    "gte": searchTerm.split('-')[0],
                    "lte": searchTerm.split('-')[1] || searchTerm.split('-')[0], // second part is a bit of a hack, probably inefficient way to check equality.
                }
            },
        },
    }[type]
}
