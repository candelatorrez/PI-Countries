import React from 'react';
import { useEffect } from 'react';
import {connect} from 'react-redux';
import {filterByActivity, filterByContinent, getActivities, getCountries} from '../../Redux/Actions/index.js';
import { useDispatch, useSelector } from 'react-redux';

import './Filters.css';

function Filters (props) {
    const dispatch = useDispatch();

    function handleDispatchContinent(e) {
        props.filterByContinent(e.target.value)
    }

    function handleDispatchActivity(e) {
        props.filterByActivity(e.target.value)
    }


    useEffect(() => {
        props.getActivities()

    }, [dispatch])


    return (
        <div>
            <div>
                <select className='selector' name='continent' onChange={handleDispatchContinent} >
                    <option value='' >Filter by Continent</option>
                    <option value='Europe'>Europe</option>
                    <option value='North America'>North America</option>
                    <option value='South America'>South America</option>
                    <option value='Asia' >Asia</option>
                    <option value='Oceania' >Oceania</option>
                    <option value='Africa' >Africa</option>
                </select>
                <select className='selector' name='activity' onChange={handleDispatchActivity} >
                    <option value=''>Filter by Activity</option>
                    {props.activities && props.activities.map((a, index) => (
                        <option key={index}>{a.name}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}


function mapStateProps(state) {
    return {
        countries: state.countries,
        activities: state.activities
    }
}


function mapDispatchToProps(dispatch) {
    return {
        getActivities: () => dispatch(getActivities()),
        getCountries: () => dispatch(getCountries()),
        filterByContinent: (z) => dispatch(filterByContinent(z)),
        filterByActivity: (name) => dispatch(filterByActivity(name))
    }
}

export default connect(mapStateProps, mapDispatchToProps) (Filters)