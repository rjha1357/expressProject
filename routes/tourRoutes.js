const express = require('express');
const tourController = require('./../controllers/tourController');
// const {getAllTours,} = require('./../controllers/tourController');  we can use in thse way also and directly use getAllTours 
                        // instead of using tourController.getAllTours

const router = express.Router();

// router.param('id', tourController.checkID);

//create a checkBody middleware function
// check if body contains the name and price property
// if not, send back 400 (bad request)
// Add it to the post handler stack

router.route('/')
              .get(tourController.getAllTours)
              .post(tourController.checkBody, tourController.createTour);  //  tourController.checkBody is a middleware

router.route('/:id')
            .get(tourController.getTour)
            .patch(tourController.updateTour)
            .delete(tourController.deleteTour);

module.exports = router;