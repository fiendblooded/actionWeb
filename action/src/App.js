import './App.css';
import {React,useState,useEffect} from 'react'
import Movie from './components/Movie/Movie.js';
import MoviePage from './components/MoviePage/MoviePage.js';
import { BrowserRouter, Route, Routes, Navigate,Link} from "react-router-dom";


export async function getMovie(url) {
  const response = await fetch(url);
  return response.json();
}


function App() {

  const [mov,setMov] = useState({Movies : null});
  const [page,setPage] = useState(1);

  function nextPage(){
    setPage(prevPage => prevPage+1)
  }
  function prevPage(){
    if(page>1){
      setPage(prevPage => prevPage-1)
    }
  }
  
  useEffect(() => {
    const movieList = async() => {
      let movieJSONList = [];
      try{
        let tempUrl = `https://api.themoviedb.org/3/movie/popular?api_key=199d5523708df94e26961753c13de1d4&language=en-US&page=${page}`;
        var data = await getMovie(tempUrl);
        let numResults = data.results.length;
        for(let i=0;i<numResults;i++){
          let imgLink = data.results[i].poster_path.substring(1)
          let currentMovie = {
            title : data.results[i].original_title,
            description : data.results[i].overview,
            imgSrc : `http://image.tmdb.org/t/p/w500/${imgLink}`,
            tmdb : `https://www.themoviedb.org/movie/${data.results[i].id}`,
            id: data.results[i].id 
          };
          movieJSONList.push(currentMovie); 
        }
        setMov({Movies: movieJSONList});
      } catch (err) {
        console.log(err);
      }
    }
    movieList();
  });
  var moviesFull= [];
  mov.Movies && mov.Movies.forEach((movie)=>{
    moviesFull.push(<Movie className="movieElement" key ={movie.id} id={movie.id} name={movie.title} description={movie.description} imglink={movie.imgSrc} tmdbLink={movie.tmdb}/>);
  })
  return (
      <div className="container">
        <header>
          <a href="/movies"><h1>Action.</h1></a>
          <p>Top movies of the week picked for You</p>
        </header>
            <BrowserRouter>
              <Routes>
                <Route exact path='/' element={<Navigate to="/movies"/>} />
                <Route
                  path="/movies"
                  element={(
                    <>
                      <div className="PageDiv"><h2>Page :  </h2><h2 style={{color: "yellow"}}>{page}</h2></div>
                      <div className="App">
                        <button className="prev" onClick = {prevPage}>Previous Page</button>
                        <div className="movieList">
                          {moviesFull}
                        </div>
                        <button className="next" onClick = {nextPage}>Next Page</button>
                      </div>
                    </>
                  )}
                />
                <Route
                  path="/movie/:id"
                  element={<MoviePage/>}
                />
              </Routes>
            </BrowserRouter>
      </div>
    
  );
}

export default App;
