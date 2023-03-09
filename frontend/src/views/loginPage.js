import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const LoginPage = () => {
  const { loginUser } = useContext(AuthContext);
  const handleSubmit = e => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    username.length > 0 && loginUser(username, password);
  };

  return (
    <section class="loginRegister">
      <form onSubmit={handleSubmit}>
        <h1>Se connecter </h1>
        <label htmlFor="username">Nom</label>
        <input type="text" id="username" placeholder="Enter Username" />
        <br />
        <br />
        <label htmlFor="password">Mot de passe</label>
        <input type="password" id="password" placeholder="Enter Password" />
        <br /><br />
        <button type="submit">Se connecté</button>
      </form>
    </section>
  );
};

export default LoginPage;
