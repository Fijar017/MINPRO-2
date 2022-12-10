import './home.css';
import { getMovieList, searchMovie } from '../../api';
import { useEffect, useState } from 'react';

const Home = () => {
const [popularMovies, setPopularMovies] = useState([])

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result)})}, [])

  const PopularMovieList = () => {
    return popularMovies.map((movie, i) => {
      return (
        <div className="Movie-wrapper" key={i}>
        <div className="Movie-title">{movie.title}</div>
        <img className="Movie-Image" src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}/>
        <div className="Movie-overview">overview: {movie.overview}</div>
        <div className="Movie-id">id: {movie.id}</div>
        <div className="Movie-popularity">popularity: {movie.popularity}</div>
        <div className="Movie-date">release: {movie.release_date}</div>
        <div className="Movie-rate">{movie.vote_average}</div>
      </div>
      )
    })
  }
  const search = async (q) => {
    if (q.length > 3) {
    const query = await searchMovie(q)
    setPopularMovies(query.results)
  }
}
  return (
    <div className="App">
      <header className="App-header">
       <h1>JARMOVE</h1> 
       <button className='btn-logout' onClick={() => {
        localStorage.removeItem("session");
        localStorage.removeItem("username");
        window.location.reload();
        return window.location.assign("/");
       }}>
        LOGOUT
       </button>
       
       <input placeholder='cari film.......' 
       className='Movie-search'
       onChange={({target}) =>  search(target.value)}
       />
     <div className="Movie-container">
      <PopularMovieList />
     </div>
     
      </header>
    </div>
  );
}

export default Home;
