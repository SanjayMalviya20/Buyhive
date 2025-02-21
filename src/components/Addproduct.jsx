"use client"
import Color from "@/app/addproduct/Color";
import Size from "@/app/addproduct/Size";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { CldUploadWidget } from 'next-cloudinary';
import React, { useEffect, useRef } from 'react'
import "../app/button.css";
import Image from "next/image";
import Deletebtn from "./Deletebtn";
import { useRouter } from "next/navigation";
import Nav from "./Nav";
const Addproduct = () => {
  const router = useRouter();
  // const isMountedRef = useRef(true); 
  //   useEffect(() => {
  //     return () => {
  //       isMountedRef.current = false;
  //     };
  //   }, [ ]);
    
  
  const { data: session , status} = useSession()
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [ status]);

  const id = session?.user?.id
  const [color, setcolor] = useState([]);
  const [loading, setloading] = useState(false);
  // const [Images, setImages] = useState([])
  const [Imageurl, setImageurl] = useState([])
  const [Product, setProduct] = useState({
    userid: id,
    title: "",
    desc: "",
    category: "Mens",
    style: "",
    price: "0",
    inventory: "0",
    size: []
  });
  const handlechange = (e) => {
    setProduct({ ...Product, [e.target.name]: e.target.value })
  }
  const handleSuccess = (result) => {
    // if (isMountedRef.current) {
    setImageurl((prev) => [...prev, result?.info?.secure_url]);
    // }
  };
  // const handleImages = async (e) => {
  //   const file = e.target.files[0];

  //   if (file) {
  //     setImages((prevImages) => {
  //       // Check if the number of images is already 4
  //       if (prevImages.length >= 4) {
  //         alert("You can only upload up to 4 images.");
  //         return prevImages; // Return the previous state without adding the new image
  //       }

  //       const fileUrl = URL.createObjectURL(file);
  //       return [...prevImages, fileUrl]; // Add the new image URL
  //     });
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!Product.title || !Product.desc || !Product.category || !Product.style || !Product.price || !Product.inventory || !Product.size.length || !color.length) {
      alert("Please fill all the fields");
      return;
    }

    // Check if the number of images is already 4
    if (Imageurl.length > 4) {
      alert("You can only upload up to 4 images.");
      return;
    }
    const formdata = new FormData()
    formdata.append("title", Product.title)
    formdata.append("image", Imageurl)
    formdata.append("userid", Product.userid)
    formdata.append("desc", Product.desc)
    formdata.append("category", Product.category)
    formdata.append("price", Product.price)
    formdata.append("size", Product.size)
    formdata.append("inventory", Product.inventory)
    formdata.append("color", color)
    formdata.append("style", Product.style)

    setloading(true)
    const ProductData = await fetch("api/products", {
      method: "POST",
      body: formdata,
    })

    const data = await ProductData.json()
    setloading(false)
    console.log(data)
    if (data?.success) {
      alert("product create successfull 🛒🤩")
    }
    setProduct({ title: "", desc: "", category: "Mens", style: "", price: "0", inventory: "0", size: [], color: [] })
    setImageurl([])
    setcolor([])
    // console.log(data);
  }

  const handleDelete = (index) => {
    setImageurl((prev) => prev.filter((_, i) => i !== index));
  };
 

  return (
    <>
    <Nav/>
      <div className="flex bg-[#0000004a] lg:bg-[#f2f2f2] items-center justify-around">

        <h1 className="text-xl lg:text-3xl p-5 text-black  font-bold">Add Your Product in <span className="text-blue-600 underline">BuyHive </span>😉</h1>
        <button disabled={loading===true} onClick={handleSubmit} className="batman">
          <span>{loading?"wait...":"Add product"}</span>
        </button>
      </div>
      <div className="w-full  flex  flex-col gap-3 h-auto  bg-white">
        <div className="p-3 flex justify-around  flex-wrap lg:flex-nowrap">
          <div className="flex flex-col ">
            <label htmlFor="title" className="text-black text-xl lg:text-2xl font-sans font-bold">Title</label>
            <input onChange={handlechange} type="text" value={Product.title} id="title" placeholder="Enter title" name="title" className="input bg-white shadow-[0px_1px_10px_black]  rounded-full border text-black ::placeholder:text-green input-bordered w-full max-w-xs" />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="category" className="text-black mb-1 text-xl lg:text-2xl font-sans font-bold">Category</label>
            <select value={Product.category} onChange={handlechange} name="category" className="select w-[14rem] max-w-xs bg-white rounded-full shadow-[0px_1px_10px_black]  text-black">
              <option disabled selected>Choose a category</option>
              <option>Mens</option>
              <option>Womens</option>
              <option>Kids</option>
              <option>Boys</option>
              <option> Girls</option>
            </select>
          </div>
        </div>
        <div className="p-3 flex justify-around flex-wrap lg:flex-nowrap ">
          <div className="flex flex-col   ">
            <label htmlFor="price" className="text-black text-xl lg:text-2xl font-sans font-bold">Price</label>
            <input onChange={handlechange} type="text" value={Product.price} id="price" placeholder="Enter title" name="price" className="input bg-white shadow-[0px_1px_10px_black]  rounded-full border text-black ::placeholder:text-green input-bordered w-full max-w-xs" />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="invetory" className="text-black text-xl lg:text-2xl font-sans font-bold">Inventory</label>
            <input onChange={handlechange} type="text" value={Product.inventory} id="title" placeholder="inventory" name="inventory" className="input bg-white shadow-[0px_1px_10px_black]  rounded-full border text-black ::placeholder:text-green input-bordered w-full max-w-xs" />
          </div>

        </div>
      <div className="p-3 flex w-[95%]  md:ml-[0px]  justify-around items-center gap-6 flex-wrap lg:flex-nowrap ">
          <div className="flex flex-col">
            <label htmlFor="size" className="text-black text-xl ml-[20px] lg:text-2xl font-sans font-bold">Size</label>
            <div className="flex flex-col items-center ml-[-1px]">

              <input onChange={handlechange} type="text" value={Product.size} id="price" placeholder="Enter size" name="size" className="input  bg-white shadow-[0px_1px_10px_black]  rounded-full border text-black ::placeholder:text-green input-bordered w-[70%] lg:w-[65%]   max-w-xs" />
              <Size setProduct={setProduct} />
            </div>

          </div>
          <div className="flex flex-col  justify-center">
            <label htmlFor="desc" className="text-black text-xl lg:text-2xl font-sans font-bold">Description</label>
            <textarea
              value={Product.desc}
              onChange={handlechange}
              name="desc" id="desc"
              placeholder="description"
              className="textarea lg:m-0 mr-[40px]  textarea-bordered bg-white shadow-[0px_1px_10px_black]  text-black textarea-lg w-full max-w-xs"></textarea>
          </div>
        </div>
        <div className="p-3 flex w-[95%] relative   lg:ml-7 justify-around items-center gap-6 lg:gap-14 flex-wrap lg:flex-nowrap md:flex-wrap sm:flex-wrap md:flex-col sm:flex-col lg:flex-row ">
          <Color colorValue={color} setcolor={setcolor} setProduct={setProduct} />
          <div className="flex flex-col ">
            <label htmlFor="style" className="text-black text-xl lg:text-2xl font-sans font-bold">Style</label>
            <input onChange={handlechange} type="text" value={Product.style} id="style" placeholder="Enter style" name="style" className="input bg-white shadow-[0px_1px_10px_black]  rounded-full border text-black ::placeholder:text-green input-bordered w-full max-w-xs" />
          </div>
        </div>
        <div className="p-3  flex w-[95%] relative text-black justify-center   lg:ml-7 lg:justify-around items-center gap-6 lg:gap-10 flex-wrap lg:flex-nowrap md:flex-wrap sm:flex-wrap md:flex-col sm:flex-col lg:flex-col ">
          <h1 className="text-xl font-bold">Select images</h1>
          <div className=" flex justify-center items-center">
            {/* <input ref={imagesRef} onChange={handleImages} hidden type="file" multiple max={"3"} /> */}

            <CldUploadWidget
              // onUpload={(error, result) => {
              //   if (!error && result && result.event === 'success') {
              //     setImageurl(result.info.secure_url);
              //   }
              // }}
              options={
                {
                  maxFiles: 4,
                  multiple: true,
                }
              }

              onSuccess={handleSuccess}
              uploadPreset={process.env.NEXT_PUBLIC_UPLOAD_PRESET}>
              {({ open }) => {
                return (
                  <button className=' btn btn-dark' onClick={() => open()}>
                    Upload an Image
                  </button>
                );
              }}
            </CldUploadWidget>
          </div>
          <div className="flex gap-4 flex-wrap justify-center  items-center">

            {
              Imageurl.map((item, index) => {
                return (
                  <div key={index} className="flex flex-col gap-3 items-center">
                    <Image width={300} height={300} src={item} alt={`Image`} className="w-40 h-40 lg:w-72 lg:h-72 object-cover md:w-72 md:h-72" />
               
                    <Deletebtn handleDelete={handleDelete} index={index} />
                  </div>
                )
              })
            }


          </div>
        </div>
      </div>

    </>
  )
}

export default Addproduct
