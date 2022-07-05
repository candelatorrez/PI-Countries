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
            error.name = <p className="warning">'All fields are required!'</p>
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
        <div className="createActivity">
            <h1 className="tituloActividad">CREATE ACTIVITY</h1>
            <div>
                <form  onSubmit={(e) => handleSubmit(e)} >
                    <div>
                        <label id="label1">Name: </label>
                        <input  className="nameAct" type='text' value={input.name} name='name' placeholder='Name of the activity...' onChange={e => handleChange(e)} />
                        {error.name && (
                            <p>{error.name}</p>
                        )}
                    </div>
                    <div>
                        <label id="label2">Difficulty: </label>
                        <select id="dif" onChange={(e) => handleChange(e)} name='difficulty' value={input.difficulty}>
                            <option hidden >Select difficulty</option>
                            <option value={1}> Easy </option>
                            <option value={2}> Normal </option>
                            <option value={3}> Medium </option>
                            <option value={4}> Hard </option>
                            <option value={5}> Very Hard </option>
                        </select>
                        {error.name && (
                            <p>{error.name}</p>
                        )}
                    </div>
                    <div>
                        <label id="label3">Duration in minutes: </label>
                        <input id="durationAct" type='number' min='10' max='300' value={input.duration} onChange={(e) => handleChange(e)} name='duration' placeholder='Duration...'/>
                        {error.name && (
                            <p>{error.name}</p>
                        )}
                    </div>
                    <div>
                        <label className="label4">Season: </label>
                        <div>
                            <label id="verano"><input type='checkbox' name='Verano' value='Summer' onChange={e => handleCheck(e)}/>  Summer </label>
                            <label id="otoño"><input type='checkbox' name='Otoño' value='Autumn' onChange={e => handleCheck(e)}/>  Autumn </label>
                            <label id="invierno"><input type='checkbox' name='Invierno' value= 'Winter' onChange={e => handleCheck(e)}/> Winter </label>
                            <label id="primavera"><input type='checkbox' name='Primavera' value='Spring' onChange={e => handleCheck(e)}/> Spring </label>
                            {error.name && (
                                <p>{error.name}</p>
                            )}
                        </div>
                    </div>
                    <div>
                        <label id="label5">Countries: </label>
                        <select className="selectCountry" name='countries' onChange={e => handleSelect(e)}>
                            <option hidden >Select Country</option>
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
                                <h4 className="idpais">{el}</h4>
                                <button className="btnX" type='button' onClick={() => handleDelete(el)}>X</button>
                            </div>    
                                )}
                        </div>
                    </div>
                    <input className="submitAct" type='submit' value='CREATE' 
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
                        <button className="btnBack">BACK</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}