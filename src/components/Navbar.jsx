"use client"
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import "./btn.css"
import { useEffect, useState } from 'react';
const Navbar = ({setsearch}) => {
  const pathname = usePathname()
  const [cartlength, setcartlength] = useState(null);
  // console.log(pathname)
  const session = useSession();
  // const router = useRouter();
  // console.log(session)
  const logout = (e) => {
    e.preventDefault();
    signOut();
  };
  // console.log(session?.data?.user?.id)

  // useEffect(() => {
  //   if (session.status === "unauthenticated") {
  //     router.push("/login");
  //   }
  // },[])

  const getAlladdtoCart = async () => {
    const data = await fetch(`http://localhost:3000/api/addtocart/${session?.data?.user?.id}`, {
      method: "GET",
      cache:"no-cache"
    })
    const res = await data.json()
    setcartlength(res)
    console.log(res)

  }
  // console.log(id)

  useEffect(() => {
    getAlladdtoCart()
  }, [ session?.data?.user?.id])
  return (
    <>
    
      <div className="navbar bg-[#041438]">
        <div className="flex-1  justify-between items-center flex-wrap lg:flex-nowrap">
          <a className="btn btn-ghost  font-mono  lg:text-3xl text-2xl">BuyHive</a>

          {!pathname.includes("/addproduct") && !pathname.includes("/manageproducts") && !pathname.includes("/login") && !pathname.includes("/singup") &&  !pathname.includes("/addtocart") && !pathname.includes("showproduct")&&<div className="form-control">
            <input onChange={(e) => setsearch(e.target.value)} type="text" placeholder="Search" className="input bg-white text-black input-bordered w-32 rounded-full md:w-auto lg:w-56" />
          </div>}
        </div>
        {pathname.includes("/addproduct") &&
          <Link href={"/manageproducts"}>

            <button class="editbtn">
              Edit Produts
              <svg viewBox="0 0 512 512" class="svg">
                <path
                  d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
                ></path>
              </svg>
            </button>

          </Link>}
        {!pathname.includes("/login") && !pathname.includes("/singup") && <div className="flex-none">
          <ul className="menu menu-horizontal px-1 ">
            <li>
              {!pathname.includes("/manageproducts") && <details>
                <summary className='p-0 lg:p-2'>Profile</summary>
                <ul className="bg-base-100 rounded-t-none z-50  gap-2 flex flex-col items-center">
                  {session?.data && !pathname.includes("addproduct") && !pathname.includes("/showproduct") &&
                  !pathname.includes("/addtocart") && <Link href={"/addproduct"}><button className='text-md text-white bg-gray-800 p-1 rounded-lg '>Add product</button></Link>}
                  {session.data ? <button className='text-md w-full text-white bg-gray-800 p-1 rounded-lg ' onClick={logout}>Sign out</button > : <Link href={"/login"}><button className='text-md text-white bg-gray-800 p-2 w-full rounded-lg '>Sign in</button></Link>}

                </ul>
              </details>}
            </li>
          </ul>
          {!pathname.includes("/login") && !pathname.includes("/singup") && !pathname.includes("/addproduct") &&
            !pathname.includes("/manageproducts") && <div className="flex-none p-0">
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                  <div className="indicator">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="badge badge-sm indicator-item">{cartlength?.products? cartlength?.products?.length : 0}</span>
                  </div>
                </div>
                <div
                  tabIndex={0}
                  className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
                  <div className="card-body">
                    <span className="text-lg font-bold">{cartlength?.products?.length} items</span>
                    
                    <div className="card-actions">
                      <Link href={`/addtocart/${session?.data?.user?.id}`}>
                        <button className="btn btn-primary btn-block">View cart</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>}

        </div>}
      </div>

    </>
  )
}

export default Navbar

