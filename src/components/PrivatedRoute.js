import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {useAuth} from '../provider/AuthProvider';
export default function PrivatedRoute({component:Component,...rest})  {
    const {user} = useAuth();
    return (
        <Route
            {...rest}
            render={props => {
                return user ? <Component {...props} /> : <Redirect to="/login" />
            }}
        ></Route>

        
    )
};
