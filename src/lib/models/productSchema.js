
import mongoose from "mongoose";

const productShecma = new mongoose.Schema({
    userid: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    reviews: {
        type: [{
            userid: {
                type: String,
                required: true
            },
            feedback: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true,
                min: 1,
                max: 5
            },
            _id: {
                type:String, 
                default:crypto.randomUUID()            }
        }],
        default: []
    },
    desc: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    color: {
        type: Array,
        default: [],
        required: true
    },
    style: {
        type: String,
        // required:true
    },

    size: {
        type: Array,
        default: [],
        required: true
    },
    inventory: {
        type: String,
        default: "0",
        required: true
    },
    price: {
        type: String,
        default: "0",
        required: true
    },
    image: {
        type: Array,
        required: true
    }
})

const productodel = mongoose.models.Products || mongoose.model("Products", productShecma)
export default productodel