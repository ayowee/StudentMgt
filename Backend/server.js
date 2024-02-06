// Code to start the server and connect to the database
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
require("dotenv").config();

// Load environment variables
const app = express();

const PORT = process.env.PORT || 3000;

// Connect to the database
app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

// Start the server
mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // Remove the following options as they are no longer supported
    // useCreateIndex: true,
    // useFindAndModify: false
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB connection established successfully');
});

const studentRouter = require("./routes/students.js");

app.use("/student",studentRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
