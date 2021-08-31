const properties = require('./properties');
const MongoClient = require('mongodb').MongoClient;

module.exports.connect = function (database) {
    MongoClient.connect(properties.db.uri, { useUnifiedTopology: true }, (error, client) => {
        if (error) {
            console.log(`not connected to ${properties.db.dbName} database`);
            database(null);
        } else {
            console.log(`connected to ${properties.db.dbName} database`);
            var db = client.db(properties.db.dbName);
            database(db);
        }
    });
}