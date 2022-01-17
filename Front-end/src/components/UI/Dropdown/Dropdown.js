import React from 'react';
import classes from './Dropdown.module.css';

const Dropdown = props=>{
    const options = props.options.map(current=>{
        return <option key={current.index} value={current.index}>{current.text}</option>
    });
    return (
    <select name={props.name} onChange = {props.changed} value = {props.value} 
    className = {classes.Dropdown}
    style = {props.customStyle} id = {props.id} disabled = {props.disabled}>
        {options}
    </select>
);
}

export default Dropdown;