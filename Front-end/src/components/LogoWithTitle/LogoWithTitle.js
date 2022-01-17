import React from 'react';
import classes from './LogoWithTitle.module.css';
import img from './../../assets/images/Logo/withoutText.png';
const LogoWithTitle = props=>(
    <div className = {classes.LogoWithTitle} dir = 'rtl' style = {props.logoWithTitleStyle}>
        <div className = {classes.Image} style = {props.imageStyle}>
            <img src={img} alt = 'Logo With Title'/>
        </div>
        <span style = {props.titleStyle}>{props.title}</span>

    </div>
);


export default LogoWithTitle;