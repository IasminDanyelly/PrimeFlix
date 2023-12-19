import {Link} from 'react-router-dom';
import './erro.css';

function Erro(){
    return(
      <div className='erro'>
         <h1>404</h1>
         <strong>Página não encontrada!</strong>
         <Link to='/'>Acesse todos os filmes</Link>
      </div>
    )
}

export default Erro;