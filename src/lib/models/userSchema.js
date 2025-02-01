
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({ 
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    addCart: {
        
        type: Array,
        default: []
    }
    // isAdmin: {
    //     type: Boolean,
    //     required: true,
    //     default: false
    // },
    // isSeller: {
    //     type: Boolean,
    //     required: true,
    //     default: false
    // },
    // seller: {
    //     name: String,
    //     logo: String,
    //     description: String,
    //     rating: {
    //         type: Number,
    //         default: 0,
    //         required: true
    //     },
    //     }
 })

 const usermodel = mongoose.models.users || mongoose.model("users", userSchema)
export default usermodel
