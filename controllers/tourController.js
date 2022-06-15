const fs = require('fs');
const Tour = require('./../models/tourModel');

/* const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
 ); */

/*
exports.checkID = (req, res, next, val) => {
    console.log(`tour id is: ${val}`);
    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid Id'
        });
    }
    next();
}
*/

exports.checkBody = (req, res, next) => {
    if(!req.body.name || !req.body.price){
        return res.status(400).json({
            status: 'fail',
            message: 'Missing name and price'
        })
    }
    next();
}  // like these middleare we can create user is login or not.

exports.getAllTours = (req, res) => {
    console.log(req.requestTime)
    res.status(200).json({
        status: 'success',
        requestAt: req.requestTime,
        // result: tours.length,
        // data:{
        //     tours
        // }
    });
};

exports.getTour = (req, res) => {
    /*
    console.log(req.params);  
    // returns the id number that we put in url..  {id: '5'}.
    //   or if we use url we multiple params like /tours/:id/:x/:y it returns {id:'5', x: '23', y: '45'}. if we don't put 
    //   any 1 paramater in url then it will throw error. So we can use optional (?) in params like /tours/:id/:x/:y?, 
    //   now if don't use (y) in our url then also url will run..  like for URL /tours/:id/:x =  (id:'5', x: '23', y: undefined)
       

    const id = req.params.id * 1;  // in js, if we multiply any string looks like number, with any number, it will return number.

    // here we are checking if id exists or not in json file. We can check it with another way also as given below by checking
    // if tour exists or not.. 

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
    */

};

exports.createTour = (req, res) =>{
    /*
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
    */

};

exports.updateTour = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour here...>'
        }
    });
};

exports.deleteTour = (req, res) => {
    // if(req.params.id * 1 > tours.length){
    //     return res.status(404).json({
    //         status: 'fail',
    //         message: 'Invalid Id'
    //     });
    // }   in place of these checkID function runs

    res.status(204).json({  // 204 means no content
        status: 'success',
        data: null
    });
};