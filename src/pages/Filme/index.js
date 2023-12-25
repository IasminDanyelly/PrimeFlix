import { useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './filme-info.css'
import api from '../../services/api'
import { toast } from 'react-toastify';

function Filme(){
     const {id} = useParams();
     const navigate = useNavigate();

     const [filme,setFilme] = useState({});
     const [loading,setLoading] = useState(true);

     useEffect(() => {
         async function loadFilme(){
            await api.get(`/movie/${id}`,{
            params:{
                api_key:'da5f887279abe005361ccc3117b865e5',
                language: 'pt-BR',
            }}
            )
            .then((response)=> {
                setFilme(response.data);
                setLoading(false)
            })
            .catch(() => {
                console.log('Filme não encontrado');
                navigate("/", {replace: true});
                return;
            })

           
         }
  

         loadFilme();

         return () => {
            console.log('Componente foi desmontado!')
          }
     },[navigate, id])



     function salvarFilme(){
         const minhaLista = localStorage.getItem('@primeflix');
         let filmesSalvos = JSON.parse(minhaLista) || [];

         let hasFilmes = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id);

         if(hasFilmes){
          toast.warning('Este filme já está salvo!');
          return;
         }

         filmesSalvos.push(filme);
         localStorage.setItem('@primeflix', JSON.stringify(filmesSalvos));
         toast.success('Adicionado a Meus filmes')
     }
      


     if(loading){
        return(
            <div className='carregando'> 
                <h2>Acessando informações do filme...</h2>
                
            </div>
        )
     }
    return(
        <div className='filme-info'>
             <h1>{filme.title}</h1>
             <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}` } alt={filme.title} />

             <h3>Sinopse</h3>
             <span>{filme.overview}</span>

             <strong>Avaliação: {filme.vote_average.toFixed(1)}/10</strong>

             <div className='area-botoes'>
                <button onClick={salvarFilme}>Salvar</button>
                <button><a target='blank' rel='external' href={`https://youtube.com/results?search_query=${filme.title} Trailer Dublado"`}>Trailer</a></button>
             </div>
        </div>
        
    )
}

export default Filme;