import React from 'react';
import classes from './ChartToolbar.module.css';

const ChartToolbar = props=>{
   
    const listitems = props.rootAccounts.map(rootAccount=>
        
        <li key={rootAccount.index} value={rootAccount.index} 
        className = {[props.active===rootAccount.index?classes.Active:null , rootAccount.index===8?classes.RemoveMargin:null , rootAccount.index!==8&&rootAccount.index!==3&&rootAccount.index!==4? classes.RemoveMargin2:null].join(' ')}
        onClick={props.clicked}>
        {rootAccount.name}
            <span>{rootAccount.relatedAccountsSecondlevelAmount}</span>
        </li>

        );

    return(
        <ul className = {classes.ChartToolbar}>
            {listitems}
        </ul>
    );
}

export default ChartToolbar;