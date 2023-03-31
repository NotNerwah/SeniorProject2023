import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient, ObjectId } from 'mongodb';

const MONGO_URL = 'mongodb://127.0.0.1:27017';
const MONGO_DATABASE = "test";


let dbClient = null;
const connect = async (url) => {
    let client = await MongoClient.connect(url, {
        directConnection: true,
        appName : "warehouseinventorymanager"
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
    const values = await database.collection("warehouseinventory").find({}).toArray();
    return values;
}

// delete an item from the db
const deleteItem = async (id) => {
    const database = await getConnection();
    console.log("Deleting " + id)
    await database.collection("warehouseinventory").deleteOne({_id: ObjectId(id)});    
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
    await database.collection("warehouseinventory").insertOne(itemRecord);    
}

const getOrder = async () => {
    const database = await getConnection();
    const values = await database.collection("orders").find({}).toArray();
    return values;
}

const cancelOrder = async (orderNumber) => {
    const database = await getConnection();
    console.log("Cancelling " + orderNumber)
    await database.collection("orders").deleteOne({orderNumber: ObjectId(orderNumber)});    
}

const addOrder = async (orderNumber, sku, itemName, customerName, customerAddr, customerPhone) => {
    const database = await getConnection();
    const orderRecord = {
        "orderNumber" : orderNumber,
        "sku" : sku,
        "itemName" : itemName,
        "customerName" : customerName,
        "customerAddr" : customerAddr,
        "customerPhone" : customerPhone
    }
    console.log("Adding " + orderNumber + ", " + sku + ", " + itemName + ", " + customerName + ", " + customerAddr + ", " + customerPhone)
    await database.collection("orders").insertOne(orderRecord); 
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
        method: 'get',
        path: '/orders',
        handler: async (req, res) => {
            const values = await getOrder();
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
            const { _id } = req.body;
            await deleteItem(_id);
            res.status(200).json({ status: "ok"});
        },
    },
    {
        method: 'post',
        path: '/cancelorder',
        handler: async (req, res) => {
            const { orderNumber } = req.body;
            await cancelOrder(orderNumber);
            res.status(200).json({ status: "ok"});
        },
    },
    {
        method: 'post',
        path: '/addorder',
        handler: async (req, res) => {
            const {orderNumber, sku, itemName, customerName, customerAddr, customerPhone} = req.body;
            await addOrder(orderNumber,sku, itemName, customerName, customerAddr, customerPhone);
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