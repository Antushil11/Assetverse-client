import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import Loading from '../components/Loading/Loading';

const HrPrivateRote = ({children}) => {
    const {user, loading } = useAuth();
    const location = useLocation();
    

    if(loading) {
        return <Loading></Loading>
    }

    if(!user){
        return <Navigate state={location.pathname} to='/Hrregister'></Navigate>
    }
    return children;
};

export default HrPrivateRote;