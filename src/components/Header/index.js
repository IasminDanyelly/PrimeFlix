import { Link } from "react-router-dom";
import "./header.css";

function Header() {
  return (
    <header>
      <div className="cabecalho">
        <Link to="/home" className="logo">
          Prime Flix
        </Link>
        <Link to="/favoritos" className="favoritos">
          Meus filmes
        </Link>
      </div>
    </header>
  );
}

export default Header;
