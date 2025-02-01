"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import Nav from "./Nav";

const ShowAllproducts = () => {
  const [ShowProducts, setShowProducts] = useState([]);
  const [search, setsearch] = useState("");
  // const [MenCategory, setMenCategory] = useState("Mens");
  // const [WomanCategory, setWomanCategory] = useState("");
  // const [BoyCategory, setBoyCategory] = useState("");
  // const [GirlCategory, setGirlCategory] = useState("");
  const [loader, setloader] = useState(true);
  const fetchProducts = async () => {
    try {
      setloader(true);
      const response = await fetch("http://localhost:3000/api/getallproduts");
      const data = await response.json();
      setShowProducts(data);
      setloader(false);
      // console.log(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
    <Nav setsearch={setsearch}/>
      {
        loader ?

          <div className="flex bg-white justify-center items-center h-[89%]"> <Loader /></div> :
          <>
            <div className="flex  bg-white items-center mt-3  p-2 justify-center  lg:justify-normal  md:justify-center gap-8 flex-wrap">
              {
                ShowProducts?.products?.filter((product) => product.title?.toLowerCase().includes(search.toLowerCase()))?.map((allproducts, index) => {
                  return (
                    <div key={index} className="card  hover:shadow-[0px_1px_12px_black] cursor-pointer card-compact bg-base-100 w-72 shadow-xl">
                      <figure >
                        {/* <img
    src={allproducts?.image?.split(",")[0]}
    alt="Shoes" className="w-full h-64 object-cover"/> */
                          allproducts?.image?.map((image, index) => {
                            return <img key={index} className="w-full h-64 object-cover" src={image?.split(",")[0]} alt="" />
                          })
                        }

                      </figure>
                      <div className="card-body  text-black bg-[#d4d4d4]">
                        <h2 className="card-title ">{allproducts?.title}</h2>
                        <p className="font-bold flex items-center">category: {allproducts?.category}</p>
                        <p>{allproducts?.desc}</p>
                        <div className=" flex items-center justify-between w-full ">
                          <Link href={`/showproduct/${allproducts?._id}`}>
                            {/* <button className="btn btn-dark p-1 ">View Details</button> */}

                            <button
                              type="submit"
                              className="flex justify-center gap-2 items-center mx-auto shadow-xl text-md bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-black  hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10  py-1 px-2 overflow-hidden border-2 rounded-full group"
                            >
                              View details
                              <svg
                                className="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45"
                                viewBox="0 0 16 19"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                                  className="fill-gray-800 group-hover:fill-gray-800"
                                ></path>
                              </svg>
                            </button>
                          </Link>
                          <h1 className="font-bold text-black text-2xl">Rs {allproducts?.price}</h1>
                        </div>
                      </div>
                    </div>

                  )
                })
              }

            </div>
          </>
      }


    </>
  )
}

export default ShowAllproducts
