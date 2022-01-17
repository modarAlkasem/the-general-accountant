import React ,{useContext}from 'react';
import EntryDocContext from './../../../../../context/entry-doc-context';
import EntryPart from './EntryPart/EntryPart';
import classes from './EntryDocContent.module.css';

const EntryDocContent = props=>{
    const entryDocContext = useContext(EntryDocContext);
    const entriesParts = entryDocContext.docContent.map(current=>{
        return <EntryPart data = {current} key={'rowId-'+current.rowId} changed = {entryDocContext.entryPartChangedHandler} rowId ={current.rowId}/>
    });
    return(
        <div className = {classes.EntryDocContent}>
            <table dir = 'rtl' className = {classes.Table}>
                <thead>
                    <tr>
                        <th className = {classes.ThRowId}>المحدد</th>
                        <th className = {classes.ThAccount}>الحساب</th>
                        <th className = {classes.ThDescription}>البيان</th>
                        <th className = {classes.ThDepCred}>دائن</th>
                        <th className = {classes.ThDepCred}>مدين</th>
                        <th className = {classes.ThDate}>التاريخ</th>
                        <th className = {classes.ThCorresAcc}>الحساب المقابل</th>
                    </tr>
                </thead>
                <tbody>
                    {entriesParts}
                </tbody>
            </table>
            <div dir='ltr' className = {classes.SumAndDifWrap}>
                <div className = {classes.SumWrapper}>
                    <span className = {classes.DebitSum}>
                            {entryDocContext.debitSum}
                    </span>
                    <span className = {classes.CreditSum}>
                            {entryDocContext.creditSum}
                    </span>
                    : المجموع
                </div>
                <div className = {classes.DifferenceWrapper}>
                    <span className = {entryDocContext.isNotEqual?classes.NotEqual:null}>
                                {entryDocContext.debitFromCredit}
                    </span>
                        <span className = { entryDocContext.isNotEqual?classes.NotEqual:null}>
                                {entryDocContext.creditFromDebit}
                        </span>
                         : الفرق
                </div>

            </div>
        </div>
      
    );
}
export default EntryDocContent;