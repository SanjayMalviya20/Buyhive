
import productodel from "@/lib/models/productSchema";
import { NextResponse } from "next/server";
import { load } from "@/lib/dbco";


load();

export async function POST(req, res) {
    try {
        const formData = await req.formData();
        const porduct = await productodel.create({
            userid: formData.get("userid"),
            title: formData.get("title"),
            price: formData.get("price"),
            size: formData.get("size"),
            desc: formData.get("desc"),
            image: formData.get("image"),
            inventory: formData.get("inventory"),
            category: formData.get("category"),
            color: formData.get("color"),
            style:formData.get("style"),
        });
        return NextResponse.json({ porduct, success: true });
    } catch (error) {
        console.error("Error creating product:", error);
        return new Response(JSON.stringify({ error: "Failed to create product" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}






