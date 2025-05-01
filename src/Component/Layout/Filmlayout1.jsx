import { useEffect, useRef, useState } from "react";
import Left from "../Element/Scroll/Left";
import Right from "../Element/Scroll/Right";
import CardFilm1 from "../Fragment/CardFilm1";
import { useMovieStore } from "../../store/store";


const FilmLayout1 = (props) => {
  // eslint-disable-next-line react/prop-types
  const { title } = props;
  // Film Trending

  const {isLoading, error, fetchMovies, movies} = useMovieStore();


  const ITEM = 200;
  const [position, setPosition] = useState(0);
  const containerRef = useRef();

  const handleScroll = (scrollAmount) => {
    const newPosition = position + scrollAmount;
    setPosition(newPosition);
    containerRef.current.scrollLeft = newPosition;
  };
  useEffect(() => {
    fetchMovies(); 
  }, [fetchMovies]);

  return (
    <>
      <div className="mt-10 realtive">
        <h1 className="text-white font-bold text-xl lg:text-4xl text-start ml-6 lg:ml-12">{title}</h1>
        <div className="flex items-center p-6 lg:p-12 md:p-8  relative">
          <div ref={containerRef} className="flex gap-2 overflow-x-hidden scroll-smooth ">
          {isLoading ? (
            <p className="text-white">Loading...</p>
          ) : error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : (
            movies.map((movie) => (
              <CardFilm1 key={movie.id} image={movie.image} name={movie.name} series={movie.series} />
            ))
          )}    
          </div>
            
          <Left handleClickLeft={() => handleScroll(-ITEM)} variant="absolute"></Left>
          <Right handleClickRight={() => handleScroll(ITEM)} variant="absolute"></Right>
        </div>
      </div>
    </>
  );
};

export default FilmLayout1;
