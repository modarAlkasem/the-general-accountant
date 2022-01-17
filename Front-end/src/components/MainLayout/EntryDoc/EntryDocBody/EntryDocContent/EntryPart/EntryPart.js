import React from 'react';
import TextField from './../../../../../UI/TextField/TextField';
import classes from './EntryPart.module.css';


const EntryPart = props=>{
   

    const textFields = Object.keys(props.data).map(key=>{
        let value = props.data[key];
        let tdTypeClass = null;
        if(key==='rowId'){
            tdTypeClass = classes.TdRowId

        }else if(key==='accountNameAndIndex'){
            tdTypeClass = classes.TdAccount;

        }else if(key==='description'){
            tdTypeClass = classes.TdDescription;
        }else if(key==='credit' ||key==='debit' ){
            tdTypeClass = classes.TdDepCred;
        }else if(key==='date' ){
            tdTypeClass = classes.TdDate;
        }else if(key==='correspondingAcc' ){
            tdTypeClass = classes.TdCorresAcc;
        }

        return (
                <td className = {tdTypeClass} key={'td-'+key}>
                    <TextField type = 'text' value = {value} name = {key+'Field'} changed = {props.changed.bind(this,props.rowId)} disabled = {key==='rowId'||key==='correspondingAcc'?true:false}
                  
                     />
                </td>
              );
    });
    return(
        <tr className = {classes.EntryPart } >
            {textFields}
        </tr>
    );
}

export default EntryPart;