import React from 'react';
import {Redirect , Route} from 'react-router-dom';
import cookie from './../../services/cookieService';

const ProtectedRoute =({component:Component , ...rest}) =>{

    if(cookie.get('access-token')){

        return <Route {...rest} render = {(props)=><Component {...props}/>}/>

    }else{
        return <Redirect to='/'/>
    }
};
export default ProtectedRoute ;