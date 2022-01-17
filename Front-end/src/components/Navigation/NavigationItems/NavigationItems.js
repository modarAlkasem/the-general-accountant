import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const Items = [
    {name:'الخدمات' , type:1 , path:'homeServices'},
    {name:'التسعير' , type:1, path:'homePricing'},
    {name:'تسجيل الدخول' , type:2, path:'/signin'},
    {name:'التسجيل مجانا' , type:3, path:'/register'}

];
const NavigationItems = props=>{
    const navItems = Items.map((navItem , index)=>{
        return <NavigationItem key={'navItem-'+index} path = {navItem.path} type= {navItem.type}>{navItem.name}</NavigationItem>
    });
    return(
        <ul className={classes.NavigationItems}>
            {navItems}
        </ul>
    );
}
export default NavigationItems;