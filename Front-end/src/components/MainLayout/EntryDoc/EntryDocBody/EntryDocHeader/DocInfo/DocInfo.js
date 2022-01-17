import React from 'react';
import classes from './DocInfo.module.css';
const DocInfo = props=>(

    <td dir = 'rtl' className = {[classes.DocInfo , props.className].join(' ')}>
      <span>{props.label}</span>  :  {props.text}
    </td>
);

export default DocInfo;