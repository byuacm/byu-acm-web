import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import About from "./components/About";

import "./index.scss";

const Index = () => {
    return (
        <BrowserRouter>
            <div className="ResponsivePageLayout">
                <Sidebar />
                <div className="PageContent">
                    <Route path="/" exact component={() => <Home />} />
                    <Route path="/about" component={About} />
                </div>
            </div>
        </BrowserRouter>
    )
}


const reactEntry = document.createElement("div");
ReactDOM.render(<Index />, reactEntry);
document.body.appendChild(reactEntry)
