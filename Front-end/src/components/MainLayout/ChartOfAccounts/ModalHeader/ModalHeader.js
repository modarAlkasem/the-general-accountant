import React from 'react';
import classes from './ModalHeader.module.css';

const ModalHeader = props=>(
    <div className = {classes.ModalHeader}>
        {props.text}
    </div>
)


export default ModalHeader;