const sampleData = require('./sampleData/sampleData');
const esClient = require('../lib/elasticsearch/esClient');

exports.getSpells = (req, res, next) => {
    const searchTerm = req.query.searchTerm
    console.log(`Searching for ${searchTerm}`)
    return sampleData.sampleData
}