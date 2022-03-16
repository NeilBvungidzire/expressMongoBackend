require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Successfully connected to database'))

app.use(express.json()) // Allow database to handle json type data 

const subscriberRouter = require('./routes/subscribers'); //subscriber routes
app.use('/subscribers', subscriberRouter)

app.listen(3000, () => console.log('Server has started successfully'));