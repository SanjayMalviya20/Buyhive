// import productodel from "@/lib/models/productSchema";
import { NextResponse } from "next/server";
import { load } from "@/lib/dbco";
load()
import productodel from "@/lib/models/productSchema";


export const PUT = async (req, res) => {
    const id = await res.params.id;
    const formdata = await req.formData();
    const products = await productodel.findById(id);
       console.log(formdata,id)
    try {
        if (!formdata.get("rating") || !formdata.get("feedback") || !formdata.get("userid")) {
            return NextResponse.json({ error: "rating, feedback and userid is required" }, { status: 400 });
        }

        // Check if reviews array already exists
        if (!products.reviews) {
            products.reviews = [];
        }

        // Push new review into the array
        products.reviews.push({
            userid: formdata.get("userid"),
            feedback: formdata.get("feedback"),
            rating: formdata.get("rating")
        });

        await products.save();
        return NextResponse.json({ products: products.reviews });

    } catch (error) {
        console.error("Error update products:", error);
        return new Response(JSON.stringify({ error: "Failed to update products" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}

export const GET =async(req,res)=>{
    const id =await res.params.id
    try{
        const products =await productodel.findById(id);
        return NextResponse.json( { products:products.reviews });
    }
    catch(error){
        console.error("Error fetching products:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch products" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        }
        );
    }
} 


export const DELETE = async (req, res) => {
    const id = await res.params.id[0];
    const reviewid = await res.params.id[1];
    try {
        const products = await productodel.findById(id);
        if (!products) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        // Check if reviews array already exists
        if (!products.reviews) {
            products.reviews = [];
        }
        // delete the review from the array
        products.reviews = products.reviews.filter((item => item._id != reviewid));
        await products.save();
        return NextResponse.json({ products: products.reviews });
    } catch (error) {
        
    }
}

