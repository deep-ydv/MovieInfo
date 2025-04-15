import React, { useContext } from 'react'
import UserContext from './Context'
import MovieCard from './MovieCard'

const Favorite = () => {
  const {favCollection} = useContext(UserContext);
 
  
  return (
    <div className={`flex flex-col w-full min-h-screen  items-center  py-4 gap-8 px-4 bg-[#111]`}>    
      <div className='text-center text-white text-xl'>Favorites</div>

    <div className='w-full flex gap-4  flex-wrap justify-center items-center '>
    {favCollection.map((curr,idx)=>{
      // console.log(curr);
      return <MovieCard key={idx} image={curr.image} media_type={curr.media_type}  title={curr.title}  rating={curr.rating}  release={curr.release} media_id={curr.media_id}/>
    })}
    </div>
  
    </div>


  )
}

export default Favorite