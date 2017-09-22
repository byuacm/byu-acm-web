import React from "react";
import "./Sidebar.scss";
import { NavLink } from "react-router-dom";


export default class Sidebar extends React.Component {
    render() {
        return (
            <div className="Sidebar">
                <div className="__logoContainer">
                    <img className="__logo" src="https://acm.byu.edu/img/acm_logo.png" />
                </div>
    
                <div className="__links">
                    <NavLink activeClassName="activePage" exact to="/">Home</NavLink>
                    <NavLink activeClassName="activePage" to="/about">About</NavLink>
                    <NavLink activeClassName="activePage" to="/getinvolved">Get Involved</NavLink>
                    <NavLink activeClassName="activePage" to="/officers">Officers</NavLink>
                    <NavLink activeClassName="activePage" to="/thefifthpage">The Fifth Page</NavLink>
                </div>
            </div> 
        );
    }
}

