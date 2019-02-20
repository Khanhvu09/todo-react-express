import React from 'react'
import {Link} from 'react-router-dom'
export default function(){
    return(
        <nav className="light-blue lighten-1" role="navigation">
            <div className="nav-wrapper container">
                <a id="logo-container" href="#" className="brand-logo">ToDo NavBar</a>
                <ul className="right hide-on-med-and-down">
                    <li><Link to="#">Navbar Link></Link></li>
                </ul>
                <ul id="nav-mobile" className="side-nav">
                    <li><Link to="#">Navbar Link></Link></li>
                </ul>
                <a href="#" data-activates="nav-mobile" className="button-collapse"><i className="material-icons">menu</i></a>
            </div>
        </nav>
    )
}