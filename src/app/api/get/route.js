// import { load } from "@/lib/dbco"; // Ensure this loads your database connection
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Ensure the database is connected
        await mongoose.connect("mongodb://localhost:27017/EcommerceNEXT");
     
        const users = await mongoose.connection.db.collection('users').find({}).toArray();

        return NextResponse.json({ users });
    } catch (error) {
        console.error("Error fetching users:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch users" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}