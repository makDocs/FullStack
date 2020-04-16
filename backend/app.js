const express = require('express');
const bodyParser = require('body-parser');

const _PORT = 5000;

const app = express();

const HttpError = require('./models/http-error');

const placesRouter = require('./routes/places-routes');

app.use(bodyParser.json()); // For " req.body. " in post , ....

app.use('/api/places', placesRouter);

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404)
    throw error;
})

app.use((error, req, res, next) => {
    console.log('ERRRRRRRRRRRRRROOOOOOOOOOOORRRRRRRRR');
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({
        message: error.message || "An unknown Error occurred !"
    });
});

app.listen(_PORT, () => {
    console.log("App is Running on Port :: " + _PORT)
})