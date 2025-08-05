const { MongoClient } = require('mongodb');

async function connectDB(uri, dbName) {
    const client = new MongoClient(uri);
    await client.connect();
    console.log("Conectado a la base de datos 🎉");
    return client;
}

async function closeDB(client) {
    await client.close();
}

module.exports = { connectDB, closeDB };