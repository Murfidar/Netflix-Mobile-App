const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.MONGODB_URL;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

function getDb() {
  return db;
}

async function connect() {
  try {
    await client.connect();

    const database = await client.db("Movie-api");
    db = database;

    return database;
  } catch (error) {
    // Ensures that the client will close when you finish/error
    console.log(error);
  }
}

module.exports = { connect, getDb };
