import React, { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "./Context";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [movieHover,setMovieHover]=useState(false);
  const [tVHover,setTVHover]=useState(false);

  const {setPageNo}=useContext(UserContext);

  const navigate = useNavigate();

  const handleNavClick=(e)=>{
    console.log(e.target.value);
    setMenuOpen(prev=>!prev);
    setPageNo(1);
    navigate(`/${e.target.value}`);
 
  }
  const handleNavHover=(val)=>{
    // console.log(val);
    
    if(val==="2"){
    setTVHover(prev=>!prev);
    // console.log(val);
    }

    if(val==="1"){
    setMovieHover(prev=>!prev);
    }
    // console.log(isHover);

  }

  return (
    <nav className="  w-full bg-[#111] p-4 flex items-center justify-between border-b-1 border-gray-300 ">
      {/* Logo */}
      <button
        className="cursor-pointer min-w-[160px] w-[50%]"
        onClick={() => navigate("/")}
      >
        <img className=" w-[35%] " src="./logo.png" alt="logo" />
      </button>

      {/* Desktop Menu */}
      <div className="hidden md:flex w-[50%] px-4 items-center justify-between text-white text-sm md:text-md lg:text-lg font-semibold">
      <button
          className="cursor-pointer hover:underline underline-offset-12 decoration-2 "
          onClick={() => navigate("/")}
        >
          Home
        </button>
        <div data-id="1" className="relative w-[100px] text-center  border-red-400 " onMouseEnter={(e)=>handleNavHover(e.currentTarget.dataset.id)} onMouseLeave={(e)=>handleNavHover(e.currentTarget.dataset.id)}>
        
        <button
          className="cursor-pointer  "
          
        >
           Movies
        </button>
        <div className={movieHover?"cursor-pointer flex flex-col gap-1 rounded-md  absolute z-1 w-[100px]  bg-[#000000] py-1 text-sm":"hidden"}>
          <p onClick={()=>
            {setPageNo(1);
              navigate("/search")}} className="hover:bg-[#111122]">All </p>
          <p onClick={()=>{setPageNo(1); navigate("/top-rated-movies")}} className="hover:bg-[#111122]">Top Rated </p>
          <p onClick={()=>{setPageNo(1); navigate("/trending-movies")}} className="hover:bg-[#111122]">Trending </p>
          
        </div>
        </div>
        <div data-id="2" className="relative w-[100px] text-center  border-red-400 " onMouseEnter={(e)=>handleNavHover(e.currentTarget.dataset.id)} onMouseLeave={(e)=>handleNavHover(e.currentTarget.dataset.id)}>
        <button
          className="cursor-pointer"
          
        >
           TV Shows
        </button>
        <div className={tVHover?"cursor-pointer flex flex-col gap-1 rounded-md  absolute z-1 w-[100px]  bg-[#000000] py-1 text-sm":"hidden"}>
          <p onClick={()=>{setPageNo(1); navigate("/search")}} className="hover:bg-[#111122]">All </p>
          <p onClick={()=>{setPageNo(1); navigate("/top-rated-shows")}} className="hover:bg-[#111122]">Top Rated</p>
          <p onClick={()=>{setPageNo(1); navigate("/trending-shows")}} className="hover:bg-[#111122]">Popular</p>
          
        </div>
        </div>
       
        <button
          className="cursor-pointer hover:underline underline-offset-12 decoration-2 "
          onClick={() => navigate("/watchlist")}
        >
          Watchlist
        </button>
       
        <button
          className="cursor-pointer hover:underline underline-offset-12 decoration-2 "
          onClick={() => navigate("/favorite")}
        >
          Favorites
        </button>
        
      </div>

      <div className="flex gap-2">
       
        {/* Hamburger Menu for Small Screens */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="z-100 absolute top-16 left-0 w-full bg-[#111] flex flex-col items-center text-white py-4 space-y-4 md:hidden">
          <div
          
            className=""
            
          >
            Movies- <button value="search" className="px-2" onClick={(e)=>handleNavClick(e)}>All</button><button value="top-rated-movies" className="px-2" onClick={(e)=>handleNavClick(e)}>Top Rated</button><button value="trending-movies" className="px-2" onClick={(e)=>handleNavClick(e)}>Trending</button>
          </div>
          <div
          value="trending"
            className=""
            
          >
            Shows- <button value="search" className="px-2" onClick={(e)=>handleNavClick(e)}>All</button><button value="trending-shows" className="px-2" onClick={(e)=>handleNavClick(e)}>Popular</button><button value="top-rated-shows" className="px-2" onClick={(e)=>handleNavClick(e)}> Top Rated</button>
          </div>
          
          <button
          value="favorite"
            className=""
            onClick={(e)=>handleNavClick(e)}
          >
            Favorites
          </button>
          
          <button
          value="watchlist"
            className=""
            onClick={(e)=>handleNavClick(e)}
          >
            Watchlist
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
