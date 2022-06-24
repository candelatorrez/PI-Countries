import React from "react";
import './Card.css';
import {Link} from 'react-router-dom';



export default function Card(props){
    return (
        <div className="styleCard">
        <Link  to={`/home/country_detail/${props.id3}`}>
            <div>
                <img className="imgCard" src={props.flags} alt={`la bandera de ${props.name} no se encuentra :(`} />
            </div>
            <div>
                <div className="datos">
                    <h2>{props.name}</h2>
                    <h3>{props.subregion}</h3>
                </div>
            </div>
        </Link>
    </div>
    
    )
}