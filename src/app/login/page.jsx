"use client"
import Nav from '@/components/Nav'
// import { signIn } from '@/auth'

import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
const page = () => {
  const router = useRouter()
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, []);
  const [Data, setData] = useState({
    email: "",
    password: "",
  });

  const login = async (e) => {
    e.preventDefault();
    signIn("credentials", {
      email: Data.email,
      password: Data.password,
      redirect: true,
      callbackUrl: "/",
    });
    // console.log(Data);
  }

  const handleChange = (e) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  }
  return (
    <>
  <Nav/>
    <div className="h-screen bg-white overflow-hidden flex items-center justify-center flex-col gap-3 ">
      <div className=" p-4 pt-7 h-[45%] shadow-[0px_1px_6px_black] rounded-md  shado   flex items-center justify-center flex-col gap-3 ">
        <label style={{ backgroundColor: "white", color: "black" }} className="input p-4 mt-1 shadow-[0px_1px_12px_black]  rounded-md  border text-black input-outline flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70">
            <path
              d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path
              d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input name='email' onChange={handleChange} type="text" className="grow pla   text-black" placeholder="Email" />
        </label>
        <label style={{ backgroundColor: "white", color: "black" }} className="input p-4  shadow-[0px_1px_12px_black]  rounded-md  border text-black input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70">
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd" />
          </svg>
          <input name='password' onChange={handleChange} type="text" className="grow" placeholder="Password" />
        </label>
        <div className='flex flex-col items-center'>

          <button onClick={login} className='p-1 rounded-md text-[15px] pl-3 pr-3 text-white bg-black btn hover:bg-blue-700 '>Login</button>
          <h1 className='text-xl text-black'>or</h1>
          <Link href={"/singup"}>
            <p className='rounded-md text-xl text-black underline mb-6'>Don,t have account?</p>
          </Link>
          {/* <button className='p-1 rounded-md text-xl text-white bg-gray-700' onClick={() => signIn("google",{callbackUrl:"/"})}>Sign in with Google</button> */}
        </div>
      </div>
    </div>
    </>
  )
}

export default page
