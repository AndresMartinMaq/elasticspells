const elasticsearch = require("elasticsearch")

const esClient = elasticsearch.Client({
    host: "http://localhost:9200",          // IRL we'd pull this from config/depending on env variable, so the prod one uses the right URL.
    log: [{
        type: 'stdio',
        level: 'warning',
    }]
})

esClient.ping({
    requestTimeout: 10000,
}, function (error) {
    if (error) {
        console.error('Cannot connect to Elasticsearch.');
    } else {
        console.log('⚡ Connected to ElasticSearch');
    }
});

exports.esClient = esClient