import Axios from 'axios';

export const ASCENDENTE = 'A-Z';
export const DESCENDENTE = 'Z-A';

export const POPULATION_ASC = 'POPULATION_ASC';
export const POPULATION_DES = 'POPULATION_DES';

const URL = 'http://localhost:3001';

// ACTION PARA TRAERME TODAS LAS COUNTRIES
export const getCountries = () => {
    return async function (dispatch) {
        return fetch(`${URL}/coutries`) // QUE BUSQUE EN LA URL CORRESPONDIENTE 
        .then(info => info.json()) // A  LA INFO EN LA URL QUE LA TRANSFORME EN JSON 
        .then( json => { //QUE DISPARE ESA ACCION, LE PASO EL TYPO Y LA DATA EXTRA DE LO QUE QUIERO QUE HAGA
            dispatch({
                type: 'GET_COUNTRIES',
                payload: json
            })
        })
    }
}

//ACTION PARA TRAERME LAS COUNTRIES POR NAME 
export function getCountriesByName (name) {
    return (dispatch) =>  {
        return Axios
        .get(`${URL}/countries?name=${name}`)
        .then((response) =>{
            dispatch({
                type: 'GET_COUNTRY',
                payload: response.data,
            });

        })
        .catch((error) => {
            alert('Country not found', error)
        })
    }
}

//ACTION PARA TRAERME LA COUNTRY POR ID
export const getCountryDetail = (id3) => {
    return async function (dispatch) {
        try {
            const info = await Axios.get(`${URL}/countries/${id3}`);
            dispatch({
                type: 'GET_COUNTRY_DETAILS',
                payload: info.data
            });
        } catch (error) {
            console.log(error)
        }
    }
}

//ACTION PARA TRAER TODAS LAS ACTIVIDADES
export const getActivities = () => {
    return async (dispatch) => {
      try {
        const response = await Axios
          .get(`${URL}/activities`);
        dispatch({
          type: 'GET_ACTIVITIES',
          payload: response.data,
        });
      } catch (error) {
        return console.error(error);
      }
    };
  }


  //ACTION PARA CREAR UNA ACTIVIDAD...
  export function postActivity (data) {
    return(dispatch) => {
        return Axios.post(`${URL}/activity/${data.name}`, data)  //DATA= ES LA QUE SE ENVIA POR BODY A NUESTRO BACKEND
        .then(response => {
            dispatch({
                type: 'POST_ACTIVITY',
                payload: response
            })
        } )
    }
  }


export function orderCountryByName (order, orderCountry ) {
    let countries = [...orderCountry]

    countries.sort((a, b) => {
        var nameA = a.name.toUpperCase();
        var nameB = b.name.toUpperCase();

        if(order === ASCENDENTE) {
            return nameA < nameB ? -1 : nameA > nameB ? 1 : 0
        }
        if(order === DESCENDENTE) {
            return nameA > nameB ? -1 : nameA < nameB ? 1 : 0
        }
    })

    return function (dispatch) {
        dispatch({
            type: 'ORDER_BY_NAME',
            payload: countries
        })
    }
}

export function orderPopulation(order, orderPopulation) {
    let population = [...orderPopulation];

    population.sort((a, b) => {
        var populationA = parseFloat(a.population)
        var populationB = parseFloat(b.population)

        if(order === POPULATION_ASC) {
            return populationA < populationB ? -1 : populationA > populationB ? 1 : 0;

        }
        if(order === POPULATION_DES) {
            return populationA > populationB ? -1 : populationA < populationB ? 1 : 0;
        }
    })
    return function (dispatch) {
        dispatch({
            type: 'ORDER_POPULATION',
            payload: population
        })
    }
}


//FILTRO PARA CONTINENT
export const filterByPopulation = (payload)  => {
    return {
        type: 'FILTER_BY_POPULATION',
        payload: payload
    }
}


//FILTRO POR ACTIVIDAD 
export const filterByActivity = (payload) => {
    return  {
        type: 'FILTER_BY_ACTIVITY',
        payload
    }
}

//FILTRO POR DIFICULTAD
export const filterByDifficulty = (payload) => {
    return{
        type: 'FILTER_BY_DIFFICULTY',
        payload: parseInt(payload)
    }
}

//FILTRO POR TEMPORADA
export const filterBySeason = (payload) => {
    return {
        type: 'FILTER_BY_SEASON',
        payload
    }
}


//FILTRO POR AREA 
export const filterByArea = (payload) => {
    return {
        type: 'FILTER_BY_AREA',
        payload
    }
}

