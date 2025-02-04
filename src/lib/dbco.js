import mongoose from "mongoose";

export function load(params) {
    
    mongoose.connect("mongodb://localhost:27017/EcommerceNEXT").then(() => {
        console.log("connected to db");
    })
    .catch((err) => {
        console.log(err);
    })
}