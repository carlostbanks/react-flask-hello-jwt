import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

export const Dashboard = () => {

    return localStorage.token ? ( 
        <div>
            <h1>This is the dashboard screen only for logged in users.</h1>
        </div>
    ) : ( 
        <Navigate to="/"/>
    )
};