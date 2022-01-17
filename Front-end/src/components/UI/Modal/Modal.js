import React from 'react';
import Backdrop from './../Backdrop/Backdrop';
import Aux from './../../../hoc/Auxiliary/Auxiliary';
import classes from './Modal.module.css';
const Modal = props=>(
    <Aux>
        <Backdrop show = {props.show} hidden ={props.backdropHidden}/>
        <div className = {classes.Modal} style = {props.show?{ top:'5vh',
                                    opacity:'1'}:{
                                        top:'-100vh',
                                        opacity:'0'
                                    }}>
            {props.children}
        </div>
    </Aux>
);




export default Modal;