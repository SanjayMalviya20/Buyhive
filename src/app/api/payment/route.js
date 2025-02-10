import { load } from "@/lib/dbco";
import productodel from "@/lib/models/productSchema";
import { NextResponse } from "next/server";
import Stripe from "stripe";
load()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req, res) {
    const productid = await req.nextUrl.searchParams.get("id")
    try {
        const product = await productodel.findById(productid);
      const images =await  product.image?.map((image) => image?.split(",")[0]);
    //   console.log(product)
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: product.title,
                            images: [ images[0] ],
                        },
                        unit_amount: product.price * 100,
                    },
                    quantity: 1,
                },
                
            ],
            metadata: {
                amount: product.price,
                order_id: crypto.randomUUID(),
            }, 
            mode: 'payment',
            payment_method_types: ['card'],
            // payment_method_types_order: ['card', "paypal","amazon_pay"],
           
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel',
        });

        return NextResponse.json({ url: session.url ,metadata:session.metadata}, { status: 200 });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
    }
}







// export async function POST(req, res) {
//     const productid = await req.params.id
//     try {
//         const product = await productodel.findById(productid);
//         const session = await stripe.checkout.sessions.create({
//             line_items: [
//                 {
//                     price_data: {
//                         currency: 'inr',
//                         product_data: {
//                             name: product.title,
//                             // images: [product.image],
//                         },
//                         unit_amount: product.price * 100,
//                     },
//                     quantity: 1,
//                 },
//             ],
//             mode: 'payment',
//             payment_method_types: ['card', 'upi'],
//             payment_method_types_order: ['upi', 'card'],
//             success_url: 'http://localhost:3000/success',
//             cancel_url: 'http://localhost:3000/cancel',
//             // Optional parameters
//             customer_email: req.body.email, // Pre-populate the customer's email
//             customer_phone: req.body.phone, // Pre-populate the customer's phone number
//             billing_address_collection: 'auto', // Collect the customer's billing address
//             shipping_address_collection: {
//                 allowed_countries: ['IN'], // Only allow shipping to India
//             },
//             shipping_options: [
//                 {
//                     shipping_rate: 'shr_123456789', // Use a predefined shipping rate
//                 },
//             ],
//             automatic_tax: {
//                 enabled: true, // Enable automatic tax calculation
//             },
//             expires_at: Math.floor(Date.now() / 1000) + 60 * 60, // Set the session to expire in 1 hour
//             allow_promotion_codes: true, // Allow the customer to apply promotion codes
//         });

//         return NextResponse.json({ url: session.url });
//     } catch (error) {
//         console.error("Error creating checkout session:", error);
//         return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
//     }
// }