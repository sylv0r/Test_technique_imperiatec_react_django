import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  return (
    <nav id="NavBar">
      <div class="flex">
        <div id="top">
        <h1 id="TopPageTitle">Test Technique IMPERIATEC</h1>
        <button id="logOut"onClick={logoutUser}>Se déconnecter</button>
        </div>
        <div id="link">
          {user ? (
            <>
              <Link class="lien" to="/home">Home </Link>
              <Link class="lien" to="/arrival">Page D'Arrivé</Link>
              
            </>
          ) : (
            <>
              <Link class="lien" to="/login">Se connecter</Link>
              <Link class="lien" to="/register">Créer un compte</Link>
            </>
          )}
        
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
