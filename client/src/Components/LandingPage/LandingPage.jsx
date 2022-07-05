import React from 'react';
import {Link} from 'react-router-dom';
import './LandingPage.css'



export default function LandingPage(){
    return (
        <div>
            <div className='tituloLanding'>
             <h1 className="countriesApp">COUNTRIES APP</h1>    
            </div>
           
          <Link to = '/home'>
            <button className='button'> EXPLORAR </button>
            </Link>  
        </div>
    )
}