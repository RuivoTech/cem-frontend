import React, { useState, useEffect, useContext } from "react";
import { Route, useHistory } from "react-router-dom";

import Menu from "./componentes/Menu";
import Sidebar from "./componentes/Sidebar";
import { isSignedIn } from "./services/auth";
import { AuthContext } from "./context";

const PrivateRoute = ({ component: Component, path, location, name, ...resto }) => {
    const { signOut } = useContext(AuthContext);
    const history = useHistory();
    const [estaLogado, setEstaLogado] = useState(false);

    useEffect(() => {
        if (isSignedIn()) {
            setEstaLogado(!estaLogado);
        } else {
            signOut();
            history.push("/");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        estaLogado &&
        <>
            <Sidebar />
            <Menu nome={name} />
            <Route path={path}
                render={(props) => <Component {...props} {...resto} />}
            />
        </>
    )
}

export default PrivateRoute;