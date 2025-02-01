"use cleint"
import "./deletebtn.css"
const Deletebtn = ({handleDelete,index}) => {
  return (

    <button onClick={()=>handleDelete(index)} className="deletebtn">
      <p>delete!</p>
    </button>
    
  )
}

export default Deletebtn
