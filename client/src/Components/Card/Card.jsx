import React from "react";
import { Link } from "react-router-dom";

import './Card.css';

export default function Card(props) {
    return (
        <div className="containerCard">
            <Link className="linkCard" to={`/home/detail/${props.id3}`}>
                <div className="flag">
                    <img id="bandera" src={props.flags} alt={`${props.name} flag not found`} />
                </div>
            <div>
                <div className="info">
                    <h2>{props.name}</h2>
                    <h2>{props.id3}</h2>
                    <h3>{props.continent}</h3>
                </div>
            </div>
            </Link>
        </div>
    )
}
