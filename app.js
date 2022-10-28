require('dotenv').config();
const express = require('express');
const app = express();

const notFoundMiddleware = require('./middleware/not-found');
const erroeMiddleware = require('./middleware/error-handler');

const connectDB = require('./db/connect');
const productRouter = require('./routes/products');

// middleware
app.use(express.json());

// routes

app.get('/', (req,res) => {
    res.send('<h1>Store API </h1><a href="/api/v1/products">Products route</a>')
})

app.use('/api/v1/products', productRouter);

// products route

app.use(notFoundMiddleware);
app.use(erroeMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
    try {
        // connectToDB
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server is listening on port ${port}..`))
    } catch (err) {
        console.log(err)
    }
}

start()