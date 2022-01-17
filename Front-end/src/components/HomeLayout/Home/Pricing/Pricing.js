import React from 'react';
import classes from './Pricing.module.css';
const Pricing = props=>(

    <div className={classes.Pricing} id='homePricing'>
        <h2>أسعارنا</h2>
        <div className = {classes.Main}>
            <div className={classes.Header}>مجانا</div>
            <div className={classes.Amount}>$0</div>
        </div>

    </div>
);
export default Pricing;