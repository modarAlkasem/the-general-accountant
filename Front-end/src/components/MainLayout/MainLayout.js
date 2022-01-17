import React ,{useEffect , useState}from 'react';
import classes from './MainLayout.module.css';
import {Route , Switch }from 'react-router-dom';
import Sidebar from './../Navigation/Sidebar/Sidebar';
import ChartOfAccounts from './../../containers/ChartOfAccounts/ChartOfAccounts';
import EntryDoc from './../../containers/EntryDoc/EntryDoc';
import Ledger from './../../containers/Ledger/Ledger';
import Journal from '../../containers/Journal/Journal';
import TrialBalance from '../../containers/TrialBalance/TrialBalance';
import FinalAccounts from '../../containers/FinalAccounts/FinalAccounts';
import cookie from './../../services/cookieService';
import axios from './../../axios-general';

const MainLayout = props =>{
    const [state , ] = useState({
        foundData:props.location.foundData,
        userId : props.location.userId
    });
    useEffect(()=>{
        if(!cookie.get('access-token')){
            props.history.replace('/');
        }// eslint-disable-next-line
    }, []);

    const signOutHandler = ()=>{
        axios.get(`/signout/${state.userId}`,{headers:{
            Authorization :'Bearer '+cookie.get('access-token'),
            Accept : 'application/json'
        }}).then(response=>{
            cookie.remove('access-token');
            props.history.replace('/');
        })
    }
    return (
    <div className ={classes.MainLayout} dir='rtl'>

        <Sidebar title = {state.foundData.name} signedOut = {signOutHandler}/>
        <div className ={classes.Content} > 
        <Switch>
            <Route path = {props.match.url+'/chartOfAccounts'} exact render = {(props)=><ChartOfAccounts {...props} 
                                                                                        foundId ={state.foundData.foundation_id}
                                                                                        foundCurrency={state.foundData.currency} />}/>
            <Route path = {props.match.url+'/entryDoc'} exact render = {(props)=><EntryDoc {...props} 
                                                                                        foundId ={state.foundData.foundation_id}
                                                                                        foundCurrency={state.foundData.currency} />}/>
            <Route path = {props.match.url+'/ledger'} exact render = {(props)=><Ledger {...props} 
                                                                                        foundId ={state.foundData.foundation_id}
                                                                                        foundCurrency={state.foundData.currency} 
                                                                                        foundName = {state.foundData.name}/>}/> 
            <Route path = {props.match.url+'/journal'} exact render = {(props)=><Journal {...props} 
                                                                                        foundId ={state.foundData.foundation_id}
                                                                                        foundCurrency={state.foundData.currency}
                                                                                        foundName = {state.foundData.name} />}/>   
            <Route path = {props.match.url+'/trialbalance'} exact render = {(props)=><TrialBalance {...props} 
                                                                                        foundId ={state.foundData.foundation_id}
                                                                                        foundCurrency={state.foundData.currency}
                                                                                        foundName = {state.foundData.name} />}/>                                                                                                                                                                  
        
        <Route path = {props.match.url+'/finalaccounts'} exact render = {(props)=><FinalAccounts {...props} 
                                                                                        foundId ={state.foundData.foundation_id}
                                                                                        foundCurrency={state.foundData.currency}
                                                                                        foundName = {state.foundData.name} />}/>  
        </Switch>
        </div>

    </div>

);
}

export default MainLayout ;