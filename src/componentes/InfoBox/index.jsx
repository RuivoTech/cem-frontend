import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const InfoBox = ({ link, icone, titulo, quantidade, corFundo }) => {
    return (
        <>
            <div className="col-sm-2 col-md-2 col-lg-2 col-xl-2">
                <Link to={link} className="a text-white">
                    <div className={"info-box bg-" + corFundo + " hover-expand-effect"}>
                        <div className="icon h-100">
                            <i className={"fa fa-" + icone + " fa-2x"}></i>
                        </div>
                        <div className="content">
                            <div className="text">
                                {titulo}
                            </div>
                            <div className="number">
                                {quantidade}
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default InfoBox;