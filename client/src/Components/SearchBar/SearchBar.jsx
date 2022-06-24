import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { getNameCountries } from "../../Redux/Actions";



export default function SearchBar() {
    const [name, setName] = useState('');
    const dispatch = useDispatch();

    function handleSubmit(e){
        e.preventDefault();
        if(name.length === 0) {
            return alert('invalid name')
        } 
        dispatch(getNameCountries(name))
        setName('')
    }

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value)
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='Search country...' onChange={handleInputChange} value={name} />
                <button type='submit' value=''>Search</button>
            </form>
        </div>
    )
}