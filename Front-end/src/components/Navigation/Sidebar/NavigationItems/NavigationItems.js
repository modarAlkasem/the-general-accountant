import React from 'react';
import classes from './NavigationItems.module.css';
import {withRouter} from 'react-router-dom';
import NavigationItem from './NavigationItem/NavigationItem';
import {IconContext} from 'react-icons';
import {FaSignOutAlt , FaBalanceScale} from 'react-icons/fa';
import {RiTableLine ,RiBookReadLine} from 'react-icons/ri';
import {CgFileDocument}from 'react-icons/cg';
import {TiDocumentText} from 'react-icons/ti';
import {AiOutlineAccountBook} from 'react-icons/ai';


const NavigationItems =props=>{
    const NAV_ITEMS = [{text:'دليل الحسابات' ,
     path:props.match.url+'/chartOfAccounts',
     iconComp : RiTableLine
    },
    {text:'سند قيد' ,
     path:props.match.url+'/entryDoc',
     iconComp:TiDocumentText},
     {text:'دفتر اليومية' ,
     path:props.match.url+'/journal',
     iconComp:RiBookReadLine},
    {text:'دفتر الأستاذ',
    path:props.match.url+'/ledger',
    iconComp :CgFileDocument },
    {text:'ميزان المراجعة',
    path:props.match.url+'/trialbalance',
    iconComp :FaBalanceScale },
    {text:'الحسابات الختامية',
    path:props.match.url+'/finalaccounts',
    iconComp :AiOutlineAccountBook }];
    
    const navItemComps = NAV_ITEMS.map((navItem ,index)=>
            <NavigationItem path = {navItem.path} key = {'sidebar_item_'+index} iconComp= {navItem.iconComp} >{navItem.text} </NavigationItem>
    );
    return(
        <ul className = {classes.NavigationItems}>
                {navItemComps}
             <li className = {classes.Signout} dir='rtl' onClick={props.signedOut}>

                 <IconContext.Provider value = {{ style :{ color:'inherit' , fontSize:'26px'} }}>
                     <FaSignOutAlt/>
                 </IconContext.Provider>
                 <span>تسجيل الخروج</span>
            </li> 
                
        </ul>
    );
}

export default withRouter(NavigationItems);