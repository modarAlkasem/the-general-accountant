import React from 'react';
import classes from './TextArea.module.css';

const TextArea = props=>(

    <textarea name= {props.name} style = {props.customStyle} id={props.id}
        onChange = {props.changed} rows = {props.rows} cols={props.cols} className = {classes.TextArea}
        value = {props.value}
    />
);


export default TextArea ;