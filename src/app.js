//inlcude packages
const express = require("express");
const morgan = require('morgan');
const createError = require('http-errors');

// set global and envs
require('dotenv').config({path: __dirname + '/.env'});
require("./global.js");

// include helpers
const {accessEnv} = require(__app.__helpers.accessEnv);

//include DBs
const {MongoDBConnect} = require(__app.__config.mongoClient);

//include routes
const RecordRouter = require(__app.__routes.RecordRoute);

//include middlewares

//creating express app
const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Setting headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

//Use routes
app.get('/', (req, res) => res.send({ message: 'Hello from Getir' }));

app.use('/Record/', RecordRouter);


//Global error management 
app.use( async (req, res, next) => {
    next(createError.NotFound())
});

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    })
});

const port = accessEnv("APP_PORT", 3000);

const start = async () => {

    const dbConnection = await MongoDBConnect();
    global.db = dbConnection;
    app.listen(port, () => console.log(`🚀 Getir find Service listening on port ${port}!`))
}
const wait = async () => {
    await new Promise(res => setTimeout(res, 5000));
}

const main = async () => {
    console.log("🗄️  Executing main function");
    let retries = 5;
    while(retries) {
        try {
            console.log("✅ connect to DBs");
            await start();
            break;
        }
        catch(err) {
            console.log(err);
            console.log("err.message : ", err.message);
            retries -= 1;
            console.log("restries left :", retries);
            await wait();
        }
    }
}

main();