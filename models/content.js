const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contentSchema = new Schema({
   userName: {
        type: String,
        required: true
   },
   content: {
        type: String,
   },
   image: {
        type: String,
        default: "https://media.istockphoto.com/id/955087966/photo/winner-trophy-on-sky-background.jpg?s=1024x1024&w=is&k=20&c=YjOPw5ochVhKSN89NeHJXZHbgqVtDlnw-uGPPnlCjLY=",
        set: (v)=> v === "" ? "https://media.istockphoto.com/id/955087966/photo/winner-trophy-on-sky-background.jpg?s=1024x1024&w=is&k=20&c=YjOPw5ochVhKSN89NeHJXZHbgqVtDlnw-uGPPnlCjLY=": v,   
   },
   createdAt: {
     type: Date,
     default: new Date(),
     set: (v)=> v === "" ? new Date(): v,
   }
});
const Content = mongoose.model("Content", contentSchema);
module.exports = Content;
