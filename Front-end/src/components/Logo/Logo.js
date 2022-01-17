import React from 'react';
import LogoIcon from './../../assets/images/Logo/withText.png';
import classes from './Logo.module.css';
const Logo = ()=>(
    <div className={classes.Logo}>
        <img src={LogoIcon} alt='Logo'/>
    </div>
);

export default Logo;