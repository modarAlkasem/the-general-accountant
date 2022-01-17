import React from 'react';
import {Link as LinkRouter} from 'react-router-dom';
import {Link as LinkScroll} from 'react-scroll';
import classes from './NavigationItem.module.css';

const NavigationItem = props=>{
    const appendClasses = [classes.NavigationItem];
    if(props.type===2 || props.type===3){
        appendClasses.push(classes.Button);
        if(props.type===2 ){

            appendClasses.push(classes.SignIn);
        }else if(props.type===3){
            appendClasses.push(classes.SignUp);
        }
    }
    let listItem = null;
    if(props.type===2 || props.type===3){
        listItem = (        
        <li className = {appendClasses.join(' ')}>
            <LinkRouter to={props.path}>{props.children}</LinkRouter>
        </li>
        );

    }else if(props.type===1){
        listItem = (       
            <li className = {appendClasses.join(' ')}>
                <LinkScroll 
                    activeClass="active"
                    to={props.path}
                    spy={true}
                    smooth={true}
                    offset={0}
                    duration={500}
                
                >{props.children}</LinkScroll>
            </li>
            );
    }
    return listItem;
};

export default NavigationItem;