import React from 'react';
import classes from './Table.module.css';

const Table = props=>{

    const tableHeaders = props.headers.map((current , index)=>{

        return <th key = {'th-'+current+'-'+index} className = {current==='المحدد'?classes.ThIndex:current==='البيان'?classes.ThDesc:null}>
            {current}</th>
    });
    let tableTds = [];
    let keys = [];
    let tableData = [];
    if(props.data){
         tableData = props.data.map((current,index)=>{
            if(index===0){
                keys =Object.keys(current); 
            }
            tableTds = keys.map((key , index)=>{
                return <td key = {'td-'+key+'-'+index} className = {key==='rowId'?classes.TdIndex:key==='description'?classes.TdDesc:null}>
                    {current[key]}</td>
            });
            return <tr key = {'tr-'+index}>{tableTds}</tr>
        });
    }


    return(
        <table className = {[classes.Table , classes[props.className]].join(' ')} dir = 'rtl' >

            <thead > 

                <tr>{tableHeaders}</tr>

            </thead>

            <tbody>
                {tableData}
            </tbody>

        </table>
    );
}

export default Table;