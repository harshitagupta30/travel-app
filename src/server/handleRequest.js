const dotenv = require('dotenv');
const fetch = require('node-fetch');

dotenv.config();

async function handleWeatherForecastRequest(req, res, next) {
    if (req.body !== ' ') {
        const endpoint = `${process.env.DARKSKY_URL}/${process.env.DARKSKY_KEY}/${req.body.latitude},${req.body.longitude}`;
        try {
            const response = await fetch(endpoint);
            if (response.ok) {
                const jsonRes = await response.json();
                res.status(201).send(jsonRes);
            }
        } catch (error) {
            console.log(error);
        }
    } else {
        res.status(400).json('Bad Request');
    }
}

async function handleCoordinatesRequest(req, res, next) {
    const destination = req.body.destination;
    if (destination != ' ') {
        const endpoint = `${process.env.OPENCAGEDATA_URL}?q=${destination}&key=${process.env.OPENCAGEDATA_KEY}`;
        try {
            const response = await fetch(endpoint);
            if (response.ok) {
                const jsonRes = await response.json();
                res.status(201).send(jsonRes);
            }
        } catch (error) {
            console.log(error);
        }
    } else {
        res.status(400).json('Bad Request');
    }
}

async function handleImageRequest(req, res, next) {
    const destination = req.body.destination
    if (destination != ' ') {
        //https://pixabay.com/api/?key=17136304-c1a68e17b3a73635b5ab150c1&q=yellow+flowers&image_type=photo
        const endpoint = `${process.env.PIXABAY_URL}?key=${process.env.PIXABAY_KEY}&q=${destination}&image_type=photo`;
        try {
            const response = await fetch(endpoint);
            if (response.ok) {
                const jsonRes = await response.json();
                res.status(201).send(jsonRes);
            }
        } catch (error) {
            console.log(error);
        }
    } else {
        res.status(400).json('Bad Request');
    }
}


exports.handleWeatherForecastRequest = handleWeatherForecastRequest;
exports.handleCoordinatesRequest = handleCoordinatesRequest;
exports.handleImageRequest = handleImageRequest;