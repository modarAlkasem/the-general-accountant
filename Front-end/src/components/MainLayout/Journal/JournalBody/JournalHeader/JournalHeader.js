import React , {useContext} from 'react';
import DocInfo from './../../../EntryDoc/EntryDocBody/EntryDocHeader/DocInfo/DocInfo';
import JournalContext from '../../../../../context/journal-context';
import Button from '../../../../UI/Button/Button';
import classes from './JournalHeader.module.css';;


const JournalHeader = ()=>{
    
    const journalContext  = useContext(JournalContext);

    return(
        <table dir='rtl' className = {classes.JournalHeader}>
        <tbody>
            <tr>
                <DocInfo label = 'التاريخ' text = {journalContext.date}/>
                <DocInfo label = 'العملة' text = {journalContext.currency}/>
                <td className = {classes.BtnWrap}> <Button clicked = {journalContext.exportJournal} >تصدير</Button></td>
                
            
            </tr>
        </tbody>
    </table>

    );
}
export default JournalHeader;
