"use client"
import React, { useState } from 'react';
import ColorPicker from 'react-pick-color';

const Color = ({ setProduct, colorValue ,setcolor}) => {
  const [color, setColor] = useState('#fff');
  const [close, setclose] = useState(false);
  // const [Seleccolros, setSeleccolros] = useState([]);
  // console.log(color.hex);
  if (color.length < 0) {
    setColor('#fff')
  }

  const handeSubmit = () => {
    setcolor([...colorValue, color.hex])
  }
// console.log(colorValue);

  return (
    <>
      <div className='flex flex-col lg:gap-3 gap-5'>
        {close &&
          <div style={{ height: "50px", width: "40px" }} className='absolute top-[-290px] z-10 md:top-[-150px] sm:top-[-200px] lg:top-[-300px] left-9 '>
            <ColorPicker

              onChange={(color) => {
                setColor(color)

              }
              } />
          </div>}

        <div className='flex justify-around gap-14 lg:w-auto '>
          {/* <button className='text-white  bg-black btn hover:bg-blue-800 p-1 rounded-full '> choose color</button> */}
 
{/* <button  class="button">
  <span>choose color</span>
</button> */}
<button  onClick={() => setclose(!close)} type="button" class="colorbtn">
  <strong>choose color</strong>
  <div id="container-stars">
    <div id="stars"></div>
  </div>

  <div id="glow">
    <div class="circle"></div>
    <div class="circle"></div>
  </div>
</button>

       
<button
          disabled={colorValue?.includes(color.hex)}
          onClick={handeSubmit}
        
  title="Add New"
  class="group cursor-pointer outline-none hover:rotate-90 duration-300"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="50px"
    height="50px"
    viewBox="0 0 24 24"
    class="stroke-slate-400 fill-none group-hover:fill-slate-800 group-active:stroke-slate-200 group-active:fill-slate-600 group-active:duration-0 duration-300"
  >
    <path
      d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
      stroke-width="1.5"
    ></path>
    <path d="M8 12H16" stroke-width="1.5"></path>
    <path d="M12 16V8" stroke-width="1.5"></path>
  </svg>
</button>


    
        </div>
        <div style={{ scrollBehavior: "smooth", scrollbarWidth: "none" }} className={`overflow-auto h-[90px] flex flex-col gap-3 ${colorValue?.length > 0 ? "" : "hidden"}`}>
          {
            colorValue?.map((color, index) => {
              return (

                <div key={index} className='flex justify-around gap-14 ml-3 lg:w-auto '>
                  <div style={{ backgroundColor: color }} className={`rounded-full w-[30px] h-[30px] `}></div>
                  <h1 className='text-black'>{color}</h1>
                  <button
                    onClick={() => setcolor(colorValue.filter((c,i) => i !== index))}
                    className='text-black text-md font-bold '>
                    delete
                  </button>
                


                </div>
              )
            })
          }


        </div>
      </div>
    </>
  )
};

export default Color;