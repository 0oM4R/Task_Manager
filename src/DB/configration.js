const mongoose =require('mongoose');
const connection =async ()=>{
   return  await mongoose.connect(process.env.DB_HOST)
   .then(
        ()=> console.log('DB connection established')
    );
};
module.exports = connection;