import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req, res) {
    const id = await res.params.id
    const product = await productodel.findById(id);
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: product.title,
                        images: [product.image],
                    },
                    unit_amount: product.price * 100,
                },
                quantity: 1,
            },
        ],
        payment_method_types: ["card", "upi"],
        payment_method_options: {
            upi: {
                supported_upi_apps: ["google_pay", "phone_pe", "paytm"],
            },
        },
        metadata: {
            product_id: product._id,
            quantity: 1,
        },
        mode: "payment",
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel",
    });
    return NextResponse.json({ url: session.url });
}