import React from 'react';
import Service from './Service/Service';
import serviceLogo1 from './../../../../assets/images/Home_Services/accounting.png';
import serviceLogo2 from './../../../../assets/images/Home_Services/settings.png';
import serviceLogo3 from './../../../../assets/images/Home_Services/statements.png';
import classes from './Services.module.css';

const services = [
    {name:'Transactions Registration & Posting', image:serviceLogo1},
    {name:'Preparation Financial Statements', image:serviceLogo3},
    {name:'Management Of Financial Accounts ', image:serviceLogo2}
];
 const Services = props=>{
    const servicesItems = services.map(servItem=>{
        return <Service key={servItem.name} image = {servItem.image}>{servItem.name}</Service>
    });
    return(
        <div className ={classes.Services} id='homeServices'>
            <h2>خدمات عديدة و مميزة</h2>
            <div className = {classes.ServicesItems}>
                {servicesItems}
            </div>
        </div>
    );
 }

 export default Services;