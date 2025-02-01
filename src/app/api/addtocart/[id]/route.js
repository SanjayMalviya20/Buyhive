import productodel from "@/lib/models/productSchema";
import { NextResponse } from "next/server";
import { load } from "@/lib/dbco";
import usermodel from "@/lib/models/userSchema";
load()


export const POST = async (req, res) => {
    const id = await res.params.id
    const userdetails = await req.formData();
    const userid = userdetails.get("userid");
    try {
        const product = await productodel.findById(id);
        const user = await usermodel.findById(userid);
        if (!product || !user) {
            return NextResponse.json({ error: "Product or user not found" }, { status: 404 });
        }
        // return NextResponse.json({product,user}, { status: 200 });
        if (user?.addCart?.includes(id)) {
            return NextResponse.json({ message: "Product already in cart" }, { status: 400 });
        }
        // Add the product to the user's cart
        if (!user?.addCart?.includes(id)) {
            user.addCart.push(id);
            await user.save();
            return NextResponse.json({ message: "Product added to cart successfully"}, { status: 200 });
        }

    } catch (error) {
        return NextResponse.json({ error: "Failed to add to cart" }, { status: 500 });

    }

}

export const GET = async (req, res) => {

    const { id } = await res.params
    try {
        const user = await usermodel.findById(id);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        const productIds = user?.addCart;
        const products =await Promise.all(productIds.map(async (bookmark) => await productodel.findById(bookmark)));
        // const products = await productodel.find({ _id: { $in: productIds } });
        return NextResponse.json({products }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Failed to get cart" ,error:error}, { status: 500 });


    }
}


export const DELETE = async (req, res) => {
    const user = await req.formData();
    const userid = user.get("userid");
    const id = await res.params.id
    try {
        const user = await usermodel.findById(userid);
        // const product = await productodel.findById(id);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        // if (!product) {
        //     return NextResponse.json({ error: "Product not found" }, { status: 404 });
        // }
        const index = user.addCart.indexOf(id);
        if (index === -1) {
            return NextResponse.json({ error: "Product not found in cart" }, { status: 404 });
        }
        // user.addtoCart.splice(index, 1);
        user.addCart = user.addCart.filter((item) => item !== id);
        await user.save();
        return NextResponse.json({ message: "Cart cleared successfully" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Failed to clear cart" }, { status: 500 });
    }
}