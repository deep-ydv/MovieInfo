import { Link } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import Loader from './Loader';

const Backdrop = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCast, setCurrentCast] = useState([]);
  const [nowPlayingTrailers, setNowPlayingTrailers] = useState([]);

  const API = import.meta.env.VITE_API;

  const fetchMovieData = async () => {
    try {
      const nowPlayingURL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API}&region=IN`;
      const res = await fetch(nowPlayingURL);
      const data = await res.json();
      const results = data.results.slice(0, 10); // Get first 10 movies

      const allMovieData = [];
      const allTrailers = [];

      for (let movie of results) {
        const movieId = movie.id;
        const [movieRes, creditRes, trailerRes] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API}`),
          fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API}`),
          fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API}`)
        ]);

        const movieDataResult = await movieRes.json();
        const creditDataResult = await creditRes.json();
        const trailerDataResult = await trailerRes.json();

        const trailers = trailerDataResult.results.filter(
          video => video.type === "Trailer" && video.site === "YouTube"
        );
        allTrailers.push(
          trailers.length > 0
            ? `https://www.youtube.com/watch?v=${trailers[0].key}`
            : "Not Available"
        );

        const cast = creditDataResult.cast.slice(0, 5).map(c => ({
          name: c.name,
          profile_path: c.profile_path,
        }));

        allMovieData.push({
          id: movieId,
          title: movieDataResult.title,
          poster_path: movieDataResult.poster_path,
          rating: movieDataResult.vote_average.toFixed(1),
          genres: movieDataResult.genres,
          cast,
        });
      }

      setMovies(allMovieData);
      setNowPlayingTrailers(allTrailers);
    } catch (error) {
      console.error("Error fetching now playing movies:", error);
    }
  };

  useEffect(() => {
    fetchMovieData();
  }, []);

  useEffect(() => {
    if (movies.length === 0) return;

    setCurrentCast(movies[0].cast);
    setLoading(false);

    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        const newIndex = (prev + 1) % movies.length;
        setCurrentCast(movies[newIndex].cast);
        return newIndex;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [movies]);

  const handleTrailerClick = () => {
    const url = nowPlayingTrailers[currentIndex];
    if (url !== "Not Available") {
      window.open(url, '_blank');
    }
  };

  if (loading) return <Loader />;

  const movie = movies[currentIndex];

  return (
    <div className="flex w-[320px] gap-1 px-2 py-2 bg-[#111] rounded-xl sm:w-[80%] sm:px-6 sm:py-6 lg:w-[85%] lg:h-[400px] xl:w-[65%]">
      <div className="w-[35%] sm:w-[45%]">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          className="w-[95%] h-[160px] rounded-xl sm:h-[250px] lg:h-[350px]"
          alt={movie.title}
        />
      </div>
      <div className="w-[65%] overflow-hidden sm:ml-4">
        <p className="text-white text-[16px] font-bold line-clamp-1 sm:text-[25px] lg:text-[40px]">
          Now Playing
        </p>
        <p className="text-yellow-400 text-[14px] line-clamp-1 sm:text-[22px] lg:text-[30px]">
          {movie.title}
        </p>
        <p className="text-white text-[10px] line-clamp-1 sm:text-[18px] lg:text-[22px] lg:mb-3 lg:mt-2">
          Rating: {movie.rating}⭐
        </p>
        <p className="flex text-white gap-1 mb-2 text-[10px] sm:text-[14px]">
          Genre:
          {movie.genres.map((g, idx) => (
            <span key={idx} className="text-yellow-300 line-clamp-1">
              {g.name}{idx < movie.genres.length - 1 ? " |" : ""}
            </span>
          ))}
        </p>
        <div className="flex gap-2">
          {currentCast.map((c, i) => (
            <img
              key={i}
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
        <div className="flex text-gray-400 gap-2 text-[8px] sm:text-[10px]">
          {currentCast.map((c, i) => (
            <p key={i} className="w-[30px] line-clamp-1 sm:w-[55px] lg:w-[75px]">
              {c.name}
            </p>
          ))}
        </div>
        <div className="flex gap-1 mt-2 lg:mt-4">
          <Link to={`/detail/movie/${movie.id}`}>
            <button className="text-white w-[60px] cursor-pointer h-[17px] text-[8px] bg-gray-900 rounded-xl line-clamp-1 sm:w-[80px] sm:h-[20px] sm:text-[10px] lg:w-[120px] lg:h-[32px] lg:text-[14px] hover:bg-gray-800">
              More Details
            </button>
          </Link>
          <button
            onClick={handleTrailerClick}
            className="text-white cursor-pointer w-[75px] h-[16px] text-[8px] bg-gray-900 rounded-xl line-clamp-1 sm:w-[80px] sm:h-[20px] sm:text-[10px] lg:w-[150px] lg:h-[32px] lg:text-[14px] hover:bg-gray-800"
          >
            Watch Trailer🎞️
          </button>
        </div>
      </div>
    </div>
  );
};

export default Backdrop;
