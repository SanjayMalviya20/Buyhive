"use client"
import img from "../../public/eximg.png"
import { useEffect, useState } from "react";
import Catloader from "./Catloader";
import Image from "next/image";
import Styleloader from "./Styleloader";
import Nav from "./Nav";

const Manageproducts = () => {
  const [loader, setloader] = useState(false);
  const [ShowProducts, setShowProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      setloader(true);
      const response = await fetch("http://localhost:3000/api/getallproduts");
      const data = await response.json();
      setShowProducts(data);
      setloader(false);

    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  const deleteProduct = async (id) => {
    try {

      await fetch(`http://localhost:3000/api/deleteproducts/${id}`, {
        method: "DELETE",
      });

      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  console.log(ShowProducts)
  return (
    <>
    <Nav/>
      <div className=" flex bg-white h-auto items-center flex-col gap-4 ">
        <h1 className="text-3xl font-bold text-center text-black">Manage Products</h1>
        {
          loader ? <div className="h-[80vh] flex items-center justify-center"><Styleloader /></div> :
            ShowProducts?.products?.map((item, index) => {
              return (

                <div key={index} className="p-4 pt-7 h-auto w-[97%] lg:w-[70%] items-center justify-center rounded-md  shadow-[0px_1px_6px_black] flex   flex-col gap-3 ">
                  <div className="flex  gap-4 items-center justify-center lg:items-baseline lg:justify-normal flex-wrap w-full">
                    {
                      item?.image?.map((img) => {
                        return img.split(',').map((i) => (
                          <Image height={200} width={300} src={i} className="w-[130px] lg:w-[150px]  rounded-md" alt="" />
                        ))
                      }
                      )}


                  </div>
                  <div className="flex gap-4 flex-wrap lg:flex-nowrap items-center justify-center md:flex-nowrap w-full">
                    <div className="flex p-1 gap-4 lg:flex-nowrap lg:justify-normal justify-center items-center flex-wrap w-full">
                      <div className="flex flex-col items-center gap-1">
                        <h1 className="text-lg rounded-md bg-black text-white p-1 font-bold">Product title</h1>
                        <h1 className="text-[18px] text-black">{item?.title}</h1>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <h1 className="text-lg rounded-md bg-black text-white p-1 font-bold">Product Category</h1>
                        <h1 className="text-[18px] text-black">{item?.category}</h1>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <h1 className="text-lg rounded-md bg-black text-white p-1 font-bold">Product price</h1>
                        <h1 className="text-[18px] text-black">{item?.price}</h1>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <h1 className="text-lg rounded-md bg-black text-white p-1 font-bold">Product style</h1>
                        <h1 className="text-[18px] text-black">{item?.style}</h1>
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-1">
                      <button onClick={() => deleteProduct(item?._id)} title="Delete"
                        className="relative border-2 border-black group hover:border-green-500 w-12 h-12 duration-500 overflow-hidden"
                        type="button"
                      >
                        <p
                          className="font-Manrope text-3xl h-full w-full flex items-center justify-center text-black duration-500 relative z-10 group-hover:scale-0"
                        >
                          ×
                        </p>
                        <span
                          className="absolute w-full h-full bg-green-500 rotate-45 group-hover:top-9 duration-500 top-12 left-0"
                        ></span>
                        <span
                          className="absolute w-full h-full bg-green-500 rotate-45 top-0 group-hover:left-9 duration-500 left-12"
                        ></span>
                        <span
                          className="absolute w-full h-full bg-green-500 rotate-45 top-0 group-hover:right-9 duration-500 right-12"
                        ></span>
                        <span
                          className="absolute w-full h-full bg-green-500 rotate-45 group-hover:bottom-9 duration-500 bottom-12 right-0"
                        ></span>
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
        }
      </div>
    </>
  )
}


export default Manageproducts
