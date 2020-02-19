import React from "react";
import { Route, Redirect } from "react-router-dom";

import { getSession } from "./services/auth";

const PrivateRoute = ({ component: Component, path, location, ...resto }) => (
    (
        getSession() ? (
            <Route path={path} 
            render={(props) => <Component {...props} {...resto} />}
            />
        ) : (
            <Redirect to={{ pathname: "/", state: { from: location } }} />
        )
    )
)

export default PrivateRoute;