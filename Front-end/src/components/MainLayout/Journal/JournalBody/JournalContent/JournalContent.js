import React ,{useContext}from 'react';
import JournalPart from './JournalPart/JournalPart';
import JournalContext from '../../../../../context/journal-context';


const JournalContent = props=>{

    const journalContext = useContext(JournalContext);

    const journalParts = journalContext.data.journal.map((current , index)=>{

        return <JournalPart key = {'journalPart-'+index+1} data = {current}/>
    });



    return journalParts;
}

export default JournalContent;