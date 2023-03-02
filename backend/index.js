import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient, ObjectId } from 'mongodb';

const MONGO_URL = 'mongodb://127.0.0.1:27017';
const MONGO_DATABASE = "t"; 


let dbClient = null;
const connect = async (url) => {
    let client = await MongoClient.connect(url, {
        directConnection: true,
        appName : "musicapp"
    });    
    return client;
}

const getConnection = async () => {
    if (!dbClient) {
        dbClient = await connect(MONGO_URL);
        if (!dbClient) {
            console.log("Failed to connect to mongodb");
            process.exit(1);
        }
    }
    return dbClient.db(MONGO_DATABASE);
}

// returns every item in  the database
const getInventory = async () => {
    const database = await getConnection();
    const values = await database.collection("fs.files").find({}).toArray();
    return values;
}

// delete an item from the db
const deleteItem = async (sku) => {
    const database = await getConnection();
    console.log("Deleting " + sku)
    await database.collection("t").deleteOne({sku: ObjectId(sku)});    
}

// add an item to the db
const addItem = async (sku, name, category, quantity, price) => {
    const database = await getConnection();
    const itemRecord = {
        "sku" : sku,
        "name" : name,
        "category" : category,
        "quantity" : quantity,
        "price" : price

    }
    console.log("Adding " + sku + ", " + name + ", " + category + ", " + quantity + ", " + price)
    await database.collection("t").insertOne(itemRecord);    
}

// these are the routes for the backend APIs
const routes = [
    {
        method: 'get',
        path: '/',
        handler: async (req, res) => {
            res.send(`Backend server is running, listening at port: ${BACKEND_PORT}\n`);
        },
    },
    {
        method: 'get',
        path: '/inventory',
        handler: async (req, res) => {
            const values = await getInventory();
            res.status(200).json(values);
        },
    },
    
    {
        method: 'post',
        path: '/additem',
        handler: async (req, res) => {
            const {sku, name, category, quantity, price} = req.body;
            await addItem(sku, name, category, quantity, price);
            res.status(200).json({ status: "ok"});
        },
    },
    {
        method: 'post',
        path: '/deleteitem',
        handler: async (req, res) => {
            const { sku } = req.body;
            await deleteItem(sku);
            res.status(200).json({ status: "ok"});
        },
    },
];

const BACKEND_PORT = 8000;
const app = express();
app.use(bodyParser.json());

// setup the routes
routes.forEach(route => {
    app[route.method](route.path, route.handler);
});

const start = async () => {
    await connect(MONGO_URL);
    app.listen(BACKEND_PORT, () => {
        console.log(`Server is up at port ${BACKEND_PORT}`)
    })
    
}
start(); // setup connection to mongodb and start the server

process.on('SIGINT', () => { console.log("Exiting!"); process.exit(); })