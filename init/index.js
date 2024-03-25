const mongoose = require("mongoose");
const initData = require("./data.js");
const Content = require("../models/content.js");

const MONGO_URL = "mongodb+srv://verma_alok:CJVHSP91M8YEaXyq@cluster0.tbmiofa.mongodb.net/?retryWrites=true&w=majority";
main()
.then(()=>{
    console.log("connected");
})
.catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB = async()=>{
    await Content.insertMany(initData.data),
    console.log("Data was initialized");
};
initDB();