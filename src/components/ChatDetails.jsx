import React, { useContext, useEffect, useRef, useState } from "react";
import UserContext from "./Context";
import { motion } from "framer-motion";
import { Clock, CalendarDays, DollarSign, Star,Library,Film,ArrowLeft} from "lucide-react";
import { useNavigate } from "react-router-dom";


const ChatDetails = () => {

  const navigate =useNavigate();

  const { details } = useContext(UserContext);
  const movie = details;
  const [currentIndex, setCurrentIndex] = useState(0);
const carouselRef = useRef(null);
const reviews = movie.reviews.results.slice(0, 10);

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  }, 5000); // 5 sec auto-slide

  return () => clearInterval(interval);
}, [reviews.length]);
useEffect(() => {
window.scrollTo({top:0,behavior:'smooth'});
}, [])

  return (
    <div className="w-full min-h-screen px-8 bg-black text-white relative overflow-hidden">

      <div onClick={()=>navigate("/")} className="absolute top-4 z-50  opacity-[50%] cursor-pointer rounded-[50%] px-2 py-2 bg-gray-800"> <ArrowLeft className="cursor-pointer" /></div>

      {/* Backdrop as absolute background */}
      <div
        className="absolute top-0 left-0 w-full h-[450px] bg-cover bg-center blur-sm brightness-50"
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`, zIndex: 0,}}
      ></div>

      {/* Main Content Layer */}
      <div className="relative z-10 flex flex-col items-center md:flex-row px-6 pt-[200px] pb-12 gap-10">
  {/* Poster */}
  
  <motion.img
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6 }}
    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
    alt="Poster"
    className="w-[220px] rounded-2xl shadow-2xl"
  />
 
  

  {/* Movie Info */}
  <motion.div
    initial={{ y: 40, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.3, duration: 0.6 }}
    className="max-w-2xl space-y-4"
  >
    <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide">{movie.title}</h1>
    <p className="text-gray-300 text-base md:text-lg leading-relaxed">
      {movie.overview}
    </p>

    {/* Genres */}
    <div className="flex flex-wrap gap-3 mt-4">
      {movie.genres.map((g, i) => (
        <span
          key={i}
          className="bg-white/10 border border-white/20 text-sm px-3 py-1 rounded-full backdrop-blur-md text-white hover:bg-white/20 transition"
        >
          {g.name}
        </span>
      ))}
    </div>

    {/* Details with Icons */}
    <div className="text-sm text-gray-400 space-y-1 mt-6">
      <p className="flex items-center gap-2">
        <CalendarDays size={16} /> Release Date: {movie.release_date}
      </p>
      {movie.runtime && (
      <p className="flex items-center gap-2">
        <Clock size={16} /> Runtime: {movie.runtime} mins
      </p>
      )}
      
      <p className="flex items-center gap-2">
        <Star size={16} className="text-yellow-400" /> Rating: {movie.rating.toFixed(1)}
      </p>
      {movie.budget && (
      <p className="flex items-center gap-2">
        <DollarSign size={16} /> Budget: ₹{movie.budget.toLocaleString()}
      </p>
      )}
      {movie.revenue && (
      <p className="flex items-center gap-2">
        <DollarSign size={16} /> Revenue: ₹{movie.revenue.toLocaleString()}
      </p>
      )}
       {movie.number_of_episodes && (
      <p className="flex items-center gap-2">
        <Film size={16} /> Number Of Episodes: {movie.number_of_episodes}
      </p>
      )}
       {movie.number_of_seasons && (
      <p className="flex items-center gap-2">
        <Library size={16} /> Number of Seasons: {movie.number_of_seasons}
      </p>
      )}
    </div>
  </motion.div>
</div>

  


      {/* Cast */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Top Cast</h2>
        <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-2">
          {movie.cast.slice(0, 10).map((actor, idx) => (
            <motion.div
              key={idx}
              className="min-w-[120px] text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <div className="w-[100px] h-[120px] bg-gray-700 overflow-hidden rounded mb-1">
                <img
                  className="w-full h-full object-cover"
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                      : "https://via.placeholder.com/100x120?text=No+Image"
                  }
                  alt={actor.name}
                />
              </div>
              <p className="text-sm font-medium text-white  w-[100px] line-clamp-1">{actor.name}</p>
              <p className="text-xs text-gray-400 w-[100px] line-clamp-1">{actor.character}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-8">
  <h2 className="text-2xl font-bold mb-4">Top Reviews</h2>
  {movie.reviews.results.length > 0 ? (
    <div className="overflow-hidden relative">
      <div
        ref={carouselRef}
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {movie.reviews.results.slice(0, 10).map((review, idx) => (
          <div
            key={idx}
            className="min-w-full px-4 py-6 bg-[#111] rounded-xl shadow-md"
          >
            <h3 className="font-semibold text-lg mb-2">{review.author}</h3>
            <p className="text-sm text-gray-300 line-clamp-6">{review.content}</p>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <p className="text-sm text-gray-400">No reviews available.</p>
  )}
</div>

      {/* Watch Platforms */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {movie.buy.length>0 && (
        <div>
          <h3 className="font-semibold mb-2 text-lg">Available to Buy</h3>
          <ul className="text-sm text-gray-300 flex flex-col gap-2">
            {movie.buy.map((item, idx) => (
              <li key={idx} className="flex gap-2"><img src={`https://image.tmdb.org/t/p/w500${item.logo_path}`} className="w-6 rounded-lg" alt="" />   {item.provider_name}</li>
            ))}
          </ul>
        </div>
        )}
        {movie.rent.length>0 && (
        <div>
          <h3 className="font-semibold mb-2 text-lg">Available to Rent</h3>
          <ul className="text-sm text-gray-300 flex flex-col gap-2">
            {movie.rent.map((item, idx) => (
              <li key={idx} className="flex gap-2"><img src={`https://image.tmdb.org/t/p/w500${item.logo_path}`} className="w-6 rounded-lg" alt="" />  {item.provider_name}</li>
            ))}
          </ul>
        </div>
        )}
        {movie.flatrate.length>0 && (
          <div>
            <h3 className="font-semibold mb-2 text-lg">Streaming</h3>
            <ul className="text-sm text-gray-300 flex flex-col gap-2">
              {movie.flatrate.map((item, idx) => (
                <li key={idx} className="flex gap-2"><img src={`https://image.tmdb.org/t/p/w500${item.logo_path}`} className="w-6 rounded-lg" alt="" /> {item.provider_name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatDetails;
