import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import Joi from 'joi';
import UserModel from "@/lib/models/userSchema" // Adjust the import path as necessary
import { load } from '@/lib/dbco';
load();
// Define the Joi schema for validation
const userSchema = Joi.object({
    name: Joi.string().required().min(3).max(50).messages({
        'string.empty': 'Name is required',
        'string.min': 'Name must be at least 3 characters long',
        'string.max': 'Name must be less than 50 characters long',
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Invalid email format',
        'string.empty': 'Email is required',
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Password must be at least 8 characters long',
        'string.empty': 'Password is required',
    }),
});

export async function POST(req) {
    const body = await req.formData();

    const userData = {
        name: body.get("name"),
        email: body.get("email"),
        password: body.get("password"),
    };

    // Validate the request body using Joi
    const { error } = userSchema.validate(userData, { abortEarly: false });

    if (error) {
        // Format validation errors into a user-friendly response
        const errors = error.details.map((detail) => ({
            field: detail.path[0],
            message: detail.message,
        }));
        return NextResponse.json({ error:errors }, { status: 400 });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    try {
        const user = await UserModel.create({
            name: userData.name,
            email: userData.email,
            password: hashedPassword,
        });

        return NextResponse.json({ user }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to create user", details: error.message },
            { status: 500 }
        );
    }
}
// export async function POST(req) {
//     const body = await formData(req);
//     const user = await usermodel.create({
//         name: body.get("name"),
//         email: body.get("email"),
//         password: body.get("password"),
//         // isAdmin: body.get("isAdmin"),
//         // isSeller: body.get("isSeller"),
//         // seller: {
//         //     name: body.get("name"),
//         //     logo: body.get("logo"),
//         //     desc: body.get("desc"),
//         //     rating: body.get("rating"),
//         //     numReviews: body.get("numReviews"),
//         // }
//     });               
//     return NextResponse.json({ user });
// }