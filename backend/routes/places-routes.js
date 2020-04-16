const {
    Router
} = require('express');

const router = Router();

const {
    check
} = require('express-validator')


const placeControler = require('../Controllers/places-Controllers');

router.get('/:pid', placeControler.getPlaceById);

router.get('/user/:uid', placeControler.getPlaceByUserId);

router.post('/', [
    check('title')
    .not()
    .isEmpty(),
    check('description')
    .isLength({
        min: 5
    }),
    check('address')
    .not()
    .isEmpty(),


], placeControler.createPlace);

// update place
router.patch('/:pid', [
    check('title')
    .not()
    .isEmpty(),
    check('description')
    .isLength({
        min: 5
    }),
], placeControler.updatePlace);

router.delete('/:pid', placeControler.deletePlace);


module.exports = router;