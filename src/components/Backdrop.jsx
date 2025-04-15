import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "./Context";

const Backdrop = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCast, setCurrentCast] = useState([]);
  const [nowPlayingTrailers, setNowPlayingTrailers] = useState([]);


  const API = import.meta.env.VITE_API;

  const movieIds=[1257960,1147546,1370264,627336,1120762,1198208,927342,1062715,912649,1143407];
  // const movieIds = [
  //   950387, 1233575, 447273, 696506, 823219,
  //   549509, 1257960, 661539, 627336, 870360,
  //   1198208, 1120762, 1359490, 1147546, 1259024,
  //   1103756, 1370264, 1062715, 1226572, 1424217,
  // ];

  const fetchMovieData = async () => {
    const movieData = [];
    const allTrailers=[];
    for (let i = 0; i < movieIds.length; i++) {
      const creditEndpoint = `https://api.themoviedb.org/3/movie/${movieIds[i]}/credits?api_key=${API}`;
      const movieEndpoint = `https://api.themoviedb.org/3/movie/${movieIds[i]}?api_key=${API}`;
      const trailerEndpoint=`https://api.themoviedb.org/3/movie/${movieIds[i]}/videos?api_key=${API}`

      try {
        const movieRes = await fetch(movieEndpoint);
        const creditRes = await fetch(creditEndpoint);
        const trailerRes= await fetch(trailerEndpoint);

        const movieDataResult = await movieRes.json();
        // console.log(movieDataResult)
        const creditDataResult = await creditRes.json();

       const trailerDataResult= await trailerRes.json();
       const trailers = trailerDataResult.results.filter(video =>
        video.type === "Trailer" && video.site === "YouTube"
      );
      if (trailers.length > 0) {
        const youtubeKey = trailers[0].key;
        const fullUrl = `https://www.youtube.com/watch?v=${youtubeKey}`;
        // console.log(fullUrl);
        allTrailers.push(fullUrl);
        // console.log("Trailer:", fullUrl);
      }
      else{
        allTrailers.push("Not Available");
        // console.log("Not Available");
      }
      //  console.log(trailers);

        const cast = creditDataResult.cast.slice(0, 5).map((c) => ({
          name: c.name,
          profile_path: c.profile_path,
        }));

        movieData.push({
          title: movieDataResult.title,
          poster_path: movieDataResult.poster_path,
          rating:movieDataResult.vote_average.toFixed(1),
          genres:[movieDataResult.genres],
          cast: cast,
        });
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    }
    // console.log(allTrailers.length)
    setMovies(movieData);
    setNowPlayingTrailers(allTrailers);
  };
  

  useEffect(() => {
    fetchMovieData();
  }, []);

  useEffect(() => {
    if (movies.length === 0) return;

    setCurrentCast(movies[0].cast); // ✅ Set cast for first movie
    setLoading(false); // ✅ Done loading

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % movies.length;
        setCurrentCast(movies[newIndex].cast);
        return newIndex;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [movies]);

  // console.log(movies[0].genres[0][0].name);
  // console.log(nowPlayingTrailers);
  const handleTrailerClick=(currentIndex)=>{
    // console.log(nowPlayingTrailers[idx]);
    // console.log(currentIndex);
    // console.log(nowPlayingTrailers[currentIndex]);
      if(nowPlayingTrailers[currentIndex]!=="Not Available"){
        const url=nowPlayingTrailers[currentIndex];
        window.open(url,'_blank');
      }
      // else{
      //   alert("Trailer Not Available")
      // }
  }

  const navigate=useNavigate();
  const {setDetails}=useContext(UserContext);
  const media_id=movieIds[currentIndex];
  const handleMoreDetails=async()=>{
    // console.log("forDetail",media_id);  
    
    try {
      const res=await fetch(`https://api.themoviedb.org/3/movie/${media_id}?api_key=${API}`);
      const data=await res.json();
      console.log(data);

      const platform=await fetch(`https://api.themoviedb.org/3/movie/${media_id}/watch/providers?api_key=${API}`);
      const platformData=await platform.json();
      // console.log(platformData);
      //  console.log(platformData.results.IN.buy);
      // console.log(platformData.results.IN.flatrate);
      // console.log(platformData.results.IN.rent);

      const cast=await fetch(`https://api.themoviedb.org/3/movie/${media_id}/credits?api_key=${API}`);
      const castData=await cast.json();
      // console.log(castData);

      const review=await fetch(`https://api.themoviedb.org/3/movie/${media_id}/reviews?api_key=${API}`)
      const reviewData=await review.json();
      // console.log(reviewData);
      

      
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
      // console.log(allDataObj);
      navigate("/detail");
    }
    catch(error){
      console.log("Error in BackDrop MoreDetails",error);
    }
  }


  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <div className="border-1 flex w-[320px] gap-1 px-2 py-2 bg-[#111] rounded-xl  sm:w-[80%] sm:px-6 sm:py-6 lg:w-[85%] lg:h-[400px] xl:w-[65%]">
      {/* lg: w-[35%] bg-[#111122] py-2 px-2  h-[100%]   flex justify-end */}
      <div className="w-[35%] sm:w-[45%]">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movies[currentIndex].poster_path}`}
          className="w-[95%] h-[160px] rounded-xl sm:h-[250px] lg:h-[350px]"
          alt=""
        />
      </div>
      {/* hidden lg:w-[65%] border-1 bg-[#111122] h-[100%]  px-8  flex flex-col gap-2 */}
      <div className="w-[65%] overflow-hidden sm:ml-4">
        <p className="text-white text-[16px] font-bold line-clamp-1 sm:text-[25px] lg:text-[40px]">Now Playing</p>
        <p className="text-yellow-400 text-[14px] line-clamp-1 sm:text-[22px] lg:text-[30px]">
          {movies[currentIndex].title}
        </p>
        <p className="text-white text-[10px] line-clamp-1 sm:text-[18px] lg:text-[22px] lg:mb-3 lg:mt-2">Rating: {movies[currentIndex].rating}⭐</p>
        <p className="flex text-white gap-1 mb-2 text-[10px] sm:text-[14px]">Genre:
        {movies[currentIndex].genres[0].map((g,idx)=>{
          return <span key={idx} className="text-yellow-300 line-clamp-1">{`${g.name} |`}</span>
        })}
        </p>
        <div className="flex gap-2">
          {currentCast.map((c, index) => (
            <img
              key={index}
              className="rounded-md w-[30px] h-[40px] object-cover sm:w-[55px] sm:h-[65px] lg:w-[75px] lg:h-[85px] lg:mt-2"
              src={
                c.profile_path
                  ? `https://image.tmdb.org/t/p/w200${c.profile_path}`
                  : "https://via.placeholder.com/50x60?text=?"
              }
              alt={c.name}
            />
          ))}
        </div>

        <div className="flex text-gray-400 gap-2  text-[8px] sm:text-[10px]">
          {currentCast.map((c, i) => (
            <p key={i} className="w-[30px] line-clamp-1 sm:w-[55px] lg:w-[75px]">{c.name}</p>
          ))}
        </div>

        <div className="flex gap-1 mt-2 lg:mt-4 ">
          {/*  rounded-md px-4 py-2 text-white border-none bg-black*/}
          <button onClick={handleMoreDetails} className="text-white w-[60px] cursor-pointer h-[17px] text-[8px] bg-gray-900  rounded-xl line-clamp-1 sm:w-[80px] sm:h-[20px] sm:text-[10px] lg:w-[120px] lg:h-[32px] lg:text-[14px]  hover:bg-gray-800">
            More Details
          </button>
          {/* rounded-md px-4 py-2 text-white border-none bg-blue-900 */}
          {/* <button className="text-white w-[45px] h-[16px] text-[8px] bg-blue-900 rounded-xl line-clamp-1 sm:w-[80px] sm:h-[20px] sm:text-[10px] lg:w-[100px] lg:h-[28px] lg:text-[14px]">
            View All
          </button> */}
          <button onClick={()=>handleTrailerClick(currentIndex)} className="text-white cursor-pointer  w-[75px] h-[16px] text-[8px] bg-gray-900 rounded-xl line-clamp-1 sm:w-[80px] sm:h-[20px] sm:text-[10px] lg:w-[150px] lg:h-[32px] lg:text-[14px] hover:bg-gray-800">Watch Trailer🎞️</button>
        </div>
      </div>
    </div>
  );
};

export default Backdrop;
