import React from "react";
import {Link} from "react-router-dom";



export default function Card(props){
    return (
        <div>
            <Link to = {`/home/detail/${props.id3}`}>
                <div>
                    <img src = {props.flags} alt = {`bandera de ${props.name} no encontrada`} />
                </div>
                <div>
                    <h2>{props.name}</h2>
                    <h3>{props.subregion}</h3>
                </div>
            </Link>
        </div>
    )
}