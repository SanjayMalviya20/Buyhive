
import productodel from "@/lib/models/productSchema";
import { NextResponse } from "next/server";
import { load } from "@/lib/dbco";
 load();
export async function GET() {
    try {
        // Ensure the database is connected
        // await mongoose.connect("mongodb://localhost:27017/EcommerceNEXT");
        const products = await productodel.find().populate('userid');
        return NextResponse.json({ products });
    } catch (error) {
        console.error("Error fetching products:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch products" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
