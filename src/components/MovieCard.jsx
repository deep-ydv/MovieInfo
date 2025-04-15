import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import UserContext from './Context';

const MovieCard = ({image,title,rating,release,media_id,media_type}) => {
  const {favCollection,setFavCollection,favId,setFavId,watchListCollection,setWatchListCollection,watchId,setWatchId} = useContext(UserContext);
  const { id } = useParams(); 

  const navigate=useNavigate();
  const {details,setDetails}=useContext(UserContext);
  
  const handleFavClick=({image,title,rating,release,media_id,media_type})=>{
    console.log("FavClick",media_id);

    const favData={
      image,
      title,
      rating,
      release,
      media_id,
      media_type,
    }

      if(favId.includes(media_id)){
      
       const updatedData= favCollection.filter((curr)=>curr.media_id!=media_id);
       const updatedFavIds=favId.filter((curr)=>curr!=media_id);
       localStorage.setItem("favCollection",JSON.stringify(updatedData));
       localStorage.setItem("favId",JSON.stringify(updatedFavIds));
       setFavId(updatedFavIds);
       setFavCollection(updatedData);
      
      }
      else {
        
       favCollection.push(favData);
       localStorage.setItem("favCollection",JSON.stringify(favCollection));
     
        setFavId(prevId=> [...prevId,media_id]);
        localStorage.setItem("favId",JSON.stringify([...favId,media_id]));
      
      }
  }

  const handleWatchClick=({image,title,rating,release,media_id,media_type})=>{
    console.log("WatchClick")
  
    const watchData={
      image,
      title,
      rating,
      release,
      media_id,
      media_type,
    }
  

      if(watchId.includes(media_id)){
      
       const updatedData= watchListCollection.filter((curr)=>curr.media_id!=media_id);
       const updatedWatchIds=watchId.filter((curr)=>curr!=media_id);
       setWatchId(updatedWatchIds);
      
       setWatchListCollection(updatedData);
        
      }
      else {
        
       watchListCollection.push(watchData);
       localStorage.setItem("watchList",JSON.stringify(watchListCollection));

        setWatchId(prevId=>[...prevId,media_id]);
        localStorage.setItem("watchId",JSON.stringify([...watchId,media_id]));
  
      }
   
  }
  const API="a6074cbd2fa69a37d41bffd5f926cfde";
  const handleImageClick=async()=>{
    console.log("forDetail",media_id);  
    
    try {
      const res=await fetch(`https://api.themoviedb.org/3/${media_type}/${media_id}?api_key=${API}`);
      const data=await res.json();
      console.log(data);

      const platform=await fetch(`https://api.themoviedb.org/3/${media_type}/${media_id}/watch/providers?api_key=${API}`);
      const platformData=await platform.json();
      // console.log(platformData);
      //  console.log(platformData.results.IN.buy);
      // console.log(platformData.results.IN.flatrate);
      // console.log(platformData.results.IN.rent);

      const cast=await fetch(`https://api.themoviedb.org/3/${media_type}/${media_id}/credits?api_key=${API}`);
      const castData=await cast.json();
      // console.log(castData);

      const review=await fetch(`https://api.themoviedb.org/3/${media_type}/${media_id}/reviews?api_key=${API}`)
      const reviewData=await review.json();
      console.log(reviewData);
      

      if(media_type==="movie"){
      const allDataObj={
        backdrop_path:data.backdrop_path,
        budget:data.budget,
        genres:data.genres,
        title:data.title,
        overview:data.overview,
        poster_path:data.poster_path,
        release_date:data.release_date,
        revenue:data.revenue,
        rating:data.vote_average,
        runtime:data.runtime,
         // Safe access with fallback to empty arrays
        buy: platformData?.results?.IN?.buy || [],
        flatrate: platformData?.results?.IN?.flatrate || [],
        rent: platformData?.results?.IN?.rent || [],

        cast: castData?.cast || [],
        reviews: reviewData || {},
       }

       setDetails(allDataObj);
    }
    else if(media_type==="tv"){
      const allDataObj={
        backdrop_path:data.backdrop_path,
        
        genres:data.genres,
        title:data.name,
        overview:data.overview,
        poster_path:data.poster_path,
        release_date:data.first_air_date,
        number_of_episodes:data.number_of_episodes,
        number_of_seasons:data.number_of_seasons,
        rating:data.vote_average,
        
         // Safe access with fallback to empty arrays
        buy: platformData?.results?.IN?.buy || [],
        flatrate: platformData?.results?.IN?.flatrate || [],
        rent: platformData?.results?.IN?.rent || [],

        cast: castData?.cast || [],
        reviews: reviewData || {},
       }

       setDetails(allDataObj);
    }
      navigate(`/detail/${media_id}`);
    } catch (error) {
      console.log("error in MovieCard ImageClick",error);
    }
    // console.log("Details",media_id);

  }

  useEffect(() => {
  
  }, [])
  

  return (
    <div   className= 'cursor-pointer flex flex-col bg-white  rounded-md overflow-hidden shadow-xl shadow-[#111] transition-transform duration-500 ease-in-out transform hover:scale-102 w-[140px] sm:w-[200px] md:w-[240px]'>
      <div className=''>
       <img onClick={handleImageClick} src={`https://image.tmdb.org/t/p/w500/${image}`} alt="MovieImage" className='w-[140px] h-[160px] p-2 sm:w-[200px] sm:h-[250px] md:w-[240px] md:h-[280px] ' />
      </div>
      <div className='flex flex-col py-1 '>
        <div className='flex justify-between px-2'>
          <p className='font-semibold  text-[10px] sm:text-sm md:text-lg line-clamp-1'>{title}</p>
          <p className='font-bold text-[10px] sm:text-sm'><span className='text-blue-500'>{rating==="N/A"?rating: rating.toFixed(1)}</span>/10</p>
        </div>
        <div className='flex px-2 justify-between  items-center'>
          <p className='text-gray-700 text-[10px]  sm:text-[12px] font-semibold'>{release}</p>
          <div  className='flex w-[50px] h-[30px]  items-center gap-2 px-3 sm:px-0'>
          {/* filled- src="https://icons.iconarchive.com/icons/custom-icon-design/flatastic-2/512/favorite-icon.png"
            unfilled- src="https://static.thenounproject.com/png/3565598-200.png" className='w-[22px] h-[24px] cursor-pointer"
          */}

          <img onClick={()=>handleFavClick({image,title,rating,release,media_id,media_type})} src={favId.includes(media_id)?"https://icons.iconarchive.com/icons/custom-icon-design/flatastic-2/512/favorite-icon.png":"https://static.thenounproject.com/png/3565598-200.png"} className='w-[16px] h-[18px] sm:w-[23px] sm:h-[18px]  md:w-[22px] sm:h-[24px] cursor-pointer' alt="" />

          {/* filled- src="https://cdn4.iconfinder.com/data/icons/core-ui-filled-1/32/filled_bookmark_saved-512.png"  */}
          {/*  unfilled- src="https://cdn.iconscout.com/icon/premium/png-256-thumb/watchlist-3152416-2635575.png?f=webp&w=256" */}
            <img onClick={()=>handleWatchClick({image,title,rating,release,media_id,media_type})} src={watchId.includes(media_id)?"https://cdn4.iconfinder.com/data/icons/core-ui-filled-1/32/filled_bookmark_saved-512.png":"https://cdn.iconscout.com/icon/premium/png-256-thumb/watchlist-3152416-2635575.png?f=webp&w=256"} className='w-[19px] h-[23px]  sm:w-[25px] sm:h-[28px] cursor-pointer' alt="" />
          </div>
        </div>
      </div>

    </div>
  )
}

export default MovieCard