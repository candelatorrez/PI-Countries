import React from "react";

import {Link} from 'react-router-dom';
import FilterAndOrder from "../FilterAndOrder/FilterAndOrder.jsx";
import SearchBar from "../SearchBar/SearchBar";
import Image from './home.png';
import "./NavBar.css";

export default function NavBar() {
    return (
        <div className="navbar">
            <nav className="cosasNav">
                <Link to={'/'} >
                   <img className="imag" src={Image} alt="not found" />
                </Link>
                <Link to={'/activities'}>
                    <h2 className="crear">Create Activity</h2>
                </Link>
                <div>
                <FilterAndOrder />  
                </div>
                <div>
                    <SearchBar /> 
                </div>
            </nav>
        </div>
    )
}