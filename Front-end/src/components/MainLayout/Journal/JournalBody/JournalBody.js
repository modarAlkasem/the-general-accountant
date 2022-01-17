import React from 'react';
import JournalHeader from './JournalHeader/JournalHeader';
import JournalContent from './JournalContent/JournalContent';
import JournalFooter from './JournalFooter/JournalFooter';

const JournalBody = props=>{

    return(
        <React.Fragment>

            <JournalHeader/>
            <JournalContent/>
            <JournalFooter/>

        </React.Fragment>


    );

}

export default JournalBody;