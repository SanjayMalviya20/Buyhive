"use client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import Image from "next/image"
import Cloudloader from "@/components/Cloudloader"
import Nav from "@/components/Nav"
const page = ({ params }) => {
  const { id } = React.use(params)
  const router = useRouter()
  const [cart, setcart] = useState(null);
  const [loader, setloader] = useState(false);
  const session = useSession()
  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/login")
    }
  }, [session.status])


  const payment = async (productId) => {
 
    try {
      const response = await fetch(`http://localhost:3000/api/payment/?id=${productId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error making payment: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log(data);
        localStorage.setItem("amount", data.metadata.amount);
      localStorage.setItem("orderId", data.metadata.order_id);
      // If the API returns a URL, redirect the user to it
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Error making payment:", error);
    }
  }
  const getAlladdtoCart = async () => {
    setloader(true)
    const data = await fetch(`http://localhost:3000/api/addtocart/${id}`, {
      method: "GET"
    })
    const res = await data.json()
    setcart(res)
    setloader(false)

  }


  const delteCart = async (productid) => {
    const formdata = new FormData();
    formdata.append("userid", id)
    const data = await fetch(`http://localhost:3000/api/addtocart/${productid}`, {
      method: "DELETE",
      body: formdata
    })
    const res = await data.json()
    getAlladdtoCart()
  }

  useEffect(() => {
    getAlladdtoCart()
  }, [id])

  return (
    <>
      <Nav id={id} />
      <div className="h-auto w-full flex  items-center flex-col gap-3 bg-white ">
        <h1 className="text-3xl text-black font-edu font-bold">your add to cart</h1>
        {cart?.products?.length === 0 && <h1 className="text-xl text-black font-edu font-bold">cart is empty 🛒</h1>}
        {
          loader ?
            <div className="flex justify-center items-center h-[83vh]"> <Cloudloader /></div> :
            cart?.products?.map((item) => {

              return (
                <div key={item?._id} className="flex justify-between p-2 items-center shadow-[0px_1px_6px_black] lg:w-[60%] w-[95%] h-[60%]">
                  <div className="flex flex-col ">
                    <h1 className="text-xl text-black font-mono font-bold">product name:{item?.title}</h1>
                    <h1 className="text-xl text-black font-mono font-bold">product price:{item?.price}</h1>
                    <h1 className="text-xl text-black font-mono font-bold">product category:  {item?.category}</h1>
                  </div>
                  <div className="flex flex-col justify-end items-end w-[50%] gap-3">

                    {/* {  <button className="btn-31">
                  <span className="text-container">
                    <span className="text">delete cart</span>
                  </span>
                </button>} */}

                    <button onClick={() => delteCart(item?._id)} class="btn-12"><span>delete cart</span></button>

                    {/* {
                      item?.image?.map((img) => {
                        return img?.split(',').map((i) => (
                          <Image className="w-[40%] rounded-md " src={i} alt="" width={100} height={100} />
                        ))
                      })
                     } */}
                    {
                      item?.image?.map((img, index) => (
                        <Image
                          width={100}
                          height={100}
                          key={index}
                          className="w-[60%] lg:w-[40%] rounded-md"
                          src={img.split(",")[0]}
                          alt=""
                        />
                      ))
                    }


                    <button onClick={() => { payment(item?._id) }} className="Btn text-sm">
                      Pay
                      <svg className="svgIcon" viewBox="0 0 576 512"><path d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"></path></svg>
                    </button>
                  </div>

                </div>
              )
            })
        }



      </div>

    </>
  )
}

export default page
