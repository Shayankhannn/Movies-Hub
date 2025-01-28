import { useEffect, useState } from "react"
import Search from "./components/Search"
import MovieLoader from "./components/MovieLoader";
import MovieCard from "./components/MovieCard";



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
  const [errorMessage, setErrorMessage] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const fetchMovies = async () => {
    setErrorMessage("");
    setLoading(true);
    try {

      const endPoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
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

      setMovies(data.results || []);

    } catch (error) {
      console.error("Error fetching movies:", error);
      setErrorMessage("Error fetching movies. Please try again later.");
    }finally{
      setLoading(false);
    }
  };

  useEffect(()=>{
    fetchMovies();
  },[])

  return (
    <main>
    <div className="pattern"/>

    <div className="wrapper">
      <header>
        <img src="./hero.png" alt="Hero Banner" />
        <h1>Find <span className="text-gradient">Movies</span> You&apos;ll Enjoy Without the Hassle</h1>

        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </header>

      <section className="trending">
        <h2 className="mt-[40px]">All Movies</h2>
       {loading ? (
        <MovieLoader/>): errorMessage ? (
          <p className="text-red-500">{errorMessage}</p>):(
             <ul>
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
