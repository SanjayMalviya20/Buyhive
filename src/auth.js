import NextAuth from "next-auth"
import bcrypt from "bcrypt"
import Google from "next-auth/providers/google"
// import { MongoDBAdapter } from "@auth/mongodb-adapter"
// import client from "./lib/db"
 import credationals from "next-auth/providers/credentials"
import UserModel from "./lib/models/userSchema"
export const { auth, handlers, signIn, signOut } = NextAuth({
  // Configure one or more authentication providers

  // adapter: MongoDBAdapter(client),
  providers: [ Google,

    credationals({
      // id: "credationals",
      name: "credationals",
      credentials: {
        email: { label: "email", type: "email", placeholder: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const user = await UserModel.findOne({ email: credentials.email })
        const password = bcrypt.compareSync(credentials.password,user.password)
       
        if (user && password) {
          return user
        } else {
          throw new Error("Invalid email or password")
        }
      },
     
   })
  ],

  pages: {
    signIn: "/login",
    error: "/login",
  },
 
    callbacks: {
      session: async ({ session, token }) => {
        if( session?.user) {
          session.user.id = token.id;
        }
        return session;
      },
      jwt: async ({ token, user }) => {
        if (user) {
          token.id = user.id;
        }
        return token;
      },

  },
  session: {
    strategy: "jwt",
  },
  debug:process.env.NODE_ENV === "development",
 
  
})