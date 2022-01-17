import React from 'react';

const journalContext  = React.createContext({

    currency : '',
    date : '',
    loading :true,
    data:[],
    exporting : false,
    getJournal:function(){},
    exportJournal:function(){}

});

export default  journalContext;