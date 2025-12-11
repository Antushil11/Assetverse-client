import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';

const axioSecure = axios.create({
    baseURL:`http://localhost:3000`
})
const useAxoisSecure = () => {
    const {user} = useAuth();

    useEffect(() =>{
        axioSecure.interceptors.request.use(config => {
            config.headers.Authorization = `Bearer ${user?.accessToken}`
            return config
        })
    }, [user])


    return axioSecure
};

export default useAxoisSecure;