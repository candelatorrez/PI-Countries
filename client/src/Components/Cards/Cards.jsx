import React, {useEffect, useState} from "react";
import {connect} from 'react-redux';
import {getCountries, getNameCountries} from '../../Redux/Actions/index';

import "./Cards.css";
import Card from '../Card/Card.jsx';

export function Cards(props) {

    // Seteamos un estado para nuestro paginado...
    const [numPage, setNumPage] = useState(1);
    
    const group = 10;
    const finalPage = numPage * group;
    const initialPage = finalPage - group;

    const countries = props.countries? props.countries.slice(initialPage, finalPage) : false

    useEffect(() => {
        props.getCountries()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Aplicamos unas condiciones para utilizar bien nuestro paginado.
    if (numPage < 1) {
        setNumPage(1)
        return;
    }
    else if (numPage > 25) {
        setNumPage(25)
        return;
    }

    // Renredizamos nuestras Countries.
    return (
        <div>
            <div className="container">
                {countries ? countries.map(country =>
                    <div className="cartita" key={country.id3}>
                            <Card
                            id3={country.id3}
                            name={country.name}
                            flags={country.flags}
                            continent={country.continent}
                            
                            />
                      
                    
                    </div>) : (<p>Pais No Encontrado</p>)}

            </div>
            <div className="pages">
                <button className="btn1" onClick={() => setNumPage(numPage - 1)}>◀</button>
                <h3 className='number'>Page: {numPage}</h3>
                <button className="btn2" onClick={() => setNumPage(numPage + 1)}>▶</button>
            </div>
        </div>
    )

}

// Funcion para setear los estados de nuestra informacion.
function mapStateToProps(state) {
    console.log(state)
    return {
        countries: state.countries
    }
}

// Funcion para dispachar la accion de nuestro front y traernos la informacion solicitada.
function mapDispatchToProps(dispatch) {
    return {
        getCountries: () => dispatch(getCountries()),
        getNameCountries: name => dispatch(getNameCountries(name)),
       
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards)