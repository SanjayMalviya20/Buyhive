"use client"
import StarRatings from "react-star-ratings";
const StartCom = ({Star,setStar}) => {
   
    const ratingChanged = (newRating) => {
        setStar(newRating);
      };
       
    console.log(Star)
    return (
        <>

            <StarRatings
            starHoverColor="purple"
            
                starEmptyColor="gray"
                rating={Star}
                starSpacing="5px"
                starDimension="30px"
                starRatedColor="black"
                changeRating={ratingChanged}
                numberOfStars={5}
                name='rating'
            />

        </>
    )
}

export default StartCom
