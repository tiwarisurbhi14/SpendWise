const mongoose = require("mongoose");

const db = async () => {
    try{
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to MongoDB');
    }catch(err){
        console.log(err);
    }
};

module.exports = {db};