import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [moviePoster, setMoviePoster] = useState([]);
  const [title, setTitle] = useState("");
  const [isTVShows, setIsTVShows] = useState(false);
  const [isMovies, setIsMovies] = useState(true);
  const [page, setPage] = useState(1);
  const [pageLength,setPageLength]=useState(1);
  

  //587412
  const API = import.meta.env.VITE_API;

  const fetching = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/${
          isMovies ? "movie" : "tv"
        }?query=${title}&page=${page}&api_key=${API}`
      );
      const data = await res.json();
      // const detail=await fetch(`https://api.themoviedb.org/3/movie/587412?api_key=${API}&language=hi-IN`);
      // const det=await detail.json();
      // console.log(data);
      // console.log(data);
      // Method to remove NUll Data----------------
      const posterData = data.results
        .filter((p) => p.poster_path !== null)
        .map((p) => p);
       
      setMoviePoster(posterData);
      setPageLength(data.total_pages);
      // console.log(moviePoster);
    } catch (error) {
      console.log("Error in fetchin search endpoint", error);
    }
  };

  const handleOption = (val) => {
    setTitle("");
    if (val === "tv" && !isTVShows) {
      setIsTVShows(true);
      setIsMovies(false);
    }
    if (val === "movie" && !isMovies) {
      setIsMovies(true);
      setIsTVShows(false);
    }
  };
  const handleSearchClick = (e) => {
    e.preventDefault();
    setTitle(searchText);
    setPage(1);
  };


  const handlePreviousPage=()=>{
    if(page>1) setPage(prev=>prev-1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // console.log("prevvious");
  }
  const handleNextPage=()=>{
      if(page<pageLength) setPage(prev=>prev+1);
    // console.log("Next");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  useEffect(() => {
    fetching();
  }, [title, page]);

  return (
    <div
      className={`w-full min-h-screen flex flex-col items-center pt-10 bg-[#000000]`}
    >
      <div className="h-[220px] w-[90%]  sm:h-[300px] md:h-[400px]  rounded-3xl shadow-sm shadow-gray-900  bg-cover bg-center  bg-[#111] " style={{backgroundImage:'url("https://wallpapers.com/images/hd/dark-nature-1920-x-1080-background-lqtolhf1sfr3ve5s.jpg")'}}>
        <div className="w-full h-full  flex flex-col items-center justify-center rounded-3xl ">
          <p className="text-white text-[20px] w-[70%]  sm:text-[35px] md:text-[40px] xl:text-[60px] text-center mb-2 font-bold sm:w-[60%]">
            Discover Unlimited movies, and TV shows
          </p>
          <div className="flex gap-2 mt-2 mb-4 sm:my-6">
            <button
              onClick={(e) => handleOption(e.target.value)}
              value="tv"
              className={
                isTVShows
                  ? "w-[90px] text-sm font-semibold sm:w-[110px]  px-3 py-1 rounded-xl bg-[#2B7FFF] text-white cursor-pointer sm:font-bold"
                  : "w-[90px] sm:w-[100px]  px-2 py-1 rounded-xl bg-[#111] text-white cursor-pointer font-semibold"
              }
            >
              TV Shows
            </button>
            <button
              onClick={(e) => handleOption(e.target.value)}
              value="movie"
              className={
                isMovies
                  ? "w-[90px] text-sm font-semibold sm:w-[110px]  px-3 py-1 rounded-xl bg-[#2B7FFF] text-white cursor-pointer sm:font-bold"
                  : "w-[90px] sm:w-[100px] px-2 py-1 rounded-xl bg-[#111] text-white cursor-pointer font-semibold"
              }
            >
              Movies
            </button>
          </div>

          <form
            className={
              isMovies || isTVShows ? "w-full flex justify-center " : "hidden"
            }
          >
            <input
              type="text"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
              className=" w-[50%] px-2 py-1  sm:w-[45%] sm:px-4 sm:py-2 rounded-tl-xl rounded-bl-xl border-white  bg-white"
              placeholder={
                isMovies ? "Explore Movies...." : "Explore TV shows...."
              }
            />
            <button
              type="submit"
              className="bg-[#2B7FFF] px-8 text-white rounded-tr-xl rounded-br-xl font-semibold text-lg"
              onClick={handleSearchClick}
            >
              Search
            </button>
          </form>
        </div>
      </div>

      <div className={isMovies || isTVShows ? "w-full sm:px-20 py-10" : "hidden"}>
        <div className="flex  flex-wrap justify-center w-full gap-4">
          {/* { moviePoster.map((m,idx)=>{
          return <img src={`https://image.tmdb.org/t/p/w500/${m}`} className="w-[200px]" key={idx} alt="Not Avialable" />
        })} */}
          {moviePoster.map((m, idx) => {
            return (
              <MovieCard
                key={idx}
                image={m.poster_path}
                title={isMovies ? m.title : m.name}
                release={isMovies ? m.release_date : m.first_air_date}
                rating={m.vote_average ? m.vote_average : 6.6}
                media_id={m.id}
                media_type={isMovies?"movie":"tv"}
              />
            );
          })}
        </div>
      </div>
      <div className={moviePoster.length>0?"text-white flex justify-between bg-[#111] rounded-lg bordr-white w-[50%] my-8 px-4 py-3 ": "hidden"}>
          <p className='cursor-pointer font-bold hover:text-gray-300' onClick={handlePreviousPage}>Previous</p>
          <p>{page}</p>
          <p className='cursor-pointer font-bold hover:text-gray-300' onClick={handleNextPage}>Next</p>
        </div>
    </div>
  );
};

export default Search;
