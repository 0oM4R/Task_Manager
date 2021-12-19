const mongoose =require('mongoose');
const connection =async ()=>{
   return  await mongoose.connect('mongodb://localhost/my_database')
   .then(
        ()=> console.log('DB connection established')
    );
};
module.exports = connection;