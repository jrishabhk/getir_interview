const MongoClient = require('mongodb').MongoClient;
const {accessEnv} = require(__app.__helpers.accessEnv);
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({path : path.dirname(__dirname) + '/.env'});

// Connection URL
const url = accessEnv("MONGODB_URL");


// Database Name
const dbName = accessEnv("DATABASE_NAME");

//MongoDB connection options 
const mongoConnectionOption = {
    useNewUrlParser: true, 
    useUnifiedTopology : true,
};

// Create a new MongoClient
const client = new MongoClient(url, mongoConnectionOption);

// Use connect method to connect to the Server



async function run() {
    try {
        // Connect the client to the server
        await client.connect();
        // Establish and verify connection
        const dbConnection = await client.db(dbName);
        console.log("📚 MongoDB 🎯 client Connected successfully to server");
        return dbConnection;
    } 
    catch(exception) {
        console.log(exception);
    }    
    // finally {
    //   // Ensures that the client will close when you finish/error
    //   console.log("MongoDB 🎯 client closed successfully to server");
    //   await client.close();
    // }
}
  
const MongoDBConnect = () => run().catch(console.dir);


client.on('connected', () => {
    console.log('MongoDB client connected to db')
})

client.on('error', (err) => {
    console.log(err.message)
})

client.on('disconnected', () => {
    console.log("MongoDB client's connection is disconnected.")
})

process.on('SIGINT', async () => {
    await client.close()
    process.exit(0)
})


module.exports = {
    client : client,
    MongoDBConnect : MongoDBConnect
};


