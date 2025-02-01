"use client";
import Provider from "@/components/Provider";
import "./globals.css";
import { Baloo_Bhaijaan_2 } from "next/font/google";

const edu = Baloo_Bhaijaan_2({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-edu",
})

export default function RootLayout({ children, pageProps }) {
  return (
    <html lang="en">
      {/* <head>
      <link href="https://cdn.jsdelivr.net/npm/daisyui@4.12.23/dist/full.min.css" rel="stylesheet" type="text/css" />
      <Script defer src="https://cdn.jsdelivr.net/npm/daisyui@4.12.23/dist/full.min.js"></Script>
      </head> */}
      <body className={edu.variable}>

        <Provider>
        
          {children}
        </Provider>

      </body>
    </html>
  );
}