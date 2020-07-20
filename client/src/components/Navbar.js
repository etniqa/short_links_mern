import React from 'react';
import {NavLink, Redirect} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";

export const Navbar = () => {
    const auth = useContext(AuthContext);
    const logoutHandler = () => {
        console.log("logoutHandler in Navbar.js");
        auth.logout();
        return <Redirect to="/auth"/>
    };

    return (
        <nav>
            <div className="nav-wrapper blue darken-1" style={{padding: '0 2rem'}}>
                <span className="brand-logo left">Short links</span>
                <ul id="nav-mobile" className="right">
                    <li><NavLink to="/create">Create</NavLink></li>
                    <li><NavLink to="/links">Links</NavLink></li>
                    <li><NavLink to="/detail/id">Detail</NavLink></li>
                    <li><NavLink to="/" onClick={logoutHandler}>Exit</NavLink></li>
                </ul>
            </div>
        </nav>
    );
};
