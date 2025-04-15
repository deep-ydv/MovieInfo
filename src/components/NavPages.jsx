import { Spinner } from '@material-tailwind/react';
import React, { useContext, useEffect, useState } from 'react'
import UserContext from './Context';
import MovieCard from './MovieCard';

const NavPages = ({category,media_type,name}) => {
const [loading,setLoading]=useState(true);
const {pageNo,setPageNo}=useContext(UserContext);

const [poster, setPoster] = useState([]);
const API = import.meta.env.VITE_API;
var link;
if(category==="trending") link=`https://api.themoviedb.org/3/trending/${media_type}/week?api_key=${API}&language=hi-IN&region=IN&page=${pageNo}`
else link=`https://api.themoviedb.org/3/${media_type}/${category}?api_key=${API}&language=hi-IN&region=IN&page=${pageNo}`
  const fetching=async()=>{
    try {
      const res=await fetch(link);
      const data=await res.json();
      const posterData=data.results
      .filter(p=>p.poster_path!==null)
      .map((p)=>p);
      setPoster(data.results);
      setLoading(false);
      console.log(data);
      
    } catch (error) {
      console.log("error in Nav Pages Fetching",error);
    }
  }
  

  const handleNextPage=()=>{
    setPageNo(prev=>prev+1);
    // window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  const handlePreviousPage=()=>{
    if(pageNo>1)
    setPageNo(prev=>prev-1);
    // window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  useEffect(() => {
    setLoading(true);
    fetching();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [category,pageNo])
  // console.log(poster)
 
  return (
    <>    { loading? (<div className='text-white text-xl h-screen bg-[#111] flex justify-center items-center'>Loading.......</div>) :
    (
    <div className='w-full bg-[#000000]   px-4 flex flex-col  items-center '>    
    <div className='text-white text-3xl my-8 font-bold'>{name}</div>
    <div className='border-white flex  justify-evenly px-4 flex-wrap gap-4'>
      {poster.map((m,idx)=>{
        return ( 
          <div key={idx}>
      
      <MovieCard image={ m.poster_path}  title={media_type==="movie"? m.title : m.name} release={media_type==="movie"? m.release_date : m.first_air_date} rating={m.vote_average? m.vote_average :6.6} media_id={m.id} media_type={media_type} />
      </div>
        )
        })}
        </div>
        <div className='text-white flex justify-between bg-[#111] rounded-lg bordr-white w-[50%] my-8 px-4 py-3'>
          <p className='cursor-pointer font-bold hover:text-gray-300' onClick={handlePreviousPage}>Previous</p>
          <p>{pageNo}</p>
          <p className='cursor-pointer font-bold hover:text-gray-300' onClick={handleNextPage}>Next</p>
        </div>
    </div>
    )
    
      } 
      </>
 

  )
      
}



export default NavPages