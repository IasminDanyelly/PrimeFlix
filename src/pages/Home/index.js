import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import api from "../../services/api";
import "./home.css";
import { toast } from 'react-toastify';

function Home() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favoritos, setFavoritos] = useState([]);
  const [favoritoFixo, setFavoritoFixo] = useState([]);
  const [filmeSalvoMsgExibida, setFilmeSalvoMsgExibida] = useState(false);

  useEffect(() => {
    async function loadApi() {
      // ... código de carregamento dos filmes
    }
    loadApi();
  }, []);

  function salvarFilme(id) {
    const filmeClicado = filmes.find((filme) => filme.id === id);
    const minhaLista = localStorage.getItem("@primeflix");
    let filmesSalvos = JSON.parse(minhaLista) || [];

    if (filmesSalvos.some((filmeSalvo) => filmeSalvo.id === id)) {
      toast.warning(`"${filmeClicado.title}" já está salvo nos favoritos!`);
      return;
    }

    filmesSalvos.push(filmeClicado);
    localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
    toast.success(`"${filmeClicado.title}" salvo nos favoritos!`);
  }

  const handleFavoritoClick = (id) => {
    if (favoritos.includes(id)) {
      setFavoritos(favoritos.filter((filmeId) => filmeId !== id));
      setFavoritoFixo(favoritoFixo.filter((filmeId) => filmeId !== id));
      toast.warning(`"${filmes.find((filme) => filme.id === id).title}" removido dos favoritos!`);
    } else {
      if (!favoritoFixo.includes(id)) {
        setFavoritos([...favoritos, id]);
        setFavoritoFixo([...favoritoFixo, id]);
        salvarFilme(id);
        setFilmeSalvoMsgExibida(true);
      } else {
        toast.warning('Este filme já está fixo nos favoritos!');
      }
    }
  };

  return (
    <div>
      {/* Renderização dos filmes */}
      {filmes.map((filme) => {
        const isFavorito = favoritos.includes(filme.id);
        const isFavoritoFixo = favoritoFixo.includes(filme.id);

        return (
          <article key={filme.id}>
            <strong className="titulo__filme">{filme.title}</strong>
            <img
              src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
              alt={filme.title}
            />
            <div className="link-container">
              <Link to={`/filme/${filme.id}`} className="link__filme">
                Acessar
              </Link>
              <div
                className="salvar"
                onClick={() => handleFavoritoClick(filme.id)}
              >
                {isFavorito || isFavoritoFixo ? <FaHeart className="heart" /> : <CiHeart />}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default Home;