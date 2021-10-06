import React from "react";
import Home from "./component/pages/Home";
import About from "./component/pages/About";
import Contact from "./component/pages/Contact";
import Notfound from "./component/pages/Notfound";
import Add from "./component/users/Add";
import Edit from "./component/users/Edit";
import UsersView from "./component/users/UsersView";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./component/Layouts/Navbar";
function App() {
  return (
    <>
      <Router>
        {window.location.pathname === "/" ||
        window.location.pathname === "/about" ||
        window.location.pathname === "/contact" ||
        window.location.pathname === "/users/edit" ||
        window.location.pathname === "/users/add" ? (
          <Navbar />
        ) : null}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/users/add" component={Add} />
          <Route exact path="/users/edit/:id" component={Edit} />
          <Route exact path="/users/:id" component={UsersView} />
          <Route path="*" component={Notfound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
