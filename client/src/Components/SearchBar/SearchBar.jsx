import React from "react";
import {useDispatch} from "react-redux";
import {useState} from "react";
import "./SearchBar.css";

import { getNameCountries } from "../../Redux/Actions";

export default function SearchBar() {
    const dispatch = useDispatch();

    const [input, setInput] = useState('');

    function handleOnChange(name){
        setInput(name)
    }

    function handleOnSubmit(e) {
        e.preventDefault();
        dispatch(getNameCountries(input))
        setInput('');
    }

    return (
        <div className="form">
        <form className="containerForm" onSubmit={(e) => handleOnSubmit(e)}>           
                <input 
                    onChange={(e) => handleOnChange(e.target.value)}
                    type="text"
                    name="searchCountry"
                    id="searchCountry"
                    placeholder="Search Country..."
                    value={input}
                    />
                    <button className="btn" type="submit">SEARCH</button>
           
        </form>
        </div>
    )
}