const express = require('express');
const app = express();
const port = 8080; // sets the server port
const hostname = 'localhost'; // sets the server hostname

const mongoose = require('mongoose'); // mongoose object modeling for node.js

mongoose.connect(`mongodb://${hostname}/shoppinglist`, {useNewUrlParser: true, useUnifiedTopology: true });

// connect to db and handle errors

const db = mongoose.connection
    .on('error', (error) => console.error(error))
    .once('open', () => console.log('Connected to database'));

// allows our app to use json

app.use(express.json());

// import our router and set our app to use router

const shoppinglistRouter = require('./routes/shoppinglist_router.js');
app.use('/shoppinglist', shoppinglistRouter);

// start app on specified port and hostname

app.listen(port, hostname, () => {
    console.log(`server listening on: ${hostname}:${port}`);
});