import React from "react";
import { orderByName, orderByPopulation, getCountries } from "../../Redux/Actions";
import {ORDER_NAME_ASC, ORDER_NAME_DES, ORDER_HAB_ASC, ORDER_HAB_DES} from "../../Redux/Actions/constants.js";
import {connect} from "react-redux";

export function Order (props) {
    
    function handleDispatchName(e) {
        if(e.target.value === ORDER_NAME_ASC || e.target.value === ORDER_NAME_DES){
            props.orderByName(e.target.value, props.countries)
        }
    }


    function handleDispatchPopulation(e) {
        if(e.target.value === ORDER_HAB_ASC || e.target.value === ORDER_HAB_DES){
            props.orderByPopulation(e.target.value, props.countries)
        }
    }

    return (
        <div>
            <div>
                <select className="selector" onChange={handleDispatchName} >
                    <option>Order by name</option>
                    <option value={ORDER_NAME_ASC} key='id1'>Ascendant</option>
                    <option value={ORDER_NAME_DES} key='id2'>Descendant</option>
                </select> 
                <select className="selector" onChange={handleDispatchPopulation} >
                    <option>Order by population</option>
                    <option value={ORDER_HAB_ASC} key='id3'>Ascendant</option>
                    <option value={ORDER_HAB_DES} key='id4'>Descendant</option>
                </select>
            </div>
        </div>
    )
}


function mapStateToProps(state) {
    return {
        countries: state.countries
    }
}

function mapDispatchToProps(dispatch) {
    return {
        orderByName: (a, b) => dispatch(orderByName(a, b)),
        orderByPopulation: (a, b) => dispatch(orderByPopulation(a, b)),
        getCountries: () => dispatch(getCountries())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Order)