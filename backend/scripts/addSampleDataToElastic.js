const { sampleData } = require('../logic/sampleData/sampleData.js')
const { esClient } = require('../lib/elasticsearch/esClient');

console.log('Running addSampleDataToElastic.js Script...')

// Approach 1
const simpleInsertSpells = () => {

    const indexThisSpell = (spell) => {
        try {
            console.log(`${spell.name} indexing started.`)
            esClient.index( {
                index: 'elasticspells_spells',
                id: spell.name,
                body: spell,
            } )
            .then(resp => {
                console.log(`Indexing ${spell.name} Success - response: `)
                console.log(resp)
            })
            .catch(resp => {
                console.log(`>> Indexing ${spell.name} FAILED - response: `)
                console.log(resp)
            })
        } catch (err) {
            console.log(`ERROR indexing ${spell.name} - ${err}`)
        }
        
        console.log(`${spell.name} indexing ended.`)
    }

    sampleData.forEach( spell => {
        indexThisSpell(spell)
    })
}


// Approach 2 - bulk insert, untested
const bulkInsertSpells = async (spellsData) => {
    const dataToInsert = spellsData.map(spell => {
        // For each document, we have to specify the operation to use. In this case, to index it into the _index we specify.
        // Weirdly, this is just done by having another object in front of the data object in the array of things to insert.
        return [ 
            { index: { _index: 'elasticspells_spells' } }, 
            spell,
        ]
    }).flat() //use flatMap for more efficiency.

    const bulkResponse = await esClient.bulk({ 
        operations: dataToInsert, 
        refresh: true,
    })

    if (bulkResponse.errors) {
        const erroredDocuments = []
        // The items array has the same order of the dataset we just indexed.
        // The presence of the `error` key indicates that the operation
        // that we did for the document has failed.
        bulkResponse.items.forEach((action, i) => {
          const operation = Object.keys(action)[0]
          if (action[operation].error) {
            erroredDocuments.push({
              // If the status is 429 it means that you can retry the document,
              // otherwise it's very likely a mapping error, and you should
              // fix the document before to try it again.
              status: action[operation].status,
              error: action[operation].error,
              operation: body[i * 2],
              document: body[i * 2 + 1]
            })
          }
        })
        console.log(erroredDocuments)
    }
}

simpleInsertSpells()

console.log('Finished addSampleDataToElastic.js Script.')