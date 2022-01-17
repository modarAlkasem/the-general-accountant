import React from 'react';
import Aux from './../../../../hoc/Auxiliary/Auxiliary';
import AccountBlock from './AccountBlock/AccountBlock';

const ChartContent = props=>{
    
    let relatedAccountsFirstLevel =[];
     props.rootRelatedAccounts.forEach(current=>{
        if(current.rootAccountIndex=== props.activeRootAccount){
            
            relatedAccountsFirstLevel= current.relatedAccountsFirstLevel;

        }else{
            return null;
        }
    });
    const accountsBlocks = relatedAccountsFirstLevel.map(current=>{
        return  <AccountBlock key = {current.index} mainAccount = {current.name}
         relatedAccounts = {current.relatedAccountsSecondLevel} 
         addAccountModal = {props.addAccount}
         editAccountModal = {props.editAccount}/>
    });

    return(
        <Aux>
            {accountsBlocks}

        </Aux>
           
      
    );
}

export default ChartContent;
