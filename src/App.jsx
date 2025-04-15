import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Favorite from "./components/Favorite";
import Home from "./Main/Home";
import Search from "./components/Search";
import Navbar from "./components/Navbar";
import NavPages from "./components/NavPages";
import Watchlist from "./components/Watchlist";
import UserContext from "./components/Context";
import { useEffect, useState } from "react";

import { Footer } from "./components/Footer";
import ChatDetails from "./components/ChatDetails";



const AppWrapper = () => {
  
  const [favCollection, setFavCollection] = useState([]);
  const [favId, setFavId] = useState([]);
  const [watchListCollection, setWatchListCollection] = useState([]);
  const [watchId, setWatchId] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    const favLocalHostData = JSON.parse(localStorage.getItem("favCollection"));
    const favIdLocalData = JSON.parse(localStorage.getItem("favId"));
    const watchLocalHostData = JSON.parse(localStorage.getItem("watchList"));
    const watchIdLocalData = JSON.parse(localStorage.getItem("watchId"));

    if (favIdLocalData) setFavId(favIdLocalData);
    if (favLocalHostData) setFavCollection(favLocalHostData);
    if (watchLocalHostData) setWatchListCollection(watchLocalHostData);
    if (watchIdLocalData) setWatchId(watchIdLocalData);
  }, []);

  return (
    <UserContext.Provider
      value={{
        favCollection,
        setFavCollection,
        favId,
        setFavId,
        watchId,
        setWatchId,
        watchListCollection,
        setWatchListCollection,
        pageNo,
        setPageNo,
        details,
        setDetails,
      }}
    >
      <Router>
        <MainApp />
      </Router>
    </UserContext.Provider>
  );
};

// Separate component to access location
const MainApp = () => {
  const location = useLocation();

  // Hide Navbar on "/detail"
  const hideNavbar = location.pathname === "/detail";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/top-rated-movies" element={<NavPages category="top_rated" media_type="movie" name="Top Rated Movies" />} />
        <Route path="/trending-movies" element={<NavPages category="trending" media_type="movie" name="Trending Movies" />} />
        <Route path="/upcoming-movies" element={<NavPages category="upcoming" media_type="movie" name="Upcoming Movies" />} />
        <Route path="/top-rated-shows" element={<NavPages category="top_rated" media_type="tv" name="Top Rated Shows" />} />
        <Route path="/trending-shows" element={<NavPages category="trending" media_type="tv" name="Popular Shows" />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/search" element={<Search />} />
        <Route path="/detail/:id" element={<ChatDetails />} />
      </Routes>

      <Footer />
    </>
  );
};

export default AppWrapper;
