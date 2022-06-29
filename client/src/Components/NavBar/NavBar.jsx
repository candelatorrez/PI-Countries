import React from "react";

import {Link} from 'react-router-dom';
import FilterAndOrder from "../FilterAndOrder/FilterAndOrder.jsx";
import SearchBar from "../SearchBar/SearchBar";



export default function NavBar() {
    return (
        <div className="navbar">
            <nav className="cosas">
                <Link to={'/'} >
                    <h1>COUNTRIES APP</h1>
                </Link>
                <Link to={'/activities'}>
                    <h2 className="crear">Crear Actividad</h2>
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