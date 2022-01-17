import React ,{useContext}from 'react';
import DocInfo from './DocInfo/DocInfo';
import EntryDocNavigator from './../../../../Navigation/EntryDocNavigator/EntryDocNavigator';
import EntryDocContext from './../../../../../context/entry-doc-context';
import classes from './EntryDocHeader.module.css';
const EntryDocHeader = props=>{

    const entryDocContext  = useContext(EntryDocContext);

    return(
        <table dir='rtl' className = {classes.EntryDocHeader}>
            <tbody>
                <tr>
                    <DocInfo label = 'تاريخ الترحيل' text = {entryDocContext.docDate}/>
                    <DocInfo label = 'العملة' text = {entryDocContext.currency}/>
                    <EntryDocNavigator/>
                
                </tr>
            </tbody>
        </table>
    );

}
export default EntryDocHeader;