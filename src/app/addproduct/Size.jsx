"use client"
import { useState } from "react";
const Size = ({setProduct}) => {
    const [SelectSize, setSelectSize] = useState(
        []
    );
    // console.log(SelectSize)
     const Size =[
        "S",
        "M",
        "L",
        "XL",
        "XXL",
     ]

     const handleChange=(size)=>{
        if(SelectSize.includes(size)){
            setSelectSize(SelectSize.filter((s)=>s!==size));
        }else{
            setSelectSize([...SelectSize,size]);
        }
     }

     const handleSubmit=()=>{
        setProduct((product)=>({...product,size:SelectSize}));
     }


  return (
    <div className="flex flex-wrap items-center" >
      {
        Size.map((size)=>{
            return(
                  <button
                  onClick={()=>handleChange(size)}
                   key={size} className={`btn ${ SelectSize.includes(size) ? "btn-primary" : "btn-outline "} btn-primary  m-2`}>{size}</button>  
            )
        })
      }
      {/* <button className="btn bg-black text-white hover:bg-green-600 rounded-lg p-1" onClick={handleSubmit}>Submit</button> */}
      
<button
onClick={handleSubmit}
 class="btn-1">
  <div class="original">SUBMIT</div>
  <div class="letters">
    <span>S</span>
    <span>I</span>
    <span>Z</span>
    <span>E</span>
   
  </div>
</button>

    </div>
  )
}

export default Size
