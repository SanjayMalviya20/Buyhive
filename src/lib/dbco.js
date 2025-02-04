import mongoose from "mongoose";

export function load(params) {
    
    mongoose.connect("mongodb+srv://sanjay:sanjaymalviyamongodb@sanjay.fdp92.mongodb.net/").then(() => {
        console.log("connected to db");
    })
    .catch((err) => {
        console.log(err);
    })
}