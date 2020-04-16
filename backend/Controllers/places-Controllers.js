const HttpError = require('../models/http-error');
const uuid = require('uuid/v4');

const {
    validationResult
} = require('express-validator')

let DUMMY_PLACES = [{
        id: 'p1',
        title: 'Empire State Building',
        description: "One of the most famous sky scrapers in the world!",
        imageUrl: 'https://d2xpeceo701ble.cloudfront.net/state-grill-and-bar/~/media/images/state-grill-and-bar/packages/empirestatebuildingnight700.jpg?la=en&vs=1&d=20170626T184528Z&hash=3392BB293A09F2CC53F1467EDECE8FE005C164A5',
        address: 'Empire State Building, New York, NY 10001, USA',
        location: {
            lat: 40.748492,
            lng: -73.985699
        },
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Empire State Building',
        description: "One of the most famous sky scrapers in the world!",
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSvVbZT31o3ZbWTohccN8jLazZ0475WqvmAzj6-Rq_DDHMQ4iMm&usqp=CAU',
        address: 'Empire State Building, New York, NY 10001, USA',
        location: {
            lat: 40.748492,
            lng: -73.985699
        },
        creator: 'u2'
    }
];

exports.getPlaceById = (req, res, next) => {
    const placeId = req.params.pid;
    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId;
    }); // agar nabashad Undefined ba migardone

    if (!place) {
        throw new HttpError('Could not find a place for the provided ID .');
    }

    res.json({
        place
    })
}

exports.getPlaceByUserId = (req, res, next) => {
    const userId = req.params.uid;
    const place = DUMMY_PLACES.find(p => {
        return p.creator === userId;
    });

    if (!place) {
        return next(
            new HttpError('Could not find a place for the provided User ID .', 404)
        ); //  eeine Error GET :: "/:pid"
    }

    res.json({
        place
    });
}

exports.createPlace = (req, res, next) => {
    const error = validationResult(req);
    console.log(error)
    if(!error.isEmpty()){
        throw new HttpError(`${error.errors[0].msg} , please check your data`,404);
    }
    
    const {
        title,
        description,
        coordinates,
        address,
        creator
    } = req.body;



    const createdPlace = {
        id: uuid(),
        title,
        description,
        coordinates,
        address,
        creator
    };
    DUMMY_PLACES.push(createdPlace); // unshift(createdPlace)

    res.status(201)
        .json({
            place: createdPlace
        })
}

exports.updatePlace = (req, res, next) => {
    const error = validationResult(req);
    console.log(error)
    if(!error.isEmpty()){
        throw new HttpError(`${error.errors[0].msg} , please check your data`,404);
    }
    
    const {
        title,
        description
    } = req.body;
    const placeId = req.params.pid;
    const updatedPlace = {
        ...DUMMY_PLACES.find(p => p.id === placeId)
    };
    const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId)
    updatedPlace.title = title;
    updatedPlace.description = description;
    DUMMY_PLACES[placeIndex] = updatedPlace;
    res.status(200).json({
        place: updatedPlace
    })
}

exports.deletePlace = (req, res, next) => {
    const placeId = req.params.pid;
    if(!DUMMY_PLACES.find(p=> p.id === placeId)){
        throw new HttpError('Could not find a place for that id.',404);
    }
    DUMMY_PLACES = DUMMY_PLACES.filter(p => {
        return p.id !== placeId;
    });
    res.status(200).json({
        message:"Place Deleted ."
    })
}