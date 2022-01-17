import React from 'react';
import Table from './../../../../../UI/Table/Table';
import Aux from '../../../../../../hoc/Auxiliary/Auxiliary';


const JournalPart = props=>{
    const firstTableHeaders = ['المحدد','التاريخ','مدين','دائن','رقم السند' ];
    
    const secondTableHeaders = ['المحدد','الحساب','مدين','دائن','البيان'];
   
    const firstTableData = [{
        rowId:1,
        date:props.data.docDate,
        docDebitSum:props.data.docDebitSum,
        docCreditSum : props.data.docCreditSum,
        docNum:props.data.docNum

    }];
    
    const secondTableData = props.data.docContent.map((current , index)=>{

        return{
            rowId:index+1,
            accountNameAndIndex : current.accountNameAndIndex,
            debit : current.debit,
            credit : current.credit,
            description : current.description
        }
    });
    return(
        <Aux>
            <Table headers = {firstTableHeaders} data = {firstTableData} className = 'JournalFirstTable'/>
            <Table headers = {secondTableHeaders} data = {secondTableData} className ='JournalSecondTable'/>
        </Aux>

    );
}


export default JournalPart;