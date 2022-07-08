const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });  // use these before app file
const Tour = require('./../../models/tourModel');
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
// .connect(process.env.DATABASE_LOCAL,{
.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(()=>  console.log("db connection success"));

// read json file

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

// import data into DB
const importData = async () => {
    try{
        await Tour.create(tours);
        console.log('data successfully loaded');
    }catch(err){
        console.log(err);
    }
};

// delete all data from DB
const deleteData = async () => {
    try{
        await Tour.deleteMany();
        console.log('Data successfully deleted!');
    }catch(err){
        console.log(err);
    }
};

if(process.argv[2] === '--import'){
    importData();
}else if(process.argv[2] === '--delete'){
    deleteData();
}

console.log(process.argv);