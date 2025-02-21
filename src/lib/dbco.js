import mongoose from "mongoose";

export function load() {
    // mongoose.connect("mongodb+srv://sanjay:sanjaymalviyamongodb@sanjay.fdp92.mongodb.net/").then(() => {
    //     console.log("connected to db");
    // })
    mongoose.connect(process.env.MONGODB_URI).then(() => {
        console.log("connected to db");
    })
    
    .catch((err) => {
        console.log(err);
    })
}