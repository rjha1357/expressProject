const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });  // use these before app file
const app = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
// .connect(process.env.DATABASE_LOCAL,{
.connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(()=>  console.log("db connection success")).catch( (err) => console.log(err));

// console.log(process.env);
// console.log(app.get('env'));   // show the type of environment variable is devlopment or production
// START SERVER
const port = process.env.PORT || 3000;
app.listen(port, () =>{
    console.log(`App running on ${port}`);
});