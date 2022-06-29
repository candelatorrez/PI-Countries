import React from "react";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { postActivity, getCountries } from "../../Redux/Actions";
import {Link} from 'react-router-dom';


import './CreateActivity.css';


export default function CreateActivity(){
    const dispatch = useDispatch();
    const countries = useSelector((state) => state.countries)
    const [error, setError] = useState({})

    const [input, setInput] = useState({
        name: '',
        difficulty:'',
        duration:'',
        season: '',
        idCountry: [],
    })

    function validate(){
        let error = {};
        if(!input.name || !input.difficulty || !input.duration || !input.season || !input.idCountry) {
            error.name = 'Los campos deben estar completos'
        }
        return error;
    }

    useEffect(() => {
        dispatch(getCountries())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setError(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
    }

    function handleCheck (e) {
        if(e.target.checked){
            setInput({
                ...input,
                season:  e.target.value            })
            setError(validate({
                ...input,
                [e.target.name] : e.target.value
            }))
        }
    }

    function handleSelect(e) {
       setInput({
        ...input,
        idCountry: [...input.idCountry, e.target.value]
       })
    }

    function handleDelete(el) {
        setInput({
            ...input,
            idCountry: input.idCountry.filter(country => country !== el) //filtra por todo lo que no sea element, devuelve todo sin el mismo
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(input)
        dispatch(postActivity(input))
        alert('Actividad Creada')
        setInput({
            name: '',
            difficulty:'',
            duration: '',
            season: '',
            idCountry: []
        })
    }

    return(
        <div>
            <h1>CREA UNA ACTIVIDAD</h1>
            <div>
                <form onSubmit={(e) => handleSubmit(e)} >
                    <div>
                        <label>Nombre:</label>
                        <input type='text' value={input.name} name='name' placeholder='Nombre de la actividad' onChange={e => handleChange(e)} />
                        {error.name && (
                            <p>{error.name}</p>
                        )}
                    </div>
                    <div>
                        <label>Dificultad:</label>
                        <select onChange={(e) => handleChange(e)} name='difficulty' value={input.difficulty}>
                            <option hidden >Seleccionar dificultad</option>
                            <option value={1}> 1 </option>
                            <option value={2}> 2 </option>
                            <option value={3}> 3 </option>
                            <option value={4}> 4 </option>
                            <option value={5}> 5 </option>
                        </select>
                        {error.name && (
                            <p>{error.name}</p>
                        )}
                    </div>
                    <div>
                        <label>Duración en minutos</label>
                        <input type='number' min='10' max='300' value={input.duration} onChange={(e) => handleChange(e)} name='duration' placeholder='Tiempo...'/>
                        {error.name && (
                            <p>{error.name}</p>
                        )}
                    </div>
                    <div>
                        <label>Temporada:</label>
                        <div>
                            <label><input type='checkbox' name='Verano' value='Summer' onChange={e => handleCheck(e)}/> Summer </label>
                            <label><input type='checkbox' name='Otoño' value='Autumn' onChange={e => handleCheck(e)}/> Autumn </label>
                            <label><input type='checkbox' name='Invierno' value= 'Winter' onChange={e => handleCheck(e)}/> Winter </label>
                            <label><input type='checkbox' name='Primavera' value='Spring' onChange={e => handleCheck(e)}/> Spring </label>
                            {error.name && (
                                <p>{error.name}</p>
                            )}
                        </div>
                    </div>
                    <div>
                        <label>Paises</label>
                        <select name='countries' onChange={e => handleSelect(e)}>
                            <option hidden >Seleccionar País</option>
                            {
                                countries.map((country) => (
                                    <option key={country.id3} value={country.id3}>{country.name}</option>
                                ))
                            }
                        </select>
                        {error.name && (
                            <p>{error.name}</p>
                        )}
                        <div>
                            {input.idCountry.map((el)=> 
                            <div key={el.id3}>
                                <h4>{el}</h4>
                                <button type='button' onClick={() => handleDelete(el)}>X</button>
                            </div>    
                                )}
                        </div>
                    </div>
                    <input type='submit' value='Submit' 
                    disabled={
                        !input.name ||
                        !input.difficulty ||
                        !input.duration ||
                        !input.season || 
                        !input.idCountry
                    } />
                </form>
                <div>
                    <Link to='/home'>
                        <button>Volver</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}