import React , {useContext} from 'react';
import JournalContext from '../../../../../context/journal-context';
import Table from '../../../../UI/Table/Table';

const JournalFooter = props=>{
    const journalContext = useContext(JournalContext);
    const headers = ['المحدد', 'البيان', 'مدين', 'دائن' ];
    const data = [{
        rowId:1,
        description:'المجموع',
        journalDebit:journalContext.data.journalDebit,
        journalCredit : journalContext.data.journalCredit
    }];
    return(
        <Table headers = {headers} data = {data} className = 'JournalFooterTable'/>
    );
}

export default JournalFooter;