import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "./home.css";
import {toast} from 'react-toastify';

// URL DA API: '/movie/now_playing?api_key=da5f887279abe005361ccc3117b865e5&language=pt-BR'

function Home() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);
  
    
  useEffect(() => {
    async function loadApi() {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: "da5f887279abe005361ccc3117b865e5",
          language: "pt-BR",
          page: 1,
        },
      });
      setFilmes(response.data.results.slice(0, 20));
      console.log(response.data.results.slice(0, 20));
      setLoading(false);

    
    }

  

    loadApi();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <h2>Buscando filmes...</h2>
      </div>
    );
  }




 

  return (
    <div>
      <div className="container">
        <div className="lista-filmes">
          {filmes.map((filme) => {
              

            return (
              <article key={filme.id}>
                <strong className="titulo__filme">{filme.title}  </strong>
                <img
                  src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
                  alt={filme.title}
                />
               
                <Link to={`/filme/${filme.id}`} className="link__filme">
                  Acessar 
                </Link>
                
              
             
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;