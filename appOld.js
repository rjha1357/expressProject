/* code before refactoring the routes */

const express = require('express');
const { json } = require('express/lib/response');
const fs = require('fs');
const { request } = require('http');
const app = express();

app.use(express.json());  // middleware
/*
// app.get('/', (req, res) => {
// res.status(200).send('Hello world !');
// });

app.get('/', (req, res) => {
    res.status(200)
    .json({message: "Hello from the server side!", app: "Natours"});
});
*/

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// get all tours..
app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        result: tours.length,
        data:{
            tours
        }
    });
});

// get tours by id
app.get('/api/v1/tours/:id', (req, res) => {
    console.log(req.params);  
    /* returns the id number that we put in url..  {id: '5'}.
       or if we use url we multiple params like /tours/:id/:x/:y it returns {id:'5', x: '23', y: '45'}. if we don't put 
       any 1 paramater in url then it will throw error. So we can use optional (?) in params like /tours/:id/:x/:y?, 
       now if don't use (y) in our url then also url will run..  like for URL /tours/:id/:x =  (id:'5', x: '23', y: undefined)
        */

    const id = req.params.id * 1;  // in js, if we multiply any string looks like number, with any number, it will return number.

    /* here we are checking if id exists or not in json file. We can check it with another way also as given below by checking
     if tour exists or not.. */

    // if(id > tours.length){
    //     return res.status(404).json({
    //         status: 'fail',
    //         message: 'Invalid Id'
    //     });
    // }
    const tour = tours.find(el => el.id === id)  // (find) is an js function which loop through data to find our logic that we write.
    if(!tour){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid Id'
        });
    }
    res.status(200).json({
        status: 'success',
        data:{
            tour
        }
    });
});


// post tours on json file
app.post('/api/v1/tours', (req, res) =>{
    // console.log(req.body);
    // saving data to json file..
    const newId = tours[tours.length - 1].id + 1; //getting new ID for data which will inserted
    // (Object.assign ) allows us to create new object in the existing object
    const newTour = Object.assign({id: newId}, req.body);  //adding Id and the request of body to .json file
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err =>{
        res.status(201).json({
            status: 'success',
            data:{
                tour: newTour
            }
        });
    });
});

// update tours (not changing anything in file)
app.patch('/api/v1/tours/:id', (req, res) => {
    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid Id'
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour here...>'
        }
    });
});

// delete request
app.delete('/api/v1/tours/:id', (req, res) => {
    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid Id'
        });
    }

    res.status(204).json({  // 204 means no content
        status: 'success',
        data: null
    });
});

const port = 3000;
app.listen(port, () =>{
    console.log(`App running on ${port}`);
});

