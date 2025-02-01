// pages/api/sign-cloudinary-params.js
// import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

// cloudinary.config({
//   cloud_name: "dux4bp7wn",
//   api_key: "542665922522172",
//   api_secret: "P3X8BznxBEmfoR6TuMUVljRwwuw",
// });

export  async function POST(req, res) {
  const { paramsToSign } = await req.json();
  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
  "P3X8BznxBEmfoR6TuMUVljRwwuw"
  );
 return NextResponse.json({ signature });
}