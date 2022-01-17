import React from 'react';
import Radium from 'radium';
import classes from './Button.module.css';

const Button = props=>(
    <button type='button' onClick= {props.clicked} className={[classes.Button , props.className ].join(' ')} style = {props.customStyle} disabled={props.disabled}>{props.children}</button>
);

export default Radium(Button) ;