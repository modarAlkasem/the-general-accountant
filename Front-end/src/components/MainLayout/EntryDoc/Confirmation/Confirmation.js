import React  from 'react';
import classes from './Confirmation.module.css';
import Button from './../../../UI/Button/Button';
import ModalHeader from './../../ChartOfAccounts/ModalHeader/ModalHeader';
import Aux from './../../../../hoc/Auxiliary/Auxiliary';


const Confirmation = props=>{
    

    return(

        <Aux>
            <ModalHeader text ={props.headerText}/>
            <div className = {classes.Message} > {props.message}</div>
            <div className = {classes.Footer}>
                <div className = {classes.BtnWrap} ><Button clicked = {props.canceled} className ={classes.CancelBtn}>إلغاء</Button></div>
                <div className = {classes.BtnWrap}> <Button className={classes[props.className]} clicked = {props.clicked}>{props.actionBtnText}</Button></div>
                
            </div>
        </Aux>
  
);}

export default Confirmation;