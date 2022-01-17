import React from 'react';
import classes from './ValidationText.module.css';


const ValidationText = props=>(props.show?<span className = {[classes.ValidationText ,props.weakPassword?classes.LongText:null , props.className].join(' ')}>{props.children}</span>:null);


export default ValidationText;