import React from 'react'
import Backdrop from '../components/Backdrop'
import HomeCategories from '../components/HomeCategories'
import {Footer} from '../components/Footer'
import { useContext } from 'react'
import UserContext from '../components/Context'
import { Spinner } from '@material-tailwind/react'
import AboutSection from '../components/About'
import FeatureCard from '../components/Feature'



const Home = () => {
 
  const {homeLoading}=useContext(UserContext);

  if(homeLoading) return <div className='w-full min-h-screen flex justify-center items-center text-white bg-[#000000]'>Loading....</div>
  return (
    <div className='w-full px-2 h-full   border-red-300  gap-8  sm: lg:h-full w-full px-8 py-8  flex flex-col items-center justify-center bg-[#000000] '>
    
    <Backdrop/>


    <HomeCategories category="top_rated" navi="/top-rated-movies" name="Top Rated Movies" media_type="movie"/>
    <HomeCategories category="trending" navi="/trending-movies" name="Trending Movies"  media_type="movie"/>
    {/* <HomeCategories category="upcoming" navi="/upcoming-movies"  name="Upcoming Movies" media_type="movie"/> */}
    <FeatureCard/>
    <HomeCategories category="top_rated" navi="/top-rated-shows" name="Top Rated Series" media_type="tv"/>
    <HomeCategories category="trending" navi="/trending-shows" name="Popular Series" media_type="tv"/>
    {/* <TopRatedMovies category="upcoming" name="Upcoming TV Shows" media_type="tv"/> */}
    {/* <Footer/> */}
    <AboutSection/>
    </div>
  )
}

export default Home