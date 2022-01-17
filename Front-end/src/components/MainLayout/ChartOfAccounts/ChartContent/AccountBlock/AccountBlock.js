import React from 'react';
import {IconContext} from 'react-icons';
import {IoAddCircleOutline} from 'react-icons/io5';
import classes from './AccountBlock.module.css';
import {BiPencil} from 'react-icons/bi';

const AccountBlock = props=>{
    const relatedAccounts = props.relatedAccounts.map(current=>{
        return (
            <tr key={current.index}>
                <td>{current.index}</td>
                <td>{current.name}</td>
                <td>{current.description}</td>
                <td  onClick = {props.editAccountModal.bind(this,current.index)}>
                    <IconContext.Provider value = {{
                        style : {
                            color:'#136ACD',
                            fontSize:'22px'
                            

                        }
                        
                    }}>
                        <BiPencil/>
                    </IconContext.Provider>
                </td>
        </tr>
        );
    });
    return(
        <table dir = "rtl" className = {classes.AccountBlock}>
            
            <tbody>
                <tr>
                    <td colSpan="10">{props.mainAccount}</td>
                 </tr>
            {relatedAccounts}
            </tbody>
            <tfoot>
                <tr>
                    <td onClick={props.addAccountModal}>
                    <IconContext.Provider value = {{style:{
                        color:'#136ACD',
                        fontSize:'22px'
                    }}}>
                        <IoAddCircleOutline/>
                    </IconContext.Provider>
                    <span>إضافة حساب جديد</span>
                </td>

                </tr>

            </tfoot>
        </table>
    );
}

export default AccountBlock  ;