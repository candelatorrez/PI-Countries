import React  from "react";
import { Link } from "react-router-dom";

export default function Boton(props) {
    return props.trigger ? (
        <div className="pop">
            <div className="up">
                <div className="btn">
                    {props.children}
                    <Link to="/home">BACK TO HOME</Link>
                </div>
            </div>
        </div>
    ) : (
        ''
    )
}