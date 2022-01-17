import React from 'react';
import classes from './ValidationWarning.module.css';
import {IconContext} from 'react-icons';
import {IoWarningOutline} from 'react-icons/io5';
const ValidationWarning = props=>(
    <div className = {classes.ValidationWarning} dir="rtl">
        <div className = {classes.SideBorder}>

        </div>
        <div className = {classes.Header}>
            <IconContext.Provider value={{
                className :classes.WarningIcon
            }}> 
                <IoWarningOutline/>
            </IconContext.Provider>
            <span >شيء ما ليس صحيحًا تمامًا.</span>
        </div>
        <div className = {classes.Description}>
        يرجى الاطلاع على رسائل الخطأ أدناه.
        </div>
    </div>
);

export default ValidationWarning ;