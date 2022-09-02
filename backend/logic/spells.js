const sampleData = require('./sampleData/sampleData');


exports.getSpells = (req, res, next) => {
    const searchTerm = req.query.searchTerm
    return sampleData.sampleData
}