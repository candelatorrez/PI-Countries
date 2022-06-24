import React, {useEffect} from "react";
import { connect } from "react-redux";
import {getDetailCountry} from '../../Redux/Actions/index.js';
import ButtonHome from './home.png';
import {Link} from 'react-router-dom';

export function CountryDetail(props) {
    
    useEffect(() => {
        const id3 = props.match.params.id3;
        props.getDetailCountry(id3)
    }, [])


    return (
        <div>
            <div>
                <div>
                    <img src={props.countryDetail.flags} alt={props.countryDetail.name} />
                </div>
                <div>
                    <h4>Country: {props.countryDetail.name}</h4>
                    <h4>Region: {props.countryDetail.region}</h4>
                    <h4>ID: {props.countryDetail.id3}</h4>
                    <p>Capital: {props.countryDetail.capital}</p>
                    <p>Subregion: {props.countryDetail.subregion}</p>
                    <p>Area: {props.countryDetail.area}</p>
                    <p>Population: {props.countryDetail.population}</p>
                </div>
            </div>
            <div>
                <hr />
                <h2>Activities</h2>
                <p>{props.countryDetail.activities && props.countryDetail.activities.map(c => 
                    <div>
                        <hr />
                        <div>
                            <div>
                                Name of the Activity: {c.name}
                            </div>
                            <div>
                                Duration: {c.duration}
                            </div>
                            <div>
                                Difficulty: {c.difficulty}
                            </div>
                            <div>
                                Season: {c.season}
                            </div>
                        </div>
                    </div>
                    )}</p>
                    <div>
                        <Link to='/home'>
                            <img src={ButtonHome} alt='not found' />
                        </Link>
                    </div>
            </div>
        </div>
    )
}



function mapStateProps(state) {
    return{
        countryDetail: state.countryDetail,
        activities: state.activities
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getDetailCountry: (id3) => dispatch(getDetailCountry(id3))
    }
}

export default connect(mapStateProps, mapDispatchToProps)(CountryDetail)