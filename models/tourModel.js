const mongoose = require('mongoose');
const slugify  = require('slugify');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter name'],
      trim: true,
    },
    slug: String,
    rating: {
      type: Number,
      default: 4.5,
    },
    durations: {
      type: Number,
      required: [true, 'Please enter duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'Please enter group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'Please enter difficulty'],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    priceDiscount: Number,
    summary: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.virtual('durationWeeks').get(function () {
  return this.durations / 7;
}); // we cannot use durationWeeks in our query because it is not an part of database

// DOCUMENT MIDDLEWARE: run before .save() and .create() but not on insertMany() 
//pre middleware , run before actual event like saving data to database. also called as pre saved hooks 
tourSchema.pre('save', function(next){
    // console.log(this);  // this is the currently process document
this.slug = slugify(this.name, { lower: true});
next();
});

// tourSchema.pre('save', function(next){
//   console.log('Will save document...');
//   next();
// });

// POST MIDDLEWARE: executes after all pre middleware completes
tourSchema.post('save', function(doc, next){
  console.log(doc);  // return the inserted data
  next();
});


// QUERY MIDDLEWARE
tourSchema.pre(/^find/, function(next){    // ^find means all the keyword starts with find will execute
  // tourSchema.pre('find', function(next){
  this.find({ secretTour: { $ne: true }});
  this.start = Date.now();
  next();
})

// tourSchema.pre('findOne', function(next){
//   this.find({ secretTour: { $ne: true }});
//   next();
// })

tourSchema.post(/^find/, function(docs, next) {
  console.log(`Query took ${Date.now() - this.start} ms!`);
  console.log(docs);
  next();
})

// AGGREGATION MIDDLEWARE
tourSchema.pre('aggregate', function(next){
  this.pipeline().unshift({ $match: {secretTour: { $ne: true }}});
  next();
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
