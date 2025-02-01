"use client"
import Nav from '@/components/Nav';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
const page = () => {
  const [Data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const roter = useRouter()
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Data.name || !Data.email || !Data.password) {
      alert("Please fill all the fields");
      return;
    }
    const formData = new FormData();
    formData.append("name", Data.name);
    formData.append("email", Data.email);
    formData.append("password", Data.password);
    const data = await fetch("http://localhost:3000/api/register", { method: "POST", body: formData });
    const res = await data.json();
    if (res.error || res.errors) {
      alert("invalid credentials");
      return;
    }
    roter.push("/login")

    // console.log(res);



  }
  const handleChange = (e) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  }

  return (
    <>
      <Nav />
      <div className="h-[100vh] flex items-center justify-center flex-col gap-3 ">

        <form onSubmit={handleSubmit} className=" p-4 h-[60%] text-balance  rounded-md  shadow-[0px_1px_12px_black]  flex items-center justify-center flex-col gap-3 ">
          <label style={{ backgroundColor: "white", color: "black" }} className="input shadow-[0px_1px_6px_black] input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path
                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input onChange={handleChange} name='name' type="text" className="grow " placeholder="Name" />
          </label>
          <label style={{ backgroundColor: "white", color: "black" }} className="input shadow-[0px_1px_6px_black] input-outline flex items-center gap-2">
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
            <input name='email' onChange={handleChange} type="text" className="grow text-black" placeholder="Email" />
          </label>
          <label style={{ backgroundColor: "white", color: "black" }} className="input shadow-[0px_1px_6px_black] input-bordered flex items-center gap-2">
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

            <button type="submit" className=' rounded-md text-sm pl-3 pr-3 text-white bg-black  hover:bg-blue-800 btn p-1'>singup</button>
            <h1 className='text-xl text-black'>or</h1>
            <Link href={"/login"}>
              <a className='rounded-md text-xl text-black underline '>Signin</a>
            </Link>
          </div>
        </form>
      </div>
    </>
  )
}

export default page
