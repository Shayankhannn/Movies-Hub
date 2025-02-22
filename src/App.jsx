import { useEffect, useState } from "react"
import Search from "./components/Search"
import MovieLoader from "./components/MovieLoader";
import MovieCard from "./components/MovieCard";
import { useDebounce } from "react-use";
import { getTrendingMovies, updateSearchCount } from "./appwrite";



function App() {
  const API_BASE_URL = "https://api.themoviedb.org/3";
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const API_OPTIONS = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  }
  const [searchTerm, setSearchTerm] = useState("");
  const [debounceSearchTerm, setDebounceSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useDebounce(() => setDebounceSearchTerm(searchTerm), 1300, [searchTerm]);

  const fetchMovies = async (query = '') => {
    setErrorMessage("");
    setLoading(true);
    try {

      const endPoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` :`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endPoint, API_OPTIONS);

      if(!response.ok){
        throw new Error("Something went wrong while fetching movies!");
      } 

      const data = await response.json();
      

      if(data.Response === 'false'){
        setErrorMessage(data.Error || 'Something went wrong while fetching movies!');
        setMovies([]);
        return;
      }

      setMovies(data.results || [ ]);

      if(query && data.results.length > 0){
       await  updateSearchCount(query,data.results[0]);
      }

    } catch (error) {
      console.error("Error fetching movies:", error);
      setErrorMessage("Error fetching movies. Please try again later.");
    }finally{
      setLoading(false);
    }
  };

    const loadTrendingMovies = async () => {
      try {
        const movies = await getTrendingMovies();
        setTrendingMovies(movies);

      } catch (error) {
        console.error("Error loading trending movies:", error);
      }
    }

  useEffect(()=>{
    fetchMovies(debounceSearchTerm);
  },[debounceSearchTerm]);

  useEffect(()=>{
    loadTrendingMovies();
  },[]);

  return (
    <main>
    <div className="pattern"/>

    <div className="wrapper">
      <header>
        <img src="./hero.png" alt="Hero Banner" />
        <h1>Find testing<span className="text-gradient">Movies</span> You&apos;ll Enjoy Without the Hassle</h1>

        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </header>

    {trendingMovies.length > 0 && (
      <section className="trending">
        <h2 className="">Trending Movies</h2>
        <ul>
          {trendingMovies.map((movie,index) => (
          <li key={movie.$id}>
            <p>{index + 1} </p>
            <img src={movie.poster_url} alt={movie.title} />
            </li>
          ))} 
        </ul>
        </section>
        )}

      <section className="all-movies">
        <h2 >All Movies</h2>
       {loading ? (
        <MovieLoader/>): errorMessage ? (
          <p className="text-red-500">{errorMessage}</p>):(
             <ul className="">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie}/>
              ))}
             </ul> 
          )
          }
      </section>

</div>
    </main>
  )
}

export default App
