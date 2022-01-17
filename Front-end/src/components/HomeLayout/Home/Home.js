import React from 'react';
import Greeting from './../../../containers/Greeting/Greeting';
import Services from './Services/Services';
import Pricing from './Pricing/Pricing';
import classes from './Home.module.css';

const Home = props=>(
<div className={classes.Home}>
    <Greeting/>
    <Services/>
    <Pricing/>
</div>
);

export default Home;