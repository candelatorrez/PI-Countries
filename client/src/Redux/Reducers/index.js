
import {
    GET_COUNTRIES,
    GET_COUNTRY_DETAIL,
    GET_ACTIVITIES,
    GET_NAME_COUNTRIES,
    ORDER_BY_NAME,
    ORDER_BY_POPULATION,
    POST_ACTIVITY,
    FILTER_ACTIVITY,
    FILTER_CONTINENT
} from '../Actions/constants.js';



const initialState = {
    countries: [],
    countryDetail: [],
    activity: [],
    allCountries: [],

}

export default function rootReducer(state = initialState, {type, payload}) {
    switch(type) {
        case GET_COUNTRIES: 
            return {
                ...state,
                countries: payload,
                allCountries: payload
            }
        
        case GET_NAME_COUNTRIES: 
            return {
                ...state,
                countries:  payload
            }
        
        case GET_COUNTRY_DETAIL: 
            return {
                ...state,
                countryDetail: payload
            }
        
        case GET_ACTIVITIES: 
            return {
                ...state,
                activity:payload
            }
        
        case POST_ACTIVITY: 
            return {
                ...state,
                activity: [...state.activity, payload]

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
        case FILTER_ACTIVITY:
            if(state.countries !== state.allCountries){
                state.countries = state.allCountries
            }
        
        return {
            ...state,
            countries: state.countries.filter(c => c.activities.some(a => a.name === payload))
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