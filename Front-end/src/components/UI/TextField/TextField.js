import React from 'react';
import classes from './TextField.module.css';
import Radium from 'radium';

const TextField = props=>(

    <input type={props.type} name={props.name}
     className={classes.TextField} value={props.value}
      onChange={props.changed} placeholder={props.placeHolder}
      style = {props.customStyle} dir='rtl'
      id={props.idNum}
      disabled = {props.disabled}
    />
);

export default Radium(TextField)  ;