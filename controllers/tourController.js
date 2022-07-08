const fs = require('fs');
const Tour = require('./../models/tourModel');
const APIFeatures = require('./../utils/apiFeatures');

exports.aliasTopTours = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();
};



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

// exports.checkBody = (req, res, next) => {
//     if(!req.body.name || !req.body.price){
//         return res.status(400).json({
//             status: 'fail',
//             message: 'Missing name and price'
//         })
//     }
//     next();
// }  // like these middleare we can create user is login or not.

exports.getAllTours = async (req, res) => {
    try{
        // BUILD QUERY
        
        // 1A. filtering
        /*
        const queryObj = {...req.query};   //... get out all the obejct outside curly brackets
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el]);
        // console.log(req.requestTime)
       
        // 1B. Advance filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        console.log(JSON.parse(queryStr));
        // const query = Tour.find({ durations: 5, difficulty: 'easy' });   

    // OR   (req.query or (durations: 5, difficulty: 'easy') are same)

    // console.log(req.query);
    // { difficulty: 'easy', duration: { $gte: 5 } }
    
    // const query = Tour.find(queryObj);
    let query = Tour.find(JSON.parse(queryStr));
        */
       
    // 2. SORTING...
    /*
        if(req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            console.log(sortBy)
            query = query.sort(sortBy);
            // sort('price' ratingsAverage')
        }else{
            query = query.sort('-createdAt');
        }
        */

    // 3. field Limiting
    // if(req.query.fields){
    //     const fields = req.query.fields.split(',').join(' ');
    //     query = query.select(fields);
    // }else{
    //     query = query.select('-__v')
    // }

    // 4. PAGINATION
    /*
    const page = req.query.page*1 || 1;
    const limit = req.query.limit*1 || 100;
    const skip = (page - 1)*limit;
    // page=2&limit=10, 1-10, page1 11-20, page3 21-30
    query = query.skip(skip).limit(limit);

    if(req.query.page){
        const numTours = await Tour.countDocuments();
        if(skip >= numTours) throw new Error('This page does not exists');
    }
    */

    //EXECUTE QUERY
    const features = new APIFeatures(Tour.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .pagination();

    const tours = await features.query;
    // const tours = await query;
    // query.sort().select().skip().limit()

                // Query
    // const query = Tour.find()
    // .where('durations')
    // .equals(5)  // OR lte(5)
    // .where('difficulty')
    // .equals('easy');

    // SEND RESPONSE
    res.status(200).json({
        status: 'success',
        // requestAt: req.requestTime,
        result: tours.length,
        data:{
            tours
        }
    });

    }catch(err){
        console.log('get error');
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

exports.getTour = async (req, res) => {

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

    try{
       const tour = await Tour.findById(req.params.id);  //mongo DB query
       res.status(200).json({
        status: 'success',
        data:{
            tour
        }
       });
    }catch(err){
        res.status(400).json({
        status: 'fail',
        message: err
    });
    }
};

exports.createTour = async (req, res) =>{
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

    try{

        // const newTour = new Tour({})
        // newTour.save()

        const newTour = await Tour.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        });

    }catch(err){
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }

    

};

exports.updateTour = async (req, res) => {
    try{
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        })
    }catch(err){
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

exports.deleteTour = async (req, res) => {
    // if(req.params.id * 1 > tours.length){
    //     return res.status(404).json({
    //         status: 'fail',
    //         message: 'Invalid Id'
    //     });
    // }   in place of these checkID function runs

    try{
       await Tour.findByIdAndDelete(req.params.id);

        res.status(204).json({  // 204 means no content
            status: 'success',
            data: null
        });
    }catch(err){
        res.status(400).json({
            status: 'fail',
            message: err
        }); 
    }

    
};

exports.getTourStats = async (req, res) => {
    try{
       
        const stats = await Tour.aggregate([
            {
                $match: { ratingsAverage: { $gte: 4.5 } }
            },
            {
                $group: {
                    _id: '$ratingsAverage',
                    // _id: '$difficulty',
                    // _id: null,
                    // _id: { $toUpper: '$difficulty'},
                    numTours: { $sum: 1},
                    numRatings: { $sum: '$ratingsQuantity'},
                    avgRating: { $avg: '$ratingsAverage'},
                    avgPrice: { $avg: '$price' },
                    minPrice: { $min: '$price' },
                    maxPrice: { $max: '$price' },
                }
            },
            {
                $sort: { avgPrice: 1}
            },
            {
                $match: { _id: { $ne: 'EASY'} }
            }
            
        ]);
       
        res.status(200).json({
            status: 'success',
            data: {
                stats
            }
        });
    }catch(err){
        res.status(400).json({
            status: 'fail',
            message: err
        }); 
    }
}

exports.getMonthlyPlan = async (req, res) => {
    try{
        const year = req.params.year*1; //2021

        const plan = await Tour.aggregate([
            {
                $unwind: '$startDates'
            },
            {
                $match:{
                    startDates: {
                        $gte: new Date(`${year}-01-01`),
                        $lte: new Date(`${year}-12-31`),
                    }
                }
            },
            {
                $group: {
                    _id: { $month: '$startDates'},
                    numTourStarts: { $sum: 1 },  // returns how many tour starts in particular month
                    tours: { $push: '$name'}  // which tours are there in the month
                }
            },
            {
                $addFields: { month: '$_id'}
            },
            {
                $project: {
                    _id: 0
                }
            },
            {
                $sort: { numTourStarts: -1 }
            },
            {
                $limit: 6
            }
        ]);

        res.status(200).json({
            status: 'success',
            data: {
                plan
            }
        });

    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}