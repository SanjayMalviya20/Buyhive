import { load } from "@/lib/dbco";
import productodel from "@/lib/models/productSchema";
import { NextResponse } from "next/server";


load()



export const DELETE=async(req,res)=>{
    const id =await res.params.id
    try {
        if(!id){
            return NextResponse.json({ error: "id is required" }, { status: 400 });
        }
        await productodel.findByIdAndDelete(id);
        return NextResponse.json({ message: "Product deleted successfully" });

    } catch (error) {
        console.error("Error delete products:", error);
        return new Response(JSON.stringify({ error: "Failed to delete products" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        }
        );
    }
}