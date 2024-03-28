import { Link } from "react-router-dom";
import "./header.css";

function Header() {
  return (
    <header>
      <div className="cabecalho">
        <div>
        <Link to="/" className="logo">
          Prime Flix
        </Link>
        </div>

        <Link to="/favoritos" className="favoritos">
          Meus filmes
        </Link>
      </div>
    </header>
  );
}

export default Header;
