
import {
    GET_COUNTRIES,
    GET_COUNTRY_DETAIL,
    GET_ACTIVITIES,
    GET_NAME_COUNTRIES,
    ORDER_BY_NAME,
    ORDER_BY_POPULATION,
    FILTER_CONTINENT,
    FILTER_ACTIVITY,
    POST_ACTIVITY
} from '../Actions/constants.js';

import { filterByActivity } from '../Actions/index.js';

const initialState = {
    countries: [],
    countryDetail: [],
    activities: [],
    allCountries: [],

    filterOrder: {
    byActivity: 'all'
}



}


function rootReducer(state = initialState, {type, payload}) {

    switch(type){
        case GET_COUNTRIES:
            return {                    //HACE UNA COPIA DEL STATE, Y DESPUES A COUNTRIES LE PASA LO QUE ENCUENTRE EN PAYLOAD(JSON.DATA)
                ...state,
                countries: payload,
                allCountries: payload         //MANDA TODO LO QUE LE TRAIGA LA ACTION GET_COUNTRIES
            }
        
        case GET_NAME_COUNTRIES: {
            let currentCountries = payload.data;

            if(payload.filterOrder.byActivity.length > 0) {
                currentCountries = filterByActivity(
                    currentCountries,
                    payload.byActivity
                )
            }
            return {
                ...state,
                filterOrder: payload.filterOrder
            }
        }
        case GET_ACTIVITIES: {
            return {
                ...state,
                activities: [...payload]
            }
        }
        case POST_ACTIVITY: {
            return {
                ...state   //SOLO ME TRAE EL ESTADO COMO ESTÁ
            }
        }
        case GET_COUNTRY_DETAIL:
            return {
                ...state, 
                countryDetail: payload
            }
        case FILTER_ACTIVITY:
            const countriesAll = state.allCountries
            let stateActivity = []
        
            for (let country of countriesAll) {
                if(country.activities.length !== 0){
                    for(let el of country.activities){
                        if(el.name === payload) {
                            stateActivity = [...stateActivity, country]
                        }
                    }
                }
            }
            return {
                ...state,
                countries: stateActivity
            }
        case ORDER_BY_NAME:
            return {
                ...state,
                countries: payload
            }
        case ORDER_BY_POPULATION:
            return {
                ...state,
                countries: payload
            }
        case FILTER_CONTINENT: //EVITO FILTRAR SOBRE FILTRADITOS 
            if(state.countries !== state.allCountries){
                state.countries = state.allCountries
            }
            const filterCountries = state.countries.filter(c => c.continent === payload)
            return {
                ...state, 
                countries: filterCountries
            }
        default: 
        return state; 
    }
}


export default rootReducer; 