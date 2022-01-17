import React , {useEffect} from 'react';
import Aux from './../../hoc/Auxiliary/Auxiliary';
import Toolbar from './../Navigation/Toolbar/Toolbar';
import Home from './Home/Home';
import cookie from './../../services/cookieService';

const HomeLayout = props=>{
    useEffect(()=>{
        if(cookie.get('access-token')){
            cookie.remove('access-token'); 
        }
    },[]);
    return (
    <Aux>
        <header><Toolbar/></header>
        <Home/>
    </Aux>



);}

export default HomeLayout;