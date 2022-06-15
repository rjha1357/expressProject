const express = require('express');
const req = require('express/lib/request');
const { json } = require('express/lib/response');
// const fs = require('fs');
const { request } = require('http');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// MIDDLEWARES
const app = express();

console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

app.use(express.json());  // middleware

app.use(express.static(`${__dirname}/public`));


/*  
 These middleware will call on each route hits, but if we add these middleware after the route code then these will not call 
 because the response cycle end on route only ( res.status(200).json({ ) here. 
    So if we want to use any middleware, call it before routes call.
*/
app.use((req, res, next) =>{
    console.log('Hello from the middleware');
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

/*
// app.get('/', (req, res) => {
// res.status(200).send('Hello world !');
// });

app.get('/', (req, res) => {
    res.status(200)
    .json({message: "Hello from the server side!", app: "Natours"});
});
*/


// get all tours..
// app.get('/api/v1/tours', getAllTours);
// get tours by id
// app.get('/api/v1/tours/:id', getTour);
// post tours on json file
// app.post('/api/v1/tours', createTour);
// update tours (not changing anything in file)
// app.patch('/api/v1/tours/:id', updateTour);
// delete request
// app.delete('/api/v1/tours/:id', deleteTour);

/*  OR for our get and create tour we can write in these way also..   */
// app
//     .route('/api/v1/tours')
//     .get(getAllTours)
//     .post(createTour);

// app
//     .route('/api/v1/tours/:id')
//     .get(getTour)
//     .patch(updateTour)
//     .delete(deleteTour);

// app
//     .route('/api/v1/users')
//     .get(getAllUsers)
//     .post(createUser);

// app
//     .route('/api/v1/users/:id')
//     .get(getUser)
//     .patch(updateUser)
//     .delete(deleteUser);
      
    // ROUTES
    app.use('/api/v1/tours', tourRouter);
    app.use('/api/v1/users', userRouter);

module.exports = app;

