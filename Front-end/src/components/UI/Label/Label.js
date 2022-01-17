import React from 'react';
import classes from './Label.module.css';
const Label = props=>(
    <label htmlFor = {props.id} className = {classes.Label} style = {props.customStyle}>
        {props.text}
    </label>
);


export default Label;