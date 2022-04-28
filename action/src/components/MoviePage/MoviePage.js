import {React,useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import './MoviePage.css'
import {getMovie} from '../../App'

function MoviePage() {
    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    let { id } = useParams();
    const [details,setDetails] = useState({})


    useEffect(() => {
        
        const fetchMovie = async() => {
          try{
            let tempUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=199d5523708df94e26961753c13de1d4&language=en-US`;
            var data = await getMovie(tempUrl);
            let imgLink = data.poster_path.substring(1)
            let currentMovie = {
                title : data.original_title,
                description : data.overview,
                imgSrc : `http://image.tmdb.org/t/p/w500/${imgLink}`,
                tmdb : `https://www.themoviedb.org/movie/${data.id}`,
            };
            setDetails(currentMovie);
          } catch (err) {
            console.log(err);
          }
        }
        fetchMovie();
        // eslint-disable-next-line
    }, []);

    console.log(details)
    return (
      <div className="movieDetailsContainer">
        <img src={details.imgSrc} alt="Link is broken :("/>
        <div className="movieData">
            <h2>{details.title}</h2>
            <p>{details.description}</p>
        </div>
      </div>
    );
  }

export default MoviePage;