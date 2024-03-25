const express = require("express");
const app = express();
const path = require("path");
const PORT = 8080;
const Listing = require("./models/content.js");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const dotenv = require('dotenv').config();
const MONGO_URL = "mongodb+srv://verma_alok:WTF10YaYxRGCt3A3@cluster0.tbmiofa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const mongoose = require("mongoose");
const Content = require("./models/content.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views")); 
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));
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
app.get("/", (req, res)=>{
    res.send("Welcome to Website");
})
//for the home page 
app.get("/contents", async(req, res)=>{
    const allContents = await Content.find({});
    res.render("homePage.ejs", {allContents});
})
//New Page Route
app.get("/contents/new", (req, res)=>{
    res.render("newPage.ejs");
})
//Show Route
app.get("/contents/:id/edit", async(req, res)=>{
    const {id} = req.params;
    const content =  await Content.findById(id);
    //console.log(content);
    res.render("EditPage.ejs", {content});
})
//update Route
app.put("/contents/:id", async(req, res)=>{
    let {id} = req.params;
    
    let updatedUser = await Content.findByIdAndUpdate(id, {...req.body.send}, {runValidators: true, new: true});
    //console.log(updatedUser);
    res.redirect("/contents");
})
//delete route
app.get("/contents/:id", async(req, res)=>{
    const {id} = req.params;
    const {content} = Content.findById(id);
    await Content.deleteOne(content);
    res.redirect("/contents");
})
//Edit Route
app.get("/contents/edit", (req, res)=>{
    res.render("editPage.ejs");
})


app.post("/contents", async(req, res)=>{
    //console.log(req.body);
    const {userName, content, image} = req.body;
    const newUser = new Content({
        userName:userName,
        content: content,
        image: image,
    });
    await newUser.save();
    res.redirect("/contents");
})
app.listen(PORT, ()=>{
    console.log(`app is listening at ${PORT}`);
})