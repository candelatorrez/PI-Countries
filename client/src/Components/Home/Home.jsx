import React from "react";
import './Home.css';

import NavBar from "../NavBar/NavBar";
import Cards from "../Cards/Cards";


export default function Home() {
    return (
        <div className="home">
            <div>
                <NavBar />
            </div>
            <div className="cards">
                <Cards />
            </div>
            
        </div>
    )
}