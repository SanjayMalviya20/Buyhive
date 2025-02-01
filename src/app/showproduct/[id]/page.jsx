"use client"
import Catloader from "@/components/Catloader";
import "../../button.css"
import React, { useEffect, useState } from "react";
import StartCom from "@/components/StartCom";
import FeedbackBtn from "@/components/FeedbackBtn";
import StarRatings from "react-star-ratings";
import { useSession } from "next-auth/react";
import ReviewDeletebtn from "@/components/ReviewDeletebtn";
// import Link from "next/link";
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav";
import Image from "next/image";
import discount from "../../../.././public/discount.png"
import truckimg from "../../../.././public/cargo-truck.png"
const Showproduct = ({ params }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { id } = React.use(params)
  const [Star, setStar] = useState(0);
  const [product, setproduct] = useState([]);
  const [Productreview, setPoductreview] = useState([]);
  const [loader, setloader] = useState(true);
  // const [imgLength, setimgLength] = useState("");
  const [Feedback, setFeedback] = useState("");
  const getProduct = async () => {
    setloader(true)
    const data = await fetch(`http://localhost:3000/api/getbyid/${id}`, {
      method: "GET"
    })
    const res = await data.json()
    setproduct(res)
    setloader(false)

  }


  const getAllReview = async () => {
    const data = await fetch(`http://localhost:3000/api/updateproduct/${id}`, {
      method: "GET"
    })
    const res = await data.json()
    // console.log(res)
    setPoductreview(res)
  }
  const handleSubmit = async () => {
    const formdata = new FormData();
    if (Star === 0 || !Feedback) {
      alert("Please give rating and feedback⭐⭐⭐⭐⭐");
      return;
    }
    formdata.append("userid", session.user.id);
    formdata.append("rating", Star);
    formdata.append("feedback", Feedback);
    const data = await fetch(`http://localhost:3000/api/updateproduct/${id}`, {
      method: "PUT",
      body: formdata
    })
    const res = await data.json()
    console.log(res)
    getAllReview()
    setFeedback("");
    setStar(0);
  }

  useEffect(() => {
    getProduct()
    getAllReview()
  }, [id])

  const Addtocart = async (id) => {
    if (!session) {
      alert("Please login first")
      return;
    }
    const formdata = new FormData();
    formdata.append("userid", session?.user?.id);
    const data = await fetch(`http://localhost:3000/api/addtocart/${id}`, {
      method: "POST",
      body: formdata
    })
    const res = await data.json()
    alert(res?.message)
    router.push(`/addtocart/${session?.user?.id}`)
    console.log(res)

  }

  const deleteReview = async (reviewidex) => {
    const data = await fetch(`http://localhost:3000/api/updateproduct/${id}/${reviewidex}`, {
      method: "DELETE"
    })
    const res = await data.json()
    getAllReview()

  }
  return (
    <>
      <Nav />
      {loader ?
        <div className="w-full h-[80vh] bg-white text-black gap-6 flex flex-col items-center justify-center ">
          <Catloader />
        </div> :
        <div className="w-full bg-white text-black gap-6 flex flex-col items-center justify-center ">
          {
            [product?.products]?.map((item) => {
              return (
                <>
                  <div className="flex  justify-evenly w-full  flex-wrap ">
                    <div className="flex flex-col">

                      <div className="carousel rounded-box w-64 mt-3">
                        {
                          item?.image?.map((img) => {
                            return img.split(',').map((i) => (
                              <>

                                <div key={i} className="carousel-item w-full">
                                  <img
                                    src={i}
                                    className="w-full"
                                    alt="Tailwind CSS Carousel component" />

                                </div>

                              </>

                            ))
                          })
                        }

                      </div>
                      <h1 className="text-black text-md font-sans text-center">Swipe right to see all images</h1>
                    </div>

                    <div className="flex flex-col gap-6 mt-3">
                      <div className="flex flex-col gap-3">
                        <h1 className="text-2xl font-bold">{item?.title}</h1>
                        <h1 className="text-2xl font-bold">{item?.category}</h1>
                      </div>
                      <div className="flex gap-3 lg:flex-nowrap flex-col flex-wrap">
                        <div>
                          <h1 className="text-xl font-bold">size</h1>
                        </div>
                        <div className="flex lg:flex-wrap gap-4 flex-wrap ">

                          {
                            item?.size?.map((size) => {
                              return size.split(',').map((s) => (
                                <button key={s} className="btn btn-dark btn-outline text-[black] w-1/2 p-1">
                                  {s.trim()}
                                </button>
                              ))
                            })
                          }
                        </div>
                        <div>

                          <h1 className="text-xl font-bold">color</h1>
                          {
                            item?.color?.map((color) => (
                              <div key={color} className="flex gap-2">
                                {color.split(',').map((shade) => (
                                  <div

                                    style={{ backgroundColor: shade.trim() }}
                                    key={shade.trim()}
                                    className={`w-11 h-11 border rounded-full `}
                                  />
                                ))}
                              </div>
                            ))
                          }
                        </div>
                      </div>
                      <div className="flex items-center gap-9 flex-wrap">
                        {/* <Link href={`/addtocart/${session?.user?.id}`}> */}
                        <button onClick={() => Addtocart(item?._id)} class="cartBtn text-sm ">
                          <svg class="cart" fill="white" viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path></svg>
                          ADD TO CART
                          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512" class="product"><path d="M211.8 0c7.8 0 14.3 5.7 16.7 13.2C240.8 51.9 277.1 80 320 80s79.2-28.1 91.5-66.8C413.9 5.7 420.4 0 428.2 0h12.6c22.5 0 44.2 7.9 61.5 22.3L628.5 127.4c6.6 5.5 10.7 13.5 11.4 22.1s-2.1 17.1-7.8 23.6l-56 64c-11.4 13.1-31.2 14.6-44.6 3.5L480 197.7V448c0 35.3-28.7 64-64 64H224c-35.3 0-64-28.7-64-64V197.7l-51.5 42.9c-13.3 11.1-33.1 9.6-44.6-3.5l-56-64c-5.7-6.5-8.5-15-7.8-23.6s4.8-16.6 11.4-22.1L137.7 22.3C155 7.9 176.7 0 199.2 0h12.6z"></path></svg>
                        </button>
                        {/* </Link> */}
                        <h1 className="text-xl font-bold">Rs {item?.price}</h1>
                      </div>
                      <div className="flex w-full gap-10 shadow-[0_3px_10px_black] p-2">
                        <div className="flex items-start flex-col ">
                          <Image src={discount} width={20} height={20} alt="image" />
                          <h1 className="text-[15px] font-bold">Get 30% off on first order</h1>
                        </div>
                        <div className="flex items-start flex-col">
                          <Image src={truckimg} width={20} height={20} alt="image" />
                          <h1 className="text-[16px] font-bold">Free Delivery</h1>
                        </div>

                      </div>
                    </div>
                  </div>
                  <div className="flex justify-evenly flex-wrap items-cnter w-full p-2 lg:p-0 gap-3">
                    {/* <h1 className="text-2xl font-bold">Description</h1> 
                    <p className="text-lg font-semibold">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, dolores.</p> */}
                    <div className="flex w-[70%] lg:w-1/2 flex-col gap-2 justify-center items-center ">
                      <h1 className="text-xl bg-[#154051] text-white p-2 rounded-full font-bold">Description</h1>
                      {/* <div className="h-[200px] w-full overflow-y-auto rounded-md p-2  bg-[#42748a] ">
                        <p className="lg:text-lg  text-md  text-wrap  font-semibold">{item?.desc}</p>
                      </div> */}
                      <textarea value={item?.desc} name="" cols="30" rows="4" className="textarea textarea-info text-white bg-[#051c24] textarea-bordered textarea-lg w-full max-w-xs readonly" readOnly={true} id=""></textarea>
                    </div>
                    <div className="flex  flex-col gap-2 items-center">
                      <h1 className="text-xl bg-[#154051] text-white  p-2 rounded-full font-bold">Category</h1>
                      <h1 className="text-md font-bold">{item?.category}</h1>
                    </div>
                    <div className="flex  flex-col gap-2 items-center">
                      <h1 className="text-xl bg-[#154051] text-white  p-2 rounded-full font-bold">Style</h1>
                      <h1 className="text-md font-bold">{item?.style}</h1>
                    </div>

                  </div>
                </>
              )

            })
          }



          <div className="flex md:flex-wrap lg:items-baseline md:items-centr items-start flex-wrap lg:flex-nowrap sm:flex-wrap justify-evenly  w-full p-3 bg-white gap-5">
            <div className="flex flex-col gap-5 items-start">
              <h1 className="text-xl font-bold">Give Feedback</h1>
              <StartCom Star={Star} setStar={setStar} />
              <div className="flex flex-col gap-2 items-start">

                <textarea
                  onChange={(e) => setFeedback(e.target.value)}
                  value={Feedback}
                  placeholder="Give Feedback"
                  className="textarea textarea-info text-white bg-[#141b1e] textarea-bordered textarea-lg w-full max-w-xs"></textarea>
                <FeedbackBtn Star={Star} Feedback={Feedback} handleSubmit={handleSubmit} />
              </div>
            </div>
            <div className="lg:w-1/2 md:w-1/2 w-full flex flex-col gap-5 ">
              <h1 className="text-xl font-bold">Reviews</h1>
              {
                Productreview?.products?.map((item, index) => {
                  return (

                    <div key={index} className="flex items-start gap-3 flex-col">
                      <div className="flex items-center gap-8 ">
                        <div className="flex items-center gap-2">

                          <h1 className="text-black font-bold text-xl">{index}</h1>

                          <StarRatings
                            starEmptyColor="gray"
                            rating={item?.rating}
                            starSpacing="5px"
                            starDimension="30px"
                            starRatedColor="black"

                            numberOfStars={5}
                            name='rating'
                          />
                        </div>
                        <div>
                          {session?.user?.id === item?.userid && <button onClick={() => { deleteReview(item?._id) }}><ReviewDeletebtn /></button>}
                        </div>

                      </div>
                      <div className="h-auto">
                        <textarea value={item?.feedback} name="" id="" cols="30" rows="3" className="textarea textarea-info text-whte  bg-[#f8f6f6] textarea-bordered textarea-lg w-full max-w-xs" readOnly></textarea>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      }

    </>
  )
}

export default Showproduct
