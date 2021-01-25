import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/home/home";
import Login from "./components/pages/Login";

function App() {
    return (
        <Router>
            <Route path="/" exact component={Login} />
            <Switch>
                <Route path="/home" exact component={Home} />
            </Switch>
        </Router>
    );
}

export default App;
