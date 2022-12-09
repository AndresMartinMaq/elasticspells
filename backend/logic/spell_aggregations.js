const { esClient } = require('../lib/elasticsearch/esClient');

// Simple aggregation
exports.numberOfSpellsOfEachLevel = async (req, res, next) => {
    const esResponse = await esClient.search({
        index: 'elasticspells_spells',
        body: {
            query: {
                query_string: {
                    query: "*"
                }
            },
            aggs: {
                noOfSpellsOfEachLevel: {
                    terms: { field: "level" }
                },
            },
        },
    })
    console.log(`Searched for numberOfSpellsOfEachLevel`)
    // Shape of a response:
    /**
     * 
{
  took: 111,
  timed_out: false,
  _shards: { total: 5, successful: 5, skipped: 0, failed: 0 },
  hits: { total: 3, max_score: 1, hits: [ [Object], [Object], [Object] ] },
  aggregations: {
    noOfSpellsOfEachLevel: {
      doc_count_error_upper_bound: 0,
      sum_other_doc_count: 0,
      buckets: [ { key: 3, doc_count: 2 }, { key: 7, doc_count: 1 } ]
    }
  }
}
     */

    const result = esResponse.aggregations.noOfSpellsOfEachLevel.buckets.map( (bucket) => {
        return { 
            spellLevel: bucket.key, 
            numberOfSpells: bucket.doc_count 
        }
    })

    console.log(`Spells of each level: ${JSON.stringify(result)}`)

    return result
}

/** How many spells are available to each DnD Class?
 * Interesting here is the querying of a fiend in an object structure, which is possible even if
 * the object is not in a nested-type mapping due to the way Elasticsearch flattens object fields
 * and the fact that in this particular usecase we do not need to differentiate between the inner
 * objects - we just care about whether they contain the DnD-class name.
 * https://www.elastic.co/guide/en/elasticsearch/reference/current/nested.html 
 * If I needed a different sort of query that DID requre differentiating between these objects,
 * I would need to make the "fromClassList" a nested mapping type (see below).
*/
exports.getNumberOfSpellsPerDnDClass = async (req, res, next) => {
    console.log(`Querying for NumberOfSpellsPerDnDClass`)

    const esResponse = await esClient.search({
        index: 'elasticspells_spells',
        body: {
            query: {
                query_string: {
                    query: "*"
                },
            },
            size: 0,
            aggs: {
                classes: {
                    terms: { field: "classes.fromClassList.name.keyword" }
                },
            },
        }
    })

    const result = esResponse.aggregations.classes.buckets.map( (bucket) => {
        return { 
            DndClass: bucket.key, 
            numberOfSpells: bucket.doc_count 
        }
    })

    console.log(`Spells of each DnD Class: ${JSON.stringify(result)}`)

    return result
}


// Example complex aggregation - How many (of these) spells are available to each DnD Class?
// nested terms query
// It seems like this will not work right now because the "classes" field is not an object in the mapping, but a string. I think.
// [parsing_exception] Unknown key for a VALUE_STRING in [fromClassList]: [field].
exports.getNumberOfSpellsPerDnDClass = async (req, res, next) => {
    let searchTerm = req.query.searchTerm

    if (!searchTerm || searchTerm === 'undefined')
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

    return result
}