import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  //Nécessite un nom d'utilisateur et des mots de passe. 
  //Si l'utilisateur est présent dans la base de données (les informations d'identification sont valides),
  //l'utilisateur est connecté. Les jetons (accès et actualisation) sont stockés dans le stockage local,
  const loginUser = async (username, password) => {
    const response = await fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    });
    const data = await response.json();

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      history.push("/");
    } else {
      alert("Something went wrong!");
    }
  };
  // Nécessite un nom d'utilisateur, un mot de passe1, un mot de passe2. 
  // Cette fonction enregistre l'utilisateur dans la base de données. 
  // Nom d'utilisateur unique, les vérifications de correspondance de mot de passe sont effectuées 
  // sur le backend. Si la demande d'inscription aboutit, l'utilisateur est redirigé vers une page 
  // de connexion.
  const registerUser = async (username, password, password2) => {
    const response = await fetch("http://127.0.0.1:8000/api/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password,
        password2
      })
    });
    if (response.status === 201) {
      history.push("/login");
    } else {
      alert("Something went wrong!");
    }
  };

  //Déconnecte simplement l'utilisateur et efface le stockage local. 
  // Quand authTokenset état deloadingest changé. L'état de l'utilisateur a changé 
  // ( useEffectest à l'origine de ce changement). jwt_decodedécode simplement un jeton d'accès.
  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    history.push("/");
  };

  const contextData = {
    user,
    setUser,
    authTokens,
    setAuthTokens,
    registerUser,
    loginUser,
    logoutUser
  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwt_decode(authTokens.access));
    }
    setLoading(false);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};