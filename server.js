const express = require('express');
const app = express();
const port = 8080;
const hostname = 'localhost';

const mongoose = require('mongoose');

mongoose.connect(`mongodb://${hostname}/shoppinglist`, {useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'));

app.use(express.json());

const shoppingListRouter = require('./routes/shoppinglist_router.js');
app.use('/shoppinglist', shoppingListRouter);


app.listen(port, hostname, () => {
    console.log(`server listening on: ${hostname}:${port}`);
});