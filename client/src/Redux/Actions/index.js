import Axios from 'axios';

import {
    GET_COUNTRIES,
    GET_COUNTRY_DETAIL,
    GET_ACTIVITIES,
    GET_NAME_COUNTRIES,
    ORDER_BY_NAME,
    ORDER_NAME_ASC,
    ORDER_NAME_DES,
    ORDER_HAB_ASC,
    ORDER_HAB_DES,
    ORDER_BY_POPULATION,
    FILTER_CONTINENT,
    FILTER_ACTIVITY,
    POST_ACTIVITY
} from './constants.js'





//ACTION PARA TRAER TODOS LOS PAISES 
export function getCountries () {
    return async function (dispatch) {
        let res =  await Axios.get('/countries')
        dispatch({
            type: GET_COUNTRIES,
            payload: res.data  // LO QUE ME VA A CARGAR
        })
    }
}

//ACTION PARA TRAERME UN PAIS POR SU NAME
export function getNameCountries (name) {
    return async function (dispatch) {
        try {
            let res = await Axios.get(`/countries?name=${name}`);
            return dispatch({
                type: GET_NAME_COUNTRIES,
                payload: res.data  // ES LO QUE ME DEVUELVE POR RUTA CUANDO ASIGNO NAME
            })
        } catch (error) {
            return error;
        }
    }
}

//ACTION PARA TRAERME LAS ACTIVIDADES
export function getActivities() {
    return async function(dispatch) {
       return Axios.get('/activities')
       .then((response) => {
        dispatch({
            type: GET_ACTIVITIES,
            payload: response.data
        })
       })
    }
}


// ACTION PARA TRAERME UN PAIS SEGUN SU ID DE 3 DIGITOS
export function getDetailCountry(id3) {
    return async function (dispatch){
        try{
            let res = await Axios.get(`/countries/${id3}`)
            return dispatch({
                type: GET_COUNTRY_DETAIL,
                payload: res.data
            })
        } catch(error) {
            console.log(error)
        }
    }
} 

export function filterContinent(payload) {
    return {
        type: FILTER_CONTINENT,
        payload
    }
}

export function filterActivity(payload) {
    return{
        type: FILTER_ACTIVITY,
        payload
    }
}

//PARA ORDENAR DE A-Z/Z-A
export function orderByName(order, oCountries) { //PAYLOAD: ES EL VALOR QUE VA A LLEGAR DESDE EL COMPONENTE
    let countries = [...oCountries]

    countries.sort(function (a, b){
        if(order === ORDER_NAME_ASC) {
            return a.name < b.name ?  -1 : a.name > b.name ? 1 : 0;
        }
        if(order === ORDER_NAME_DES) {
            return a.name > b.name ? -1 : a.name < b.name ? 1 : 0;
        }
       
    })
    return function (dispatch) {
        dispatch({
            type: ORDER_BY_NAME,
            payload: countries
        })
    }
}

export function orderByPopulation(order, oPopulation) {
    let population = [...oPopulation]

    population.sort(function (a, b) {
        if(order === ORDER_HAB_DES) {
            return a.population < b.population ? -1 : a.population > b.population ? 1 : 0;
        }
        if(order === ORDER_HAB_ASC) {
            return a.population > b.population ? -1 : a.population < b.population ? 1 : 0;
        }
        
    })
    return function(dispatch) {
        dispatch({
            type: ORDER_BY_POPULATION,
            payload: population
        })
    }
    
}





//ACTION DONDE SE VA A CREAR UNA ACTIVIDAD
export function postActivity (payload) { // ME TRAE TODO LO QUE LLENA EL USER
   console.log('me rompi', payload)
    return async function (dispatch) {

        let res = await Axios.post('/activities', payload)
       
        return dispatch({
            type: POST_ACTIVITY,
            payload: res
        })

    }
}