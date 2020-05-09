const config = require('../config');
const {MongoClient} = require('mongodb');

var db = null;

/**
 * Initialize mongo collections
 */
async function initMongoCollections() {

    try {
        // Get all collections of DB
        const collections = await db.listCollections({}, {nameOnly: true}).toArray();
        
        // Insert data to missing collections
        for (let name of config.mongoDBCollections) {

        if (collections.filter(collect => collect.name == name).length == 0) {
            let data = require(`../data/${name}.js`);
            
            if (data.length > 0) await db.collection(name).insertMany(data);
        }
        }

    } catch (e) {
        console.error(e);
    }
}

/**
 * Get Mongo DB
 */
async function getMongodb() {
    if (db == null) {
        const uri = `mongodb+srv://${config.mongoUser}:${config.mongoPass}@${config.mongoClusterURL}/shop?retryWrites=true&w=majority&useUnifiedTopology=true`;
        const client = new MongoClient(uri);
        
        // Connect to the MongoDB cluster
        await client.connect();

        db = client.db(config.mongoDBName);
        
        await initMongoCollections();
    }
    return db;
}

module.exports = new Promise(function(resolve, reject){
    getMongodb().then(db => resolve(db));
});
