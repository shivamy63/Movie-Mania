import React, { useEffect, useState } from "react";
import "./movieList.css";
import { useParams } from "react-router-dom";
import Cards from "../card/card";

const MovieList = () => {
    const [movieList, setMovieList] = useState([]);
    const { type } = useParams();

    useEffect(() => {
        getData();
    }, [type]);

    const validTypes = ["popular", "top_rated", "upcoming", "now_playing"];
    
    const getData = () => {
        const category = validTypes.includes(type) ? type : "popular";
        fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=f7b40da1ebfded909d76ff9691a770bd&language=en-US`)
            .then(res => {
                if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
                return res.json();
            })
            .then(data => setMovieList(data.results || []))
            .catch(error => console.error("Error fetching movies:", error));
    };

    return (
        <div className="movie__list">
            <h2 className="list__title">{(type ? type : "POPULAR").toUpperCase()}</h2>
            <div className="list__cards">
                {movieList.length > 0 ? (
                    movieList.map(movie => <Cards key={movie.id} movie={movie} />)
                ) : (
                    <p>No movies found</p>
                )}
            </div>
        </div>
    );
};

export default MovieList;
