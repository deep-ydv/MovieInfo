import { Flame, TrendingUp } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import MovieCard from './MovieCard';
import About from './About';


const HomeCategories = ({category,name,media_type,navi}) => {
  
  const [trmData, setTrmData] = useState([]);

  const navigate=useNavigate();
  
  const API=import.meta.env.VITE_API
    
    var link;
  
    if(category==="trending"){
       link=`https://api.themoviedb.org/3/trending/${media_type}/week?api_key=${API}&language=hi-IN&region=IN`
     }
    else {
      if(media_type==="movie" || (media_type==="tv" && category==="top_rated")){
       link=`https://api.themoviedb.org/3/${media_type}/${category}?api_key=${API}`
       
      }
      else {
        link=`https://api.themoviedb.org/3/discover/tv?api_key=${API}&language=hi-IN&region=IN&sort_by=first_air_date.asc&first_air_date.gte=2025-04-08`
      }
    }
  
 
  
  const fetching=async()=>{
   try {
      const res=await fetch(link);
      const data=await res.json();
      // const arr=data.results.map((d)=>d.poster_path);
      setTrmData(data.results);
      // console.log(data.results);
   } catch (error) {
    console.log("Error in fetching movies categories",error);
   }
    
  }
  useEffect(() => {
    fetching();
  }, [])

  
  
//  console.log(trmData);

  const topRatedScroll=useRef(null);
  const scrollLeft = () => {
    // console.log("working",topRatedScroll)

    if (topRatedScroll.current) {
      // console.log("inside");
      // Scroll left by a specific amount (e.g., 300px)
      topRatedScroll.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };
  
  const scrollRight = () => {
    console.log("first")
    if (topRatedScroll.current) {
    // console.log("first")

      // Scroll right by a specific amount (e.g., 300px)
      topRatedScroll.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };
  // console.log(trmData);

  return (
   
    <div className='border-red-300  w-full mb-0 md:mb-8' >
      <div className='w-full bg-[#111] flex justify-between px-4 py-2 rounded-lg my-4'>
      <p className='text-sm sm:text-lg text-white  font-bold lg:text-xl justify-center items-center flex gap-2'>{name}{name==="Top Rated Movies" || name==="Top Rated Series"?<Flame />:<TrendingUp/>}</p>
      <p onClick={()=>navigate(`${navi}`)} className='px-4 cursor-pointer font-semibold text-[16px] text-gray-400'>See More</p>
      </div>
      <div className='border-green-400  flex gap-4 md:gap-8 overflow-y-hidden scrollbar-hide overflow-x-auto '>
      {trmData.map((m,idx)=>{
        return ( 
          <div className='flex-shrink-0'  key={idx}>
      
      <MovieCard image={ m.poster_path} media_type={media_type}  media_id={m.id} title={media_type==="movie"? m.original_title : m.name} release={media_type==="movie"? m.release_date : m.first_air_date} rating={m.vote_average? m.vote_average :6.6} />
      </div>
        )
        })}
        </div>
        
        
    </div>
  )
}

export default HomeCategories


 // <div  className='relative w-[100%] h-[280px] border-2 border-white  mt-12  flex flex-col gap-1   sm:h-[240px] md:h-[280px] lg:h-[300px] '>
    //   <p className='text-[16px] text-white font-bold sm:text-[19px] md:text-[22px] lg:text-[25px]'>{name}</p>
    //   <button  className='z-1 opacity-[30%] bg-white rounded-[50%] absolute w-[15px] text-[10px] lg:w-[30px] lg:text-[15px] top-[50%] left-0' onClick={scrollLeft}>←</button>
    //   <div ref={topRatedScroll} className='w-full h-full  border-2 flex gap-4 overflow-x-auto scrollbar-hide '>
        
    //     {trmData.map((m,idx)=>{
    //       return ( 

    //         <MovieCard image={m.poster_path} title={m.title} release={m.release_date} rating={m.vote_average} key={idx}/>
        
    //       )
    //     })}
       
    //   </div>
    //   <button  className='z-1 opacity-[30%] bg-white rounded-[50%] absolute w-[15px] text-[10px] lg:w-[30px] lg:text-[15px] top-[50%] right-0' onClick={scrollRight}>→</button>
    // </div>