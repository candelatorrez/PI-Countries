import React from "react";
import Cards from "../Cards/Cards.jsx"
import NavBar from "../NavBar/NavBar.jsx";

export default function Home() {
    return (
        <div>
            <div>
                <NavBar />
            </div>
            <div>
                <Cards />
            </div>
        </div>
    )
}