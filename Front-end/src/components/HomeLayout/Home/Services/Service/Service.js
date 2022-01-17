import React from 'react';
import classes from './Service.module.css';

const Service = props=>(

    <div className = {classes.Service}>
        <img src={props.image} alt='Serive Icon'/>
        <span> {props.children}</span>
    </div>
);

export default Service;