const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter name'],
    },
    rating:{
        type: Number,
        default: 4.5
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a price']
    }
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;

// const testTour = new Tour({
//     name: 'The Park Camper',
//     rating: 4.6,
//     price: 497
// });

// testTour.save()
// .then(doc => {console.log(doc);
// })
// .catch(err => {
//     console.log('ERROR :', err);
// });