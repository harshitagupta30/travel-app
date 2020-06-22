// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const requestPost = require('./handleRequest');
const fetch = require('node-fetch');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));

// Set up and Spin up the server
const port = 8080;
const server = app.listen(port, () => {
    console.log(`server is listening on port: ${port}`); // Callback to debug
});

/* Place to store data */
const trips = [];

/* Routes */

app.get('/', (req, res) => {
    res.status(200).send('./dist/index.html');
});

app.post('/save', (req, res, next) => {
    if (req.body !== '') {
        const trip = req.body;
        trips.push(trip);
        res.status(201).send(trip);
    } else {
        res.status(400).json('Bad Request');
    }
});

app.post('/coordinates', requestPost.handleCoordinatesRequest);

app.post('/forecast', requestPost.handleWeatherForecastRequest);

app.post('/image', requestPost.handleImageRequest);