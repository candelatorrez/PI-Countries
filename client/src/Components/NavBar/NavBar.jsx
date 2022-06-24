import React from "react";

import {Link} from 'react-router-dom';



import Filters from '../Filters/Filters.jsx';
import Order from "../Orders/Order.jsx";
import SearchBar from '../SearchBar/SearchBar.jsx';


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
            </nav>
            <div>
                <Order />
            </div>
            <div>
                <Filters />
            </div>
            <div>
                <SearchBar />
            </div>
        </div>
    )
}