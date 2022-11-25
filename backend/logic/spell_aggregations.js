const { esClient } = require('../lib/elasticsearch/esClient');


// Example complex aggregation - How many (of these) spells are available to each DnD Class?
// nested terms query
// It seems like this will not work right now because the "classes" field is not an object in the mapping, but a string. I think.
// [parsing_exception] Unknown key for a VALUE_STRING in [fromClassList]: [field].
exports.getNumberOfSpellsPerDnDClass = async (req, res, next) => {
    const searchTerm = req.query.searchTerm

    if (!searchTerm)
        searchTerm = "*"

    console.log(`Querying for NumberOfSpellsPerDnDClass`)

    const esResponse = await esClient.search({
        index: 'elasticspells_spells',
        body: {
            query: {
                multi_match: {
                    query: searchTerm,
                    fields: ["entries", "entriesHigherLevel.entries", "name"],
                },
            },
            aggs: {
                classes: {
                    nested: {
                        path: "classes"
                    },
                    aggs: {
                        fromClassList: {
                            nested: {
                                field: "fromClassList"
                            },
                            aggs: {
                                class: {
                                    term: {
                                        field: "name"
                                    },
                                },
                            },
                        },
                    },
                },
            },
        }
    })

    console.log(`Searched for ${searchTerm} - found ${esResponse.hits.total} results.`)

    console.log(`Raw response from ES: ${JSON.stringify(esResponse)}`)


    // TODO is this right?
    const spellsData = esResponse.hits.hits.map(esHit => {
        return esHit._source
    })

    return spellsData
}