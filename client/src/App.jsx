import React, { Component } from "react";
import "./App.css";

import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";
import Landing from "./components/layout/Landing.jsx";
import Register from './components/auth/Register.jsx';
import Login from './components/auth/Login.jsx';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
            <Route path="/" exact component={Landing} />
            <div className="container">
              <Route path="/register" exact component={Register} />
              <Route path="/login" exact component={Login} />
            </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
