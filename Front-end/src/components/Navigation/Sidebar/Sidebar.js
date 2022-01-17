import React from 'react';
import classes from './Sidebar.module.css';
import LogoWithTitle from './../../LogoWithTitle/LogoWithTitle';
import NavigationItems from './NavigationItems/NavigationItems';
const Sidebar = props=>{
    const logoWithTitleStyle = {
        background: '#d7e0ea',
        borderRadius: '500px',
        height:'55px',
        paddingRight:'8px ',
        paddingTop:'4px ',
        boxSizing:'border-box'
    };
    return (
    <div className = {classes.Sidebar}>
        <LogoWithTitle title = {props.title} logoWithTitleStyle = {logoWithTitleStyle}/>
        <nav>
            <NavigationItems signedOut = {props.signedOut}/>
        </nav>
    </div>

);}

export default Sidebar;