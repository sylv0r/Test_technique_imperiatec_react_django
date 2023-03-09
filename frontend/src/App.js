import React from "react";
import "./app.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import Home from "./views/homePage";
import Login from "./views/loginPage";
import Register from "./views/registerPage";
import PageArrival from "./views/PageArrival";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <AuthProvider>
          <Navbar />
          <Switch>
            <Route component={Login} path="/login" />
            <Route component={Register} path="/register" />
            <PrivateRoute component={PageArrival} path="/arrival" exact />
            <Route component={Home} path="/home" />
            </Switch>
        </AuthProvider>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
