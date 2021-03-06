import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";

import { Provider } from "react-redux";
import store from "./store";

import PrivateRoute from "./components/common/PrivateRoute.jsx";

import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";
import Landing from "./components/layout/Landing.jsx";
import Register from "./components/auth/Register.jsx";
import Login from "./components/auth/Login.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import CreateProfile from "./components/create-profile/CreateProfile.jsx";
import EditProfile from "./components/edit-profile/EditProfile.jsx";
import AddExperience from "./components/add-credentials/AddExperience.jsx";
import AddEducation from "./components/add-credentials/AddEducation.jsx";
import Profiles from "./components/profiles/Profiles.jsx";
import Profile from "./components/profile/Profile.jsx";
import NotFound from "./components/not-found/NotFound.jsx";
import Posts from "./components/posts/Posts.jsx";
import Post from "./components/post/Post.jsx"

import "./App.css";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout the user
    store.dispatch(logoutUser());
    // TODO: clear the current profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route path="/" exact component={Landing} />
            <div className="container">
              <Route path="/register" exact component={Register} />
              <Route path="/login" exact component={Login} />
              <Route path="/profiles" exact component={Profiles} />
              <Route path="/profile/:handle" exact component={Profile} />
              <Switch>
                <PrivateRoute path="/dashboard" exact component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  path="/create-profile"
                  exact
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  path="/edit-profile"
                  exact
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  path="/add-experience"
                  exact
                  component={AddExperience}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  path="/add-education"
                  exact
                  component={AddEducation}
                />
              </Switch>
              <Switch>
                <PrivateRoute path="/feed" exact component={Posts} />
              </Switch>
              <Switch>
                <PrivateRoute path="/post/:id" exact component={Post} />
              </Switch>
              <Route path="/not-found" exact component={NotFound} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
