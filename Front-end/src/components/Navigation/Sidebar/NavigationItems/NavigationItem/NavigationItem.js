import React from 'react';
import classes from './NavigationItem.module.css';
import {NavLink} from 'react-router-dom';
import { IconContext} from 'react-icons'; 

const NavigationItem = props =>(
    
    <li className = {classes.NavigationItem} dir ='rtl'>
        
        <NavLink to = {props.path} 
        activeClassName = {classes.Active}> 
            <IconContext.Provider value = {{ style :{ color:'inherit' , fontSize:'26px'} }}>        
                    {props.iconComp()}
            </IconContext.Provider >
            <span>{props.children}</span>
             
          </NavLink>
    </li>

);


export default NavigationItem;