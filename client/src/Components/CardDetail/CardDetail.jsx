import React, {useEffect} from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetailCountry } from "../../Redux/Actions";
import "./CardDetail.css";
import NavBar from "../NavBar/NavBar";


export default function CardDetail(){
    const dispatch = useDispatch();
    const {id3} = useParams();

    const detail = useSelector((state) => state.countryDetail) 
   
    
    
    useEffect(() => {
        dispatch(getDetailCountry(id3))

    }, [dispatch, id3])

    return (
        <div className="detailsCard">
        <div>
           <NavBar />
        </div>
        <div>
        <Link to="/home">
                <button className="backtohome">Back to home...</button>
            </Link>
        </div>
        {Object.keys(detail).length > 0 ? 
        <div className="containerDetail">
            <div className="background">
                <img className="imgBandera"src={detail.flags} alt="img not found" />
            </div>
            <div className="detalles">
                <h1>NAME: {detail.name} ID: {detail.id3}</h1>
                <h2>Continent: {detail.continent}</h2>
                <h3>Capital: {detail.capital}</h3>
                <h3>Subregion: {detail.subregion}</h3>
                <h4>Area: {detail.area} - Km2 </h4>
                <h4>Population: {detail.population}</h4>
            </div>
            <div className="actividades">
                <h2 className="actividadTurista">TOURIST ACTIVITIES</h2>
                {detail.activities && detail.activities.length > 0 ? detail.activities.map((a, index) => 
                <div className="detallesCardAct" key={index}>
                    <h3>Name of Activity: {a.name}</h3>
                    <h4>Difficulty: {a.difficulty}</h4>
                    <h4>Duration in minutes: {a.duration}</h4>
                    <h4>Season: {a.season}</h4>
                </div>
                ) : (
                    <div>
                        <h3 className="noActivities">There are no activities... </h3>
                        <Link to="/activities">
                            <button className="btnAct">Create activity</button>
                        </Link>
                    </div>
                ) }
            </div>
        </div> : <p>Loading...</p>
    
    }
        </div>

    )
}