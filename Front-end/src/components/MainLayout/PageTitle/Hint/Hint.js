import React from 'react';
import {IconContext} from 'react-icons';
import {AiOutlineClose} from 'react-icons/ai';
import classes from './Hint.module.css';

const Hint = props=>{

    return (

    <div className = {[classes.Hint , props.show?classes.Open:classes.Close].join(' ')} >
        <IconContext.Provider value={{
                style:{
                    color:'#718fa2',
                    fontSize:'20px'
                }}}>
            <div onClick = {props.closed} className = {classes.CloseIcon}>
                <AiOutlineClose/>
            </div>
        </IconContext.Provider>
        <div className= {classes.Content}>
            {props.children}
        </div>
    </div>
    );}


export default Hint;