import React from "react";
import ImageRow from "./ImageRow";
import getMovies from "../apis/getMovies";

const Home = () => {
  const movies = getMovies();
  return (
    <div>
      <ImageRow movies={movies} title="My List" />
      <ImageRow movies={movies} title="Trending" />
      <ImageRow movies={movies} title="Hollywood Movies" />
    </div>
  );
};

export default Home;
