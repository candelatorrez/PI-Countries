import React from "react";

export  default function Paginado({allCountries, paginate, countriesPerPage}) {
    const pageNumber = [];

    //MATH.CEIL REDONDEA PARA ARRIBA
    for(let i = 1; i <= Math.ceil(allCountries/countriesPerPage); i++){
        pageNumber.push(i)
    } // DEVUELVE UN ARREGLO DE NUMEROS

    return (
        <nav>
            <ul>
                {pageNumber && pageNumber.map(number => 
                <li key={number}>
                    <button onClick={() => paginate(number)}>{number}</button>
                </li>
                )
                }
            </ul>
        </nav>
    )


}