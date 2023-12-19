import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./favoritos.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";

function Favoritos() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    const minhaLista = localStorage.getItem("@primeflix");
    setFilmes(JSON.parse(minhaLista) || []);
  }, []);



  function excluirFilme(id){
    let filtroFilme = filmes.filter((item) => {
      return(item.id !== id)
      
    })

    setFilmes(filtroFilme)
    localStorage.setItem('@primeflix',JSON.stringify(filtroFilme))
    toast.success('Filme removido com sucesso')
  }



  return (
    <div className="meus-filmes">
      <h1>Meus filmes</h1>
        
         {filmes.length === 0 && <span>Você não possui nenhum filme salvo :(</span>}
         
      <ul>
        {filmes.map((item) => {
          return (
            <li key={item.id}>
              <span>{item.title}</span>
              
              <div>
                <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
              
                <RiDeleteBin6Line onClick={() => excluirFilme(item.id)} className="excluir"/>
              </div>
             
            </li>
            
          );
        })}
      </ul>
      

    </div>
  );
}

export default Favoritos;
