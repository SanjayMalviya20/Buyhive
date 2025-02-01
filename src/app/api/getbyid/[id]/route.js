
import productodel from "@/lib/models/productSchema";
import { NextResponse } from "next/server";
import { load } from "@/lib/dbco";


load();



export const GET = async (req, res) => {
    const id =await res.params.id
    try {
     
        const products = await productodel.findById(id).populate('userid');
        return NextResponse.json({ products });
    } catch (error) {
        console.error("Error fetching products:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch products" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        }
        );
    }    
}




