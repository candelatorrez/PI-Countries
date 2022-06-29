import React, {useEffect} from "react";
//import {Link} from "react-router-dom";
import {orderByName, orderByPopulation, filterActivity, filterContinent, getActivities, getCountries } from "../../Redux/Actions/index.js";
import {connect} from "react-redux";

import { ORDER_NAME_ASC, ORDER_NAME_DES, ORDER_HAB_ASC, ORDER_HAB_DES } from "../../Redux/Actions/constants.js";

function FilterAndOrder(props){
    
    function handleDispatchOrder(e){
        if(e.target.value === ORDER_NAME_ASC || e.target.value === ORDER_NAME_DES){
            props.orderByName(e.target.value, props.countries)
        }
    }

    function handleDispatchPopulation(e){
        if(e.target.value === ORDER_HAB_ASC || e.target.value === ORDER_HAB_DES){
            props.orderByPopulation(e.target.value, props.countries)
        }
    }

    function handleDispatchContinent(e){
        props.filterContinent(e.target.value)
    }

    function handleDispatchActivity(e){
        props.filterActivity(e.target.value)
    }

    useEffect(() => {
        props.getActivities()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div className="container">
            <div>
                <select className="select" onChange={(e) => handleDispatchOrder(e)}>
                    <option hidden>Order by name</option>
                    <option value={ORDER_NAME_ASC}> A - Z </option>
                    <option value={ORDER_NAME_DES}> Z - A </option>
                </select>
                <select className="select2" onChange={(e) => handleDispatchPopulation(e)}>
                    <option hidden>Order by population</option>
                    <option value={ORDER_HAB_ASC}> Largest </option>
                    <option value={ORDER_HAB_DES}> Lowest </option>
                </select>
                
                <select className="select3" name="continent" onChange={(e) => handleDispatchContinent(e)}>
                    <option hidden>Filter by Continent</option>
                    <option value="Europe">Europe</option>
                    <option value="South America">South America</option>
                    <option value="North America">North America</option>
                    <option value="Asia">Asia</option>
                    <option value="Africa">Africa</option>
                    <option value="Oceania">Oceania</option>
                    <option value="Antarctica">Antarctica</option>
                </select>

                <select className="select4" name="activity" onChange={(e) => handleDispatchActivity(e)}>
                    <option hidden>Filter by Activity</option>
                    {props.activity && props.activity.map((a, index) => (
                        <option key={index} value={a.name}>{a.name}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}

function mapStateToProps(state){
    return {
        countries: state.countries,
        activity: state.activity
    }
}

function mapDispatchToProps(dispatch){
    return {
        orderByName: (a, b) => dispatch(orderByName(a, b)),
        orderByPopulation: (a, b) => dispatch(orderByPopulation(a, b)),
        filterContinent: (a) => dispatch(filterContinent(a)),
        filterActivity: (name) => dispatch(filterActivity(name)),
        getActivities: () => dispatch(getActivities()),
        getCountries: () => dispatch(getCountries())
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (FilterAndOrder)